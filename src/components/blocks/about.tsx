"use client";

import { Separator } from "@/components/ui/separator";
import React from "react";
import imagePateFaiteMaison from "@/assets/skyler-ewing-pate_a_pizza-unsplash-w520.png";
import legumePourPizza from "@/assets/Ingrédients_pour_pizza-w520.png";
import pizzaDegoulinante from "@/assets/pablo-pacheco-pizza-degoulinante-unsplash-w520.png";
import Image from "next/image";
import { m } from "motion/react";
import { Section, SectionDescription, SectionTitle } from "../layout/section";

const content = {
  tagline: "À partir du 1er mai 2026",
  title: "Un nouveau chapitre commence",
  description:
    "Davez Pizza entame un nouveau chapitre avec l’envie de vous proposer des pizzas simples, généreuses et de qualité.",

  history: [
    "Venez découvrir cette nouvelle étape.",
    "Une occasion simple de tester, de goûter, et de se faire son propre avis.",
  ],

  values: [
    {
      title: "Pâte faite maison",
      description:
        "Une pâte préparée sur place, avec une fermentation lente pour développer des saveurs authentiques et une texture parfaite.",
      image: imagePateFaiteMaison,
    },
    {
      title: "Des produits choisis avec soin",
      description: "Des ingrédients sélectionnés pour vous proposer des pizzas simples, généreuses et pleines de goût.",
      image: legumePourPizza,
    },
    {
      title: "Une préparation maîtrisée",
      description: "Une attention portée à chaque étape pour vous offrir des pizzas régulières et bien exécutées.",
      image: pizzaDegoulinante,
    },
  ],
};

export const About: React.FC<React.ComponentProps<"section">> = (props) => {
  return (
    <Section id="about" {...props}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* En-tete */}
        <div className="text-center space-y-4">
          <p className="text-4xl md:text-6xl font-italianno text-primary">{content.tagline}</p>
          <SectionTitle>{content.title}</SectionTitle>
          <SectionDescription>{content.description}</SectionDescription>
        </div>

        <Separator />

        {/* Histoire */}
        <div className="max-w-2xl mx-auto space-y-4 text-center">
          {content.history.map((paragraph, index) => (
            <p key={index} className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Valeurs */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {content.values.map(({ title, description, image }, index) => {
                const initialX = index === 0 ? -80 : index === 2 ? 80 : 0;
                const initialY = index === 1 ? 80 : 0;

                return (
                  <m.div
                    key={index}
                    className="relative flex flex-col items-center text-center gap-4 rounded-2xl border bg-card h-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                    initial={{ opacity: 0, x: initialX, y: initialY }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                  >
                    <Image src={image} alt={title} className="absolute z-10 size-full object-cover" loading="lazy" width={520} height={520} sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="relative z-20 bg-background/70 p-6 rounded-lg w-full h-full flex flex-col items-center justify-center gap-4">
                      <h3 className="text-xl font-semibold leading-snug">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                    </div>
                  </m.div>
                );
              })}
            </div>
          </div>
      </div>
    </Section>
  );
};
