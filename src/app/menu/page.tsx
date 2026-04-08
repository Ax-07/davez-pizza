import type { Metadata } from "next";
import { Main } from "@/components/layout/main";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { menuCategories } from "@/data/menu";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Carte",
  description:
    "Découvrez la carte de Davez Pizza : pizzas classiques et de saison, entrées, desserts et boissons avec les prix.",
};

const tagColors: Record<string, string> = {
  maison: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  végétarien: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  épicé: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
};

export default function MenuPage() {
  return (
    <Main className="relative block py-0">
      {/* Hero */}
      {/* <section className="bg-muted/40 py-20 px-4 mt-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Notre carte
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Tous nos plats sont préparés sur place, avec des ingrédients frais.
            Les prix sont TTC, service compris.
          </p>
        </div>
      </section> */}

      {/* Onglets */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue={menuCategories[0].id}>
            <div className="sticky top-17.5 lg:top-23.5 z-40 flex justify-between bg-background/70 backdrop-blur-md max-md:pt-8 py-3 -mx-4 px-4 mb-10 max-md:h-35">
              <TabsList className="flex flex-wrap h-auto gap-1 justify-start" variant={"line"}>
                {menuCategories.slice(0, 2).map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="gap-1.5">
                    <span aria-hidden>{category.emoji}</span>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsList className="flex flex-wrap h-auto gap-1 justify-start" variant={"line"}>
                {menuCategories.slice(2).map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="gap-1.5">
                    <span aria-hidden>{category.emoji}</span>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {menuCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <p className="mt-12 text-center text-sm text-muted-foreground max-w-xl mx-auto">
            Allergènes disponibles sur demande auprès de notre équipe. Carte mise à jour selon les saisons et la
            disponibilité des produits.
          </p>
        </div>
      </section>
    </Main>
  );
}

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags?: string[];
}

const MenuItemCard: React.FC<React.ComponentProps<"article"> & { item: MenuItem }> = ({ item }) => {
  return (
    <article
      key={item.id}
      className="flex items-start justify-between gap-4 p-4 rounded-xl border bg-card hover:bg-accent/30 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-semibold text-amber-400">{item.name}</h3>
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className={cn(
                "text-xs font-medium px-2 py-0.5 rounded-full",
                tagColors[tag] ?? "bg-muted text-muted-foreground",
              )}
            >
              {tag}
            </span>
          ))}
        </div>
        {item.description && <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>}
      </div>
      <span className="text-base font-bold text-amber-400 shrink-0 pt-0.5">
        {item.price.toFixed(2).replace(".", ",")} €
      </span>
    </article>
  );
};
