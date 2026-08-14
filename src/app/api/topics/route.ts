import { NextRequest } from "next/server";
import { BANDS, SUBJECTS, TOPICS, topicsForBand, topicsForSubject } from "@/lib/math/topics";
import type { BandId, SubjectId } from "@/lib/math/types";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const sp = request.nextUrl.searchParams;
  const rawBand = sp.get("band");
  const rawSubject = sp.get("subject");

  const band: BandId | null = rawBand === "k" || rawBand === "m" || rawBand === "e" ? rawBand : null;
  const subject: SubjectId | null =
    rawSubject === "math" || rawSubject === "english" || rawSubject === "science" || rawSubject === "social"
      ? rawSubject
      : null;

  if (band && subject) {
    return Response.json({ band, subject, topics: topicsForSubject(subject, band) });
  }
  if (band) {
    return Response.json({ band, subjects: SUBJECTS, topics: topicsForBand(band) });
  }
  return Response.json({
    bands: BANDS,
    subjects: SUBJECTS,
    topics: TOPICS,
  });
}
