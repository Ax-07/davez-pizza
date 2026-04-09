import { prisma } from "@/lib/prisma";
import { BUSINESS } from "@/data/config";

const PLACE_ID = process.env.GOOGLE_PLACE_ID ?? BUSINESS.googlePlaceId;
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

type PlacesApiReview = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
};

type PlacesApiResponse = {
  result?: { reviews?: PlacesApiReview[] };
  status: string;
  error_message?: string;
};

function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

/**
 * Synchronise les avis Google 5★ en base.
 * @param force — si true, ignore le check "déjà synced aujourd'hui" (utilisé par le cron)
 */
export async function syncReviewsIfNeeded(
  force = false
): Promise<{ synced: number } | { skipped: true }> {
  if (!force) {
    const last = await prisma.review.findFirst({
      orderBy: { syncedAt: "desc" },
      select: { syncedAt: true },
    });
    if (last && isToday(last.syncedAt)) return { skipped: true };
  }

  if (!API_KEY) return { skipped: true };

  const url = new URL("https://maps.googleapis.com/maps/api/place/details/json");
  url.searchParams.set("place_id", PLACE_ID);
  url.searchParams.set("fields", "reviews");
  url.searchParams.set("language", "fr");
  url.searchParams.set("reviews_sort", "newest");
  url.searchParams.set("key", API_KEY);

  let data: PlacesApiResponse;
  try {
    const res = await fetch(url.toString());
    if (!res.ok) return { skipped: true };
    data = (await res.json()) as PlacesApiResponse;
  } catch {
    return { skipped: true };
  }

  if (data.status !== "OK" || !data.result?.reviews) return { skipped: true };

  const fiveStarReviews = data.result.reviews.filter((r) => r.rating === 5);

  await Promise.all(
    fiveStarReviews.map((r) =>
      prisma.review.upsert({
        where: { id: `${r.time}-${r.author_name}` },
        update: { text: r.text, date: r.relative_time_description },
        create: {
          id: `${r.time}-${r.author_name}`,
          author: r.author_name,
          rating: r.rating,
          text: r.text,
          date: r.relative_time_description,
        },
        select: { id: true },
      })
    )
  );

  return { synced: fiveStarReviews.length };
}
