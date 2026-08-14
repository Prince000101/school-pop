import { NextRequest } from "next/server";
import { generateBatch } from "@/lib/math";
import type { BandId } from "@/lib/math/types";
import { isValidTopic } from "@/lib/math/topics";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;

  const topic = sp.get("topic") ?? "";
  if (!isValidTopic(topic)) {
    return Response.json(
      { error: `Unknown topic "${topic}"`, topics: "see GET /api/topics" },
      { status: 400 },
    );
  }

  const rawBand = sp.get("band") ?? "m";
  const band: BandId = rawBand === "k" || rawBand === "e" ? rawBand : "m";

  const difficulty = clampNum(sp.get("difficulty"), 1, 10, 1);
  const count = clampNum(sp.get("count"), 1, 20, 10);
  const seed = Math.floor(clampNum(sp.get("seed"), 0, Number.MAX_SAFE_INTEGER, Date.now()));

  const batch = generateBatch({ topic, band, difficulty, count, seed });
  return Response.json(batch);
}

function clampNum(raw: string | null, min: number, max: number, fallback: number): number {
  const n = Number(raw);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.round(n)));
}
