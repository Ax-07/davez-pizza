import { NextResponse } from "next/server";
import { getLatestFiveStarReviews } from "@/lib/reviews";

export const runtime = "nodejs";
export const revalidate = 86400;

export async function GET() {
  const rows = await getLatestFiveStarReviews();

  if (rows.length === 0) {
    return NextResponse.json({ error: "Aucun avis en base." }, { status: 404 });
  }

  return NextResponse.json(rows, {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
    },
  });
}
