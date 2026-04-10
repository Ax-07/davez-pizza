import "server-only";

import { prisma } from "@/lib/prisma";
import { syncReviewsIfNeeded } from "@/lib/reviews/sync-reviews";
import { type GoogleReview } from "./types";

/**
 * Récupère les derniers avis 5★ synchronisés en base.
 * @returns Un tableau d'avis GoogleReview
 * @throws Une erreur si la récupération des avis échoue
 * @remarks Cette fonction synchronise d'abord les avis depuis l'API Google Places si cela n'a pas encore été fait aujourd'hui, puis récupère les avis 5★ depuis la base de données. Les avis sont retournés dans l'ordre du plus récent au plus ancien.
 */
export async function getLatestFiveStarReviews(): Promise<GoogleReview[]> {
  // Sync si pas encore fait aujourd'hui (safe côté runtime Node.js)
  await syncReviewsIfNeeded();

  const rows = await prisma.review.findMany({
    where: { rating: 5 },
    orderBy: { syncedAt: "desc" },
    take: 5,
    select: {
      id: true,
      author: true,
      rating: true,
      date: true,
      text: true,
    },
  });

  return rows.map((row) => ({
    id: row.id,
    author: row.author,
    rating: row.rating,
    date: row.date,
    text: row.text,
  }));
}
