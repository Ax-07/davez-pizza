"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Parallax, ParallaxImage, ParallaxContent } from "@/components/ui/parallax";
import { m, type Variants } from "motion/react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const, delay: i * 0.15 },
  }),
};

export const Hero = () => {
  return (
    <Parallax
      size="full"
      className="w-full"
    >
      <ParallaxImage>
        <Image
          src="/salle-davez-pizza.jpeg"
          alt="Salle du restaurant Davez Pizza"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/55" />
      </ParallaxImage>

      <ParallaxContent className="flex min-h-screen items-center justify-center px-4 pt-70">

          <div className="flex max-w-3xl flex-col items-center text-center">
            <m.p
              className="text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl font-italianno 2xl:[-webkit-text-stroke:1px_white]"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Sur place ou à emporter
            </m.p>
            <m.h1
              className="text-4xl font-extrabold text-yellow-500 md:text-5xl lg:text-6xl 2xl:text-7xl leading-tight"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              Ouvert 7/7
            </m.h1>

            <m.p
              className="max-w-xl text-2xl text-white/85 md:text-3xl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              Midi et soir *
            </m.p>
            <m.p
              className="max-w-xl text-2xl leading-relaxed text-white/50 md:text-xl mb-6"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
            >
              * Fermé les lundi et dimanche midi
            </m.p>

            <m.div
              id="hero-cta"
              className="flex flex-wrap justify-center gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
            >
              <Button size="lg" asChild>
                <Link href="/menu">Voir la carte</Link>
              </Button>
            </m.div>
          </div>
      </ParallaxContent>
    </Parallax>
  );
};