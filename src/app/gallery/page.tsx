import type { Metadata } from "next";
import Image from "next/image";
import { Main } from "@/components/layout/main";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Découvrez en images la salle, les pizzas et l'ambiance de Davez Pizza.",
};

type GalleryItem = {
  src: string;
  alt: string;
  span?: "wide" | "tall";
};

// Ajouter vos photos dans /public et référencer ici
const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/salle davez pizza.jpeg",
    alt: "La salle du restaurant Davez Pizza",
    span: "wide",
  },
  {
    src: "/salle davez pizza.jpeg",
    alt: "Une pizza Margherita fraîchement sortie du four",
  },
  {
    src: "/salle davez pizza.jpeg",
    alt: "La Davez — notre pizza signature",
  },
  {
    src: "/salle davez pizza.jpeg",
    alt: "Notre four à bois",
    span: "wide",
  },
  {
    src: "/salle davez pizza.jpeg",
    alt: "Préparation de la pâte maison",
  },
  {
    src: "/salle davez pizza.jpeg",
    alt: "Ambiance en terrasse",
  },
];

export default function GalleryPage() {
  return (
    <Main className="block py-0">
      <section className="bg-muted/40 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Galerie
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Un avant-goût de l&apos;expérience Davez Pizza — en images.
          </p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[240px]">
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl ${
                  item.span === "wide" ? "sm:col-span-2" : ""
                } ${item.span === "tall" ? "row-span-2" : ""}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Retrouvez encore plus de photos sur notre{" "}
            <a
              href="https://www.instagram.com/davezpizza"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Instagram
            </a>
            .
          </p>
        </div>
      </section>
    </Main>
  );
}
