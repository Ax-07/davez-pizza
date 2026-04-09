import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { syncReviewsIfNeeded } from "@/lib/sync-reviews";

export const runtime = "nodejs";
export const revalidate = 86400;

export type GoogleReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
};

export async function GET() {
  // Sync si pas encore fait aujourd'hui (fire & forget safe côté Node.js)
  await syncReviewsIfNeeded();

  const rows = await prisma.review.findMany({
    where: { rating: 5 },
    orderBy: { syncedAt: "desc" },
    take: 5,
  });

  if (rows.length === 0) {
    return NextResponse.json({ error: "Aucun avis en base." }, { status: 404 });
  }

  const reviews: GoogleReview[] = rows.map((r) => ({
    id: r.id,
    author: r.author,
    rating: r.rating,
    date: r.date,
    text: r.text,
  }));

  return NextResponse.json(reviews, {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
