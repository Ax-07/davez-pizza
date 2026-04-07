import Image from "next/image";
import Link from "next/link";
import { Parallax, ParallaxImage, ParallaxContent } from "@/components/ui/parallax";
import { buttonVariants } from "@/components/ui/button";
import { BUSINESS } from "@/data/config";
import { cn } from "@/lib/utils";

export function PromoBanner() {
  return (
    <Parallax effect="clip-scroll" size="full" className="w-full">
      <ParallaxImage scale="none">
        <Image
          src="/salle davez pizza2.jpg"
          alt="Commandez Davez Pizza en livraison"
          fill
          className="object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-background/60" />
      </ParallaxImage>

      <ParallaxContent className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
          Sur place · À emporter · En livraison
        </p>

        <h2 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
          Savourez Davez Pizza
          <br className="hidden md:block" />
          où que vous soyez
        </h2>

        <p className="max-w-lg text-lg leading-relaxed text-white/80">
          {BUSINESS.description}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={BUSINESS.deliveryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-white text-primary hover:bg-white/90"
            )}
          >
            Commander en livraison
          </a>
          <Link
            href="/menu"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white bg-transparent text-white hover:bg-white hover:text-primary"
            )}
          >
            Voir la carte
          </Link>
        </div>
      </ParallaxContent>
    </Parallax>
  );
}
