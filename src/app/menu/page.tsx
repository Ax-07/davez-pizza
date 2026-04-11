import type { Metadata } from "next";
import { Main } from "@/components/layout/main";
import { Section } from "@/components/layout/section";
import { DishMenu } from "@/components/blocks/dish-menu";

export const metadata: Metadata = {
  title: "Carte",
  description:
    "Découvrez la carte de Davez Pizza : pizzas classiques et de saison, entrées, desserts et boissons avec les prix.",
};

export default function MenuPage() {
  return (
    <Main className="relative block py-0">
      {/* Onglets */}
      <Section className="py-17.5 lg:py-25 2xl:py-25">
        <DishMenu />
      </Section>
    </Main>
  );
}
