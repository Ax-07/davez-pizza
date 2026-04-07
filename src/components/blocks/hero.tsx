import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Parallax, ParallaxImage, ParallaxContent } from "@/components/ui/parallax";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/data/config";

export const Hero = () => {
  return (
    <Parallax
      effect="clip-scroll"
      size="full"
      className="w-full"
    >
      <ParallaxImage scale="none">
        <Image
          src="/salle davez pizza.jpeg"
          alt="Salle du restaurant Davez Pizza"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/55" />
      </ParallaxImage>

      <ParallaxContent className="flex min-h-screen items-center justify-center px-4 pt-70">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <p className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-italianno 2xl:[-webkit-text-stroke:1px_white]">
            Sur place ou à emporter
          </p>
          <h1 className="text-4xl font-extrabold text-yellow-500 md:text-5xl lg:text-6xl 2xl:text-7xl leading-tight">
            {/* {BUSINESS.tagline} */}
            Ouvert 7/7
          </h1>

          <p className="max-w-xl text-2xl text-white/85 md:text-3xl">
            {/* {BUSINESS.description} */}
            Midi et soir *
          </p>
          <p className="max-w-xl text-2xl leading-relaxed text-white/50 md:text-xl mb-6">
            {/* {BUSINESS.description} */}
            * Fermé les lundi et dimanche midi
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {/* <a
              href={BUSINESS.deliveryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white bg-transparent text-white backdrop-blur-sm hover:bg-white hover:text-black"
              )}
            >
              Se faire livrer
            </a> */}

            <Button size="lg" asChild>
              <Link href="/menu">Voir la carte</Link>
            </Button>
          </div>
        </div>
      </ParallaxContent>
    </Parallax>
  );
};