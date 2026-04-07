"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// --------------------
// Variants CSS
// --------------------

const parallaxVariants = cva("relative overflow-hidden", {
    variants: {
        size: {
            sm: "min-h-[40vh]",
            md: "min-h-[60vh]",
            lg: "min-h-[85vh]",
            full: "min-h-screen",
        },
    },
    defaultVariants: { size: "lg" },
});

// --------------------
// Types
// --------------------

type ParallaxEffect =
    | "vertical"
    | "horizontal"
    | "zoom"
    | "fade"
    | "blur"
    | "reveal"
    | "mouse"
    | "sticky"
    | "clip-scroll";

type ParallaxDirection = "normal" | "reverse";

type BaseScale = "sm" | "md" | "lg" | "none";

type ParallaxContextValue = {
    registerImg: (el: HTMLDivElement, baseScale: number) => void;
    unregisterImg: (el: HTMLDivElement) => void;
    updateBaseScale: (el: HTMLDivElement, baseScale: number) => void;
};

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

function useParallaxContext() {
    const ctx = useContext(ParallaxContext);
    if (!ctx) throw new Error("useParallaxContext doit être utilisé dans <Parallax>");
    return ctx;
}

// --------------------
// Helpers
// --------------------

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function getBaseScale(scale: BaseScale): number {
    switch (scale) {
        case "sm":   return 1.05;
        case "md":   return 1.1;
        case "lg":   return 1.25;
        case "none":
        default:     return 1;
    }
}

function getViewportData(el: HTMLElement) {
    const { top, height } = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    return {
        normalizedCenterDistance: clamp(
            (top + height / 2 - viewportHeight / 2) / viewportHeight,
            -1,
            1,
        ),
        progress: clamp((viewportHeight - top) / (viewportHeight + height), 0, 1),
    };
}

// --------------------
// Components
// --------------------

type ParallaxProps = React.ComponentProps<"div"> &
    VariantProps<typeof parallaxVariants> & {
        effect?: ParallaxEffect;
        direction?: ParallaxDirection;
        speed?: number;
    };

/**
 * Conteneur principal du parallax. Wrapping une section entière.
 * Gère le scroll/mouse listener, le requestAnimationFrame et distribue
 * l'effet à tous les `ParallaxImage` enfants via un Context.
 *
 * @prop effect   - Type d'effet appliqué aux images enfants.
 *   - `"vertical"`  : l'image se déplace sur l'axe Y (classique, défaut).
 *   - `"horizontal"`: l'image se déplace sur l'axe X.
 *   - `"zoom"`      : l'image grossit progressivement en entrant dans le viewport.
 *   - `"fade"`      : l'image apparaît en opacité au scroll.
 *   - `"blur"`      : l'image passe du flou au net en entrant dans le viewport.
 *   - `"reveal"`      : animation one-shot déclenchée à l'entrée (IntersectionObserver).
 *   - `"mouse"`       : le décalage suit la position de la souris (sans scroll).
 *   - `"sticky"`      : l'image reste collée (`sticky`) pendant que le contenu défile par-dessus.
 *   - `"clip-scroll"` : l'image est fixée dans le viewport et clippée par la section — empiler plusieurs `<Parallax>` pour changer d'image à chaque section.
 *
 * @prop direction - `"normal"` (défaut) ou `"reverse"` pour inverser le sens de l'effet.
 *
 * @prop speed     - Intensité de l'effet : `0` (aucun) → `1` (fort). Défaut : `0.4`.
 *
 * @prop size      - Hauteur min du conteneur : `"sm"` 40vh | `"md"` 60vh | `"lg"` 85vh (défaut) | `"full"` 100vh.
 *
 * @example Hero classique avec image qui glisse
 * ```tsx
 * <Parallax effect="vertical" speed={0.35} size="lg">
 *   <ParallaxImage scale="md">
 *     <Image src="/hero.jpg" alt="Hero" fill className="object-cover" priority />
 *   </ParallaxImage>
 *   <div className="absolute inset-0 bg-black/50" />
 *   <ParallaxContent className="flex flex-col items-center text-white">
 *     <h1>Titre</h1>
 *   </ParallaxContent>
 * </Parallax>
 * ```
 *
 * @example Bannière mid-page avec effet inversé
 * ```tsx
 * <Parallax effect="vertical" direction="reverse" speed={0.2} size="md">
 *   <ParallaxImage scale="sm">
 *     <Image src="/banner.jpg" alt="Bannière" fill className="object-cover" />
 *   </ParallaxImage>
 *   <ParallaxContent className="text-center text-white">
 *     <p>Nos spécialités</p>
 *   </ParallaxContent>
 * </Parallax>
 * ```
 *
 * @example Section interactive au survol de la souris
 * ```tsx
 * <Parallax effect="mouse" speed={0.4} size="md">
 *   <ParallaxImage scale="lg">
 *     <Image src="/ambiance.jpg" alt="Ambiance" fill className="object-cover" />
 *   </ParallaxImage>
 *   <ParallaxContent>...</ParallaxContent>
 * </Parallax>
 * ```
 *
 * @example Révélation one-shot à l'entrée dans le viewport
 * ```tsx
 * <Parallax effect="reveal" size="sm">
 *   <ParallaxImage scale="none">
 *     <Image src="/photo.jpg" alt="Photo" fill className="object-cover" />
 *   </ParallaxImage>
 * </Parallax>
 * ```
 *
 * @example Sticky — le texte défile par-dessus l'image fixée
 * ```tsx
 * <Parallax effect="sticky" size="full">
 *   <ParallaxImage scale="none">
 *     <Image src="/salle.jpg" alt="Notre salle" fill className="object-cover" />
 *   </ParallaxImage>
 *   <ParallaxContent className="flex flex-col gap-32 py-32 px-8">
 *     <p className="text-2xl text-white max-w-lg">Section 1</p>
 *     <p className="text-2xl text-white max-w-lg">Section 2</p>
 *   </ParallaxContent>
 * </Parallax>
 * ```
 *
 * @example Clip-scroll — plusieurs sections, chacune avec sa propre image fixée
 * ```tsx
 * // Empiler des <Parallax effect="clip-scroll"> pour changer d'image à chaque section
 * <Parallax effect="clip-scroll" size="full">
 *   <ParallaxImage scale="none">
 *     <Image src="/image1.jpg" alt="" fill className="object-cover" />
 *   </ParallaxImage>
 *   <ParallaxContent className="flex items-end p-12 text-white">
 *     <h2 className="text-5xl font-bold">Section 1</h2>
 *   </ParallaxContent>
 * </Parallax>
 * <Parallax effect="clip-scroll" size="full">
 *   <ParallaxImage scale="none">
 *     <Image src="/image2.jpg" alt="" fill className="object-cover" />
 *   </ParallaxImage>
 *   <ParallaxContent className="flex items-end p-12 text-white">
 *     <h2 className="text-5xl font-bold">Section 2</h2>
 *   </ParallaxContent>
 * </Parallax>
 * ```
 */
const Parallax = ({
    className,
    children,
    size,
    effect = "vertical",
    direction = "normal",
    speed = 0.4,
    ...props
}: ParallaxProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    /** Map : élément DOM → baseScale. Supporte plusieurs ParallaxImage. */
    const imgsRef = useRef<Map<HTMLDivElement, number>>(new Map());
    const sign = direction === "reverse" ? -1 : 1;

    const registerImg = useCallback((el: HTMLDivElement, baseScale: number) => {
        imgsRef.current.set(el, baseScale);
    }, []);

    const unregisterImg = useCallback((el: HTMLDivElement) => {
        imgsRef.current.delete(el);
    }, []);

    const updateBaseScale = useCallback((el: HTMLDivElement, baseScale: number) => {
        imgsRef.current.set(el, baseScale);
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        let rafId = 0;

        const applyToAll = (fn: (img: HTMLDivElement, base: number) => void) => {
            imgsRef.current.forEach((base, img) => fn(img, base));
        };

        // Reset de tous les styles pouvant être laissés par un effet précédent
        applyToAll((img, base) => {
            img.style.transition = "none";
            img.style.opacity = "1";
            img.style.filter = "none";
            img.style.transform = `translate3d(0, 0, 0) scale(${base})`;
        });

        // Respecter prefers-reduced-motion : désactiver tous les effets dynamiques
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const render = () => {
            const { progress, normalizedCenterDistance } = getViewportData(el);

            applyToAll((img, base) => {
                let translateX = 0;
                let translateY = 0;
                let scale = base;
                let opacity = 1;
                let blur = 0;

                switch (effect) {
                    case "horizontal":
                        translateX = normalizedCenterDistance * -speed * 120 * sign;
                        break;
                    case "vertical":
                        translateY = normalizedCenterDistance * -speed * 120 * sign;
                        break;
                    case "zoom":
                        scale = base + progress * speed * 0.35;
                        break;
                    case "fade":
                        opacity = clamp(progress, 0, 1);
                        break;
                    case "blur":
                        opacity = clamp(progress * 1.2, 0, 1);
                        blur = (1 - progress) * speed * 12;
                        break;
                    default:
                        break;
                }

                img.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
                img.style.opacity = String(opacity);
                img.style.filter = blur > 0 ? `blur(${blur}px)` : "none";
            });
        };

        const requestRender = () => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(render);
        };

        if (effect === "reveal") {
            applyToAll((img, base) => {
                img.style.transition = "transform 700ms ease, opacity 700ms ease";
                img.style.opacity = "0";
                img.style.transform = `translate3d(0, ${24 * sign}px, 0) scale(${base})`;
            });

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        applyToAll((img) => {
                            const base = imgsRef.current.get(img) ?? 1;
                            img.style.opacity = "1";
                            img.style.transform = `translate3d(0, 0, 0) scale(${base})`;
                            img.addEventListener(
                                "transitionend",
                                () => { img.style.transition = "none"; },
                                { once: true },
                            );
                        });
                        observer.disconnect();
                    }
                },
                { threshold: 0.15 },
            );
            observer.observe(el);
            return () => { observer.disconnect(); cancelAnimationFrame(rafId); };
        }

        if (effect === "mouse") {
            const handleMouseMove = (e: MouseEvent) => {
                const { left, top, width, height } = el.getBoundingClientRect();
                const relativeX = (e.clientX - (left + width / 2)) / width;
                const relativeY = (e.clientY - (top + height / 2)) / height;
                applyToAll((img, base) => {
                    img.style.transform = `translate3d(${relativeX * speed * 80 * sign}px, ${relativeY * speed * 80 * sign}px, 0) scale(${base})`;
                });
            };
            const handleMouseLeave = () => {
                applyToAll((img, base) => {
                    img.style.transform = `translate3d(0, 0, 0) scale(${base})`;
                });
            };
            el.addEventListener("mousemove", handleMouseMove);
            el.addEventListener("mouseleave", handleMouseLeave);
            handleMouseLeave();
            return () => {
                el.removeEventListener("mousemove", handleMouseMove);
                el.removeEventListener("mouseleave", handleMouseLeave);
                cancelAnimationFrame(rafId);
            };
        }

        if (effect === "sticky") {
            // L'image devient sticky : elle reste visible pendant que le contenu défile par-dessus.
            applyToAll((img) => {
                img.style.position = "sticky";
                img.style.top = "0";
                img.style.height = "100vh";
                img.style.width = "100%";
                img.style.zIndex = "-1";
                img.style.marginBottom = "-100vh";
            });
            return () => {
                applyToAll((img) => {
                    img.style.position = "";
                    img.style.top = "";
                    img.style.height = "";
                    img.style.width = "";
                    img.style.zIndex = "";
                    img.style.marginBottom = "";
                });
                cancelAnimationFrame(rafId);
            };
        }

        if (effect === "clip-scroll") {
            // L'image est fixée dans le viewport (position:fixed) et masquée dynamiquement via
            // clip-path pour n'apparaître qu'à l'intérieur des limites visibles de la section.
            // `isolation: isolate` ne clip pas les fixed — clip-path est la seule approche fiable.
            // Empiler plusieurs <Parallax effect="clip-scroll"> pour révéler une image différente par section.
            applyToAll((img) => {
                img.style.position = "fixed";
                img.style.inset = "0";
                img.style.height = "100vh";
                img.style.width = "100%";
                img.style.zIndex = "-1";
            });

            const updateClip = () => {
                const rect = el.getBoundingClientRect();
                const clipTop = Math.max(0, rect.top);
                const clipBottom = Math.max(0, window.innerHeight - rect.bottom);
                applyToAll((img) => {
                    img.style.clipPath = `inset(${clipTop}px 0px ${clipBottom}px 0px)`;
                });
            };

            const requestClipUpdate = () => {
                cancelAnimationFrame(rafId);
                rafId = requestAnimationFrame(updateClip);
            };

            updateClip();
            window.addEventListener("scroll", requestClipUpdate, { passive: true });
            window.addEventListener("resize", requestClipUpdate);
            return () => {
                applyToAll((img) => {
                    img.style.position = "";
                    img.style.inset = "";
                    img.style.height = "";
                    img.style.width = "";
                    img.style.zIndex = "";
                    img.style.clipPath = "";
                });
                window.removeEventListener("scroll", requestClipUpdate);
                window.removeEventListener("resize", requestClipUpdate);
                cancelAnimationFrame(rafId);
            };
        }

        applyToAll((img) => { img.style.transition = "none"; });
        render();        window.addEventListener("scroll", requestRender, { passive: true });
        window.addEventListener("resize", requestRender);
        return () => {
            window.removeEventListener("scroll", requestRender);
            window.removeEventListener("resize", requestRender);
            cancelAnimationFrame(rafId);
        };
    }, [effect, sign, speed]);

    return (
        <ParallaxContext.Provider value={{ registerImg, unregisterImg, updateBaseScale }}>
            <div ref={sectionRef} className={cn(parallaxVariants({ size }), className)} {...props}>
                {children}
            </div>
        </ParallaxContext.Provider>
    );
};

type ParallaxImageProps = React.ComponentProps<"div"> & {
    scale?: BaseScale;
};

/**
 * Conteneur de l'image animée. Doit être enfant direct (ou descendant) de `<Parallax>`.
 * S'enregistre automatiquement dans le Context du parent à son mount et se désinscrit au unmount.
 * Supporte plusieurs `<ParallaxImage>` dans un même `<Parallax>` (chacun avec son propre scale).
 *
 * @prop scale - Zoom de base appliqué à l'image pour masquer les bords lors du déplacement.
 *   - `"sm"`  : scale 1.05 — effet très subtil, image presque pleine taille.
 *   - `"md"`  : scale 1.10 — défaut, bon équilibre zoom/marge (recommandé pour `vertical`).
 *   - `"lg"`  : scale 1.25 — zoom prononcé, utile pour les effets `zoom` ou `mouse`.
 *   - `"none"`: scale 1.00 — aucun zoom, à utiliser avec `reveal` ou `fade` où il n'y a pas de translation.
 *
 * @example Image de fond pleine section
 * ```tsx
 * <ParallaxImage scale="md">
 *   <Image src="/salle.jpg" alt="Salle" fill className="object-cover" priority />
 * </ParallaxImage>
 * ```
 *
 * @example Deux images superposées à vitesses différentes (multi-layer)
 * ```tsx
 * <Parallax effect="vertical" speed={0.3}>
 *   // arrière-plan
 *   <ParallaxImage scale="lg">
 *     <Image src="/bg.jpg" alt="" fill className="object-cover" />
 *   </ParallaxImage>
 *   // avant-plan
 *   <ParallaxImage scale="sm">
 *     <Image src="/fg.png" alt="" fill className="object-contain" />
 *   </ParallaxImage>
 *   <ParallaxContent>...</ParallaxContent>
 * </Parallax>
 * ```
 *
 * @example Avec effect reveal, pas besoin de zoom
 * ```tsx
 * <Parallax effect="reveal">
 *   <ParallaxImage scale="none">
 *     <Image src="/photo.jpg" alt="Photo" fill className="object-cover" />
 *   </ParallaxImage>
 * </Parallax>
 * ```
 */

const ParallaxImage = ({
    className,
    children,
    scale = "md",
    style,
    ...props
}: ParallaxImageProps) => {
    const { registerImg, unregisterImg, updateBaseScale } = useParallaxContext();
    const localRef = useRef<HTMLDivElement>(null);
    const baseScale = getBaseScale(scale);

    // Inscription/désinscription lors du mount/unmount
    useLayoutEffect(() => {
        const el = localRef.current;
        if (!el) return;
        registerImg(el, baseScale);
        return () => unregisterImg(el);
    // registerImg/unregisterImg sont stables (useCallback sans deps)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Mise à jour du baseScale si le prop scale change
    useEffect(() => {
        const el = localRef.current;
        if (!el) return;
        updateBaseScale(el, baseScale);
    }, [baseScale, updateBaseScale]);

    return (
        <div
            ref={localRef}
            className={cn("absolute inset-0 will-change-transform", className)}
            style={{ ...style, transform: `translate3d(0, 0, 0) scale(${baseScale})` }}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * Conteneur du contenu textuel ou UI superposé à l'image parallax.
 * Positionné en `relative z-10` pour passer au-dessus de `ParallaxImage`.
 * Accepte toutes les props d'un `<div>` standard ainsi que `className` pour le layout.
 *
 * @example Contenu centré sur un hero
 * ```tsx
 * <ParallaxContent className="flex flex-col items-center gap-6 text-center px-4 max-w-3xl">
 *   <h1 className="text-5xl font-extrabold text-white">Titre</h1>
 *   <p className="text-lg text-white/80">Sous-titre</p>
 *   <Button size="lg">Action</Button>
 * </ParallaxContent>
 * ```
 *
 * @example Contenu aligné à gauche sur une bannière
 * ```tsx
 * <ParallaxContent className="flex flex-col justify-end p-12 text-white">
 *   <p className="text-sm uppercase tracking-widest">Catégorie</p>
 *   <h2 className="text-4xl font-bold">Article</h2>
 * </ParallaxContent>
 * ```
 */
const ParallaxContent = ({
    className,
    children,
    ...props
}: React.ComponentProps<"div">) => {
    return (
        <div className={cn("relative z-10", className)} {...props}>
            {children}
        </div>
    );
};

export { Parallax, ParallaxImage, ParallaxContent };