import { NextResponse } from "next/server";
import { syncReviewsIfNeeded } from "@/lib/sync-reviews";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const result = await syncReviewsIfNeeded(true);
  return NextResponse.json(result);
}
