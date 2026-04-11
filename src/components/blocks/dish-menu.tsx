"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { menuCategories, MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

const tagColors: Record<string, string> = {
  maison: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  végétarien: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  épicé: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
};

export const DishMenu: React.FC<React.ComponentProps<"div">> = ({ className, ...props }) => {
  const isMobile = useIsMobile();
  return (
    <div className={cn("max-w-5xl mx-auto", className)} {...props}>
      <Tabs defaultValue={menuCategories[0].id}>
        {isMobile ? (
          <div className="md:hidden sticky top-17.5 z-40 flex flex-col gap-3 items-center lg:justify-between bg-background/70 backdrop-blur-md py-3 -mx-4 px-4 mb-1 max-md:h-25 border-b">
            <TabsList className="flex w-full h-auto gap-20 justify-between" variant={"line"}>
              {menuCategories.slice(0, 2).map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="gap-1.5 px-0">
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
        ) : (
          <div className="max-md:hidden sticky top-25 z-40 flex justify-between bg-background/70 backdrop-blur-md py-3 -mx-4 px-4 mb-10 border-b">
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
        )}

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
  );
};

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
