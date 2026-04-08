"use client";

import { createContext, useCallback, useContext, useLayoutEffect, useRef } from "react";
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

type ParallaxContextValue = {
    registerImg: (el: HTMLDivElement, baseScale: number) => void;
    unregisterImg: (el: HTMLDivElement) => void;
};

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

function useParallaxContext() {
    const ctx = useContext(ParallaxContext);
    if (!ctx) throw new Error("useParallaxContext doit être utilisé dans <Parallax>");
    return ctx;
}

// --------------------
// Components
// --------------------

type ParallaxProps = React.ComponentProps<"div"> & VariantProps<typeof parallaxVariants>;

/**
 * Conteneur clip-scroll : l'image est fixée dans le viewport et clippée par la section.
 * Empiler plusieurs `<Parallax>` pour changer d'image à chaque section.
 *
 * @prop size - Hauteur min : `"sm"` 40vh | `"md"` 60vh | `"lg"` 85vh (défaut) | `"full"` 100vh.
 */
const Parallax = ({ className, children, size, ...props }: ParallaxProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const imgsRef = useRef<Map<HTMLDivElement, number>>(new Map());

    const registerImg = useCallback((el: HTMLDivElement, baseScale: number) => {
        imgsRef.current.set(el, baseScale);
    }, []);

    const unregisterImg = useCallback((el: HTMLDivElement) => {
        imgsRef.current.delete(el);
    }, []);

    useLayoutEffect(() => {
        const el = sectionRef.current;
        if (!el) return;

        let rafId = 0;

        const applyToAll = (fn: (img: HTMLDivElement, base: number) => void) => {
            imgsRef.current.forEach((base, img) => fn(img, base));
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        // L'image est fixée dans le viewport (position:fixed) et clippée dynamiquement
        // pour n'apparaître qu'à l'intérieur des limites visibles de la section.
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
    }, []);

    return (
        <ParallaxContext.Provider value={{ registerImg, unregisterImg }}>
            <div ref={sectionRef} className={cn(parallaxVariants({ size }), className)} {...props}>
                {children}
            </div>
        </ParallaxContext.Provider>
    );
};

type ParallaxImageProps = React.ComponentProps<"div">;

const ParallaxImage = ({ className, children, style, ...props }: ParallaxImageProps) => {
    const { registerImg, unregisterImg } = useParallaxContext();
    const localRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = localRef.current;
        if (!el) return;
        registerImg(el, 1);
        return () => unregisterImg(el);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={localRef}
            className={cn("absolute inset-0 will-change-transform", className)}
            style={style}
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