import "server-only";

import { prisma } from "@/lib/prisma";
import { syncReviewsIfNeeded } from "@/lib/sync-reviews";

export type GoogleReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
};

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
