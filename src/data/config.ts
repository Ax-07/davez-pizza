export const BUSINESS = {
    name: "Davez Pizza",
    tagline: "Pizza artisanale",
    description:
        "Pâte maison, produits frais sélectionnés avec soin — sur place, à emporter ou en livraison.",
    address: {
        street: "1332 Rte de Lyon",
        city: "Davézieux",
        postalCode: "07430",
    },
    phone: "04 75 67 20 61",
    email: "contact@davezpizza.fr",
    deliveryUrl: "https://www.ubereats.com",
    orderUrl: "https://www.tastycloud.fr",
    social: {
        instagram: "https://www.instagram.com/davezpizza",
        facebook: "https://www.facebook.com/davezpizza",
    },
    mapsEmbedUrl:
        "https://maps.google.com/maps?width=100%&height=100%&hl=fr&q=Davez+Pizza,+1332+Rte+de+Lyon,+Davézieux&t=&z=15&ie=UTF8&iwloc=B&output=embed",
} as const;

export type DaySlot = { open: string; close: string } | { closed: true };

export type BusinessHour = {
    day: string;
    morning: DaySlot;
    evening: DaySlot;
};

export type Season = "summer" | "winter";

/**
 * Plage de dates de la saison été (format "MM-DD").
 * En dehors de cette période, les horaires d'hiver s'appliquent automatiquement.
 */
export const SUMMER_PERIOD = {
    start: "05-01", // 1er mai
    end:   "09-30", // 30 septembre
} as const;

/**
 * Retourne la saison active en fonction de la date du jour.
 * À appeler côté serveur à chaque requête (ne pas utiliser comme constante de module).
 */
export function getCurrentSeason(): Season {
    const now = new Date();
    const mmdd = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
    return mmdd >= SUMMER_PERIOD.start && mmdd <= SUMMER_PERIOD.end ? "summer" : "winter";
}

export const SCHEDULE: Record<Season, BusinessHour[]> = {
    winter: [
        { day: "Lundi",     morning: { closed: true },                  evening: { open: "18h00", close: "22h00" } },
        { day: "Mardi",     morning: { open: "11h30", close: "14h00" }, evening: { open: "18h00", close: "22h00" } },
        { day: "Mercredi",  morning: { open: "11h30", close: "14h00" }, evening: { open: "18h00", close: "22h00" } },
        { day: "Jeudi",     morning: { open: "11h30", close: "14h00" }, evening: { open: "18h00", close: "22h00" } },
        { day: "Vendredi",  morning: { open: "11h30", close: "14h00" }, evening: { open: "18h00", close: "22h00" } },
        { day: "Samedi",    morning: { open: "11h30", close: "14h00" }, evening: { open: "18h00", close: "22h30" } },
        { day: "Dimanche",  morning: { closed: true },                  evening: { open: "18h00", close: "22h00" } },
    ],
    summer: [
        { day: "Lundi",     morning: { closed: true },                  evening: { open: "18h30", close: "22h00" } },
        { day: "Mardi",     morning: { open: "11h30", close: "14h00" }, evening: { open: "18h30", close: "22h00" } },
        { day: "Mercredi",  morning: { open: "11h30", close: "14h00" }, evening: { open: "18h30", close: "22h00" } },
        { day: "Jeudi",     morning: { open: "11h30", close: "14h00" }, evening: { open: "18h30", close: "22h00" } },
        { day: "Vendredi",  morning: { open: "11h30", close: "14h00" }, evening: { open: "18h30", close: "22h00" } },
        { day: "Samedi",    morning: { open: "11h30", close: "14h00" }, evening: { open: "18h30", close: "22h30" } },
        { day: "Dimanche",  morning: { open: "11h30", close: "14h00" }, evening: { open: "18h30", close: "22h00" } },
    ],
};

/** Horaires de la saison en cours — évalué à chaque appel. */
export const HOURS = SCHEDULE[getCurrentSeason()];
