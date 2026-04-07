export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  tags?: string[];
};

export type MenuCategory = {
  id: string;
  name: string;
  emoji: string;
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  {
    id: "pizzas-base-tomate",
    name: "Pizzas base tomate",
    emoji: "🍅",
    items: [
      {
        id: "margherita",
        name: "Margherita",
        description: "Tomate, mozza, olives, origan",
        price: 10,
        tags: ["végétarien"],
      },
      {
        id: "romaine",
        name: "Romaine",
        description: "Tomate, mozza, jambon, olives, origan",
        price: 12,
      },
      {
        id: "napolitaine",
        name: "Napolitaine",
        description: "Tomate, mozza, anchois, capres, olives, origan",
        price: 12,
      },
      {
        id: "reine",
        name: "Reine",
        description: "Tomate, mozza, jambon, champignons, olives, origan",
        price: 12.5,
      },
      {
        id: "picante",
        name: "Picante",
        description: "Tomate, mozza, chorizo, poivrons, olives, origan",
        price: 12.5,
      },
      {
        id: "orientale",
        name: "Orientale",
        description: "Tomate, mozza, merguez, poivrons, olives, origan",
        price: 13,
      },
      {
        id: "capricciosa",
        name: "Capricciosa",
        description: "Tomate, mozza, jambon, artichaut, champignons, olives, origan",
        price: 13.5,
      },
      {
        id: "provencale",
        name: "Provençale",
        description: "Tomate, mozza, thon, tomates séchées, olives, origan",
        price: 13.5,
      },
      {
        id: "bourguignonne",
        name: "Bourguignonne",
        description: "Tomate, mozza, boeuf haché, persillade, emmental, olives, origan",
        price: 13.5,
      },
      {
        id: "vegetarienne",
        name: "Végétarienne",
        description: "Tomate, mozza, poivrons, champignons, oignons, artichaut, olives, origan",
        price: 13.5,
      },
      {
        id: "chicken-bbq",
        name: "Chicken BBQ",
        description: "Tomate, mozza, poulet, poivrons, sauce BBQ, olives, origan",
        price: 14,
      },
      {
        id: "texane",
        name: "Texane",
        description: "Tomate, mozza, boeuf haché, poivrons, oignons, cheddar, sauce BBQ, olives, origan",
        price: 15,
      },
      {
        id: "carnivore",
        name: "Carnivore",
        description: "Tomate, mozza, boeuf haché, merguez, poivrons, emmental, olives, origan",
        price: 15,
      },
      {
        id: "crudo-rucola",
        name: "Crudo & Rucola",
        description: "Tomate, mozza, jambon cru, tomates cerise, parmesan, roquette, olives, origan",
        price: 15,
      },
      {
        id: "miss-italia",
        name: "Miss Italia",
        description: "Tomate, mozza, jambon cru, tomates cerise, bufala, roquette, olives, origan",
        price: 15,
      },
    ],
  },
  {
    id: "pizzas-base-creme",
    name: "Pizzas base Crème",
    emoji: "🍕",
    items: [
      {
        id: "chevre-miel",
        name: "Chèvre et miel",
        description: "Crème, mozza, chèvre, miel, olives, origan",
        price: 13,
      },
      {
        id: "montagnarde",
        name: "Montagnarde",
        description: "Crème, mozza, lardons, pomme de terre, oignons, olives, origan",
        price: 13,
      },
      {
        id: "ravioles",
        name: "Ravioles",
        description: "Crème, mozza, ravioles, olives, origan",
        price: 13,
      },
      {
        id: "royan",
        name: "Royan",
        description: "Crème, mozza, ravioles, lardons, bleu, olives, origan",
        price: 13.5,
      },
      {
        id: "parmentier",
        name: "Parmentier",
        description: "Crème, mozza, boeuf haché, pomme de terre, oignons, olives, origan",
        price: 13.5,
      },
      {
        id: "4-fromages",
        name: "4 Fromages",
        description: "Crème, mozza, chèvre, bleu, reblochon, olives, origan",
        price: 13.5,
      },
      {
        id: "indienne",
        name: "Indienne",
        description: "Crème, mozza, poulet curry, poivrons, champignons, origan",
        price: 13.5,
      },
      {
        id: "forestiere",
        name: "Forestière",
        description: "Crème, mozza, cèpes, olives, origan",
        price: 13.5,
      },
      {
        id: "kebab",
        name: "Kebab",
        description: "Creme, mozza, viande kebab, sauce blanche, olives, origan",
        price: 14,
      },
      {
        id: "biquette",
        name: "Biquette",
        description: "Crème, mozza, chèvre, jambon cru, olives, origan",
        price: 14,
      },
      {
        id: "ravioles-saumon",
        name: "Ravioles Saumon",
        description: "Crème, mozza, ravioles, saumon, citron, olives, origan",
        price: 15,
      },
      {
        id: "saumon",
        name: "Saumon",
        description: "Crème, mozza, saumon, huile citronnée, citron, olives, origan",
        price: 15,
      },
      {
        id: "miss-france",
        name: "Miss France",
        description: "Crème, mozza, jambon, tomates cerise, bufala, roquette, olives, origan",
        price: 15,
      },
      {
        id: "savoyarde",
        name: "Savoyarde",
        description: "Crème, mozza, lardons, oignons, pomme de terre, reblochon, olives, origan",
        price: 15,
      },
    ],
  },
  {
    id: "salades",
    name: "Salades",
    emoji: "🥗",
    items: [
      {
        id: "salade-verte",
        name: "Salade verte",
        description: "Salade, tomates, oignons",
        price: 4.5,
      },
      {
        id: "salade-chevre-chaud",
        name: "Salade chèvre chaud",
        description: "Salade, tomates, oignons, lardons, toast de chèvre chaud",
        price: 13,
      },
      {
        id: "salade-italienne",
        name: "Salade italienne",
        description: "Salade, tomates, oignons, jambon cru, mozza buffala, croûtons",
        price: 13,
      },
      {
        id: "salade-caesar",
        name: "Salade caesar",
        description: "Salade, tomates, oignons, poulet, parmesan, croûtons, sauce caesar",
        price: 13.5,
      },
      {
        id: "salade-nordique",
        name: "Salade nordique",
        description: "Salade, tomates, oignons, saumon fumée, féta, citron ",
        price: 13.5,
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    emoji: "🍮",
    items: [
      {
        id: "tiramisu",
        name: "Tiramisu maison",
        description: "Recette traditionnelle, mascarpone, café, cacao",
        price: 7,
      },
      {
        id: "panna-cotta",
        name: "Panna Cotta",
        description: "Crème vanille, coulis de fruits rouges",
        price: 6,
      },
      {
        id: "fondant-chocolat",
        name: "Fondant au chocolat",
        description: "Cœur coulant, boule de glace vanille",
        price: 8,
      },
    ],
  },
  {
    id: "boissons",
    name: "Boissons",
    emoji: "🥤",
    items: [
      {
        id: "eau",
        name: "Eau plate ou pétillante",
        description: "50cl",
        price: 3,
      },
      {
        id: "sodas",
        name: "Sodas",
        description: "Coca-Cola, Orangina, Limonade — 33cl",
        price: 4,
      },
      {
        id: "biere",
        name: "Bière artisanale locale",
        description: "33cl, sélection de saison",
        price: 6,
      },
      {
        id: "vin-verre",
        name: "Vin rouge / blanc / rosé",
        description: "Verre 15cl — sélection du patron",
        price: 5,
      },
      {
        id: "vin-bouteille",
        name: "Carafe de vin",
        description: "50cl — sélection du patron",
        price: 14,
      },
      {
        id: "cafe",
        name: "Café / Expresso",
        description: "",
        price: 2.5,
      },
    ],
  },
];

export const FEATURED_PIZZAS = menuCategories
  .find((c) => c.id === "pizzas-base-creme")
  ?.items.slice(0, 3) ?? [];
