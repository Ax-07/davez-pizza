import { Leaf, Flame, Users2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import imagePateFaiteMaison from "@/assets/skyler-ewing-pate_a_pizza-unsplash.jpg";
import legumePourPizza from "@/assets/Ingrédients_pour_pizza.png";
import pizzaDegoulinante from '@/assets/pablo-pacheco-pizza-degoulinante-unsplash.jpg'
import Image from "next/image";

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
      icon: Users2,
      title: "Pâte faite maison",
      description:
        "Une pâte préparée sur place, avec une fermentation lente pour développer des saveurs authentiques et une texture parfaite.",
      image: imagePateFaiteMaison,
    },
    {
      icon: Leaf,
      title: "Des produits choisis avec soin",
      description:
        "Des ingrédients sélectionnés pour vous proposer des pizzas simples, généreuses et pleines de goût.",
      image: legumePourPizza,
    },
    {
      icon: Flame,
      title: "Une préparation maîtrisée",
      description:
        "Une attention portée à chaque étape pour vous offrir des pizzas régulières et bien exécutées.",
      image: pizzaDegoulinante,
    },
  ],
};

export const About: React.FC<React.ComponentProps<"section">> = (props) => {
  return (
    <section className="w-full py-20 px-4" {...props}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* En-tete */}
        <div className="text-center space-y-4">
          <p className="text-4xl md:text-6xl font-italianno text-primary">{content.tagline}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{content.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">{content.description}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.values.map(({ title, description, image }, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center gap-4 rounded-2xl border bg-card h-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              {/* <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary">
                <Icon size={28} />
              </div> */}
              <Image src={image} alt={title} className="absolute z-10 size-full object-cover" loading="eager"/>
              <div className="relative z-20 bg-background/70 p-6 rounded-lg w-full h-full flex flex-col items-center justify-center gap-4">
                <h2 className="text-xl font-semibold leading-snug">{title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
