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

      <ParallaxContent className="flex min-h-screen items-center justify-center px-4">
        <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl 2xl:text-7xl">
            {BUSINESS.tagline}
          </h1>

          <p className="max-w-xl text-lg leading-relaxed text-white/85 md:text-xl">
            {BUSINESS.description}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={BUSINESS.deliveryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "border-white bg-transparent text-white backdrop-blur-sm hover:bg-white hover:text-black"
              )}
            >
              Se faire livrer
            </a>

            <Button size="lg" asChild>
              <Link href="/menu">Voir la carte</Link>
            </Button>
          </div>
        </div>
      </ParallaxContent>
    </Parallax>
  );
};