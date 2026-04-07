import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FEATURED_PIZZAS } from "@/data/menu";
import { cn } from "@/lib/utils";

const tagColors: Record<string, string> = {
  maison: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  végétarien: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
};

export function Specialties() {
  return (
    <section className="w-full py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug">
            Nos spécialités
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Des recettes signatures élaborées avec passion, disponibles uniquement chez Davez Pizza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_PIZZAS.map((pizza) => (
            <article
              key={pizza.id}
              className="rounded-2xl border bg-card p-6 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-5xl text-center">🍕</div>
              <div className="flex flex-wrap gap-2">
                {pizza.tags?.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "text-xs font-medium px-2.5 py-0.5 rounded-full",
                      tagColors[tag] ?? "bg-muted text-muted-foreground"
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{pizza.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {pizza.description}
                </p>
              </div>
              <p className="text-2xl font-bold text-primary mt-auto">
                {pizza.price.toFixed(2).replace(".", ",")} €
              </p>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button asChild size="lg">
            <Link href="/menu">Voir toute la carte</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
