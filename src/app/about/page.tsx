import type { Metadata } from "next";
import { Main } from "@/components/layout/main";
import { Leaf, Flame, Users2 } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez l'histoire de Davez Pizza, notre passion pour la pizza artisanale, nos valeurs et l'équipe derrière chaque fournée.",
};

const VALUES = [
  {
    icon: Flame,
    title: "Four à bois",
    description:
      "Chaque pizza est cuite dans notre four à buis traditionnel atteignant 450°C. Cette chaleur intense donne à la pâte son caractère unique : croustillante à l'extérieur, moelleuse à l'intérieur.",
  },
  {
    icon: Leaf,
    title: "Produits frais",
    description:
      "Nous sélectionnons chaque semaine nos ingrédients auprès de producteurs locaux et de fournisseurs italiens de confiance. Pas de surgelé, pas de compromis.",
  },
  {
    icon: Users2,
    title: "Fait maison",
    description:
      "De la pâte levée 48 heures aux sauces maison, en passant par les desserts du jour — tout est préparé sur place par notre équipe chaque matin.",
  },
];

export default function AboutPage() {
  return (
    <Main className="block py-0">
      {/* Hero About */}
      <section className="bg-muted/40 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Notre histoire
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Davez Pizza est née d&apos;une passion transmise de génération en génération pour
            la vraie pizza napolitaine — celle qui prend du temps, qui respecte les
            ingrédients et qui réunit les gens autour d&apos;une table.
          </p>
        </div>
      </section>

      {/* Histoire */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto prose prose-zinc dark:prose-invert">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Fondée il y a plus de quinze ans par la famille Davez, notre pizzeria
            a ouvert ses portes avec une simple conviction : une bonne pizza, ça se
            mérite et ça se partage. Depuis, nous perfectionnons chaque jour notre
            savoir-faire, en restant fidèles à ce qui nous a toujours distingués —
            l&apos;authenticité.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mt-4">
            Ce qui a commencé comme une petite table de quartier est devenu un lieu
            de vie pour des centaines de familles, d&apos;amis et de gourmets qui
            reviennent semaine après semaine. C&apos;est cette fidélité qui nous
            motive et nous pousse à ne jamais nous reposer sur nos lauriers.
          </p>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-muted/40 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center leading-snug mb-12">
            Nos engagements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border bg-card p-8 flex flex-col gap-4 shadow-sm"
              >
                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="size-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-6">
            L&apos;équipe
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Derrière chaque pizza se cache une équipe passionnée. Du pizzaïolo qui
            étale la pâte avec soin au serveur qui vous accueille avec le sourire —
            tout le monde ici partage la même fierté du travail bien fait.
          </p>
          <p className="mt-4 text-muted-foreground">
            Nous avons hâte de vous recevoir et de vous faire découvrir notre carte.
          </p>
        </div>
      </section>
    </Main>
  );
}
