import type { BandId, Question, QuestionBatch, TopicId } from "./types";
import { generateMathOne } from "./generators";
import { generateQuizOne, isQuizTopic } from "@/lib/quiz";

export * from "./types";
export * from "./rng";
export * from "./topics";
export { generateMathOne };

export interface GenerateBatchOptions {
  topic: TopicId;
  band: BandId;
  difficulty?: number;
  count?: number;
  seed?: number;
}

export function generateOne(
  topic: TopicId,
  band: BandId,
  difficulty: number,
  seed: number,
  index: number,
): Question {
  if (isQuizTopic(topic)) {
    return generateQuizOne(topic, band, difficulty, seed, index);
  }
  return generateMathOne(topic, band, difficulty, seed, index);
}

export function generateBatch(opts: GenerateBatchOptions): QuestionBatch {
  const { topic, band } = opts;
  const difficulty = Math.max(1, Math.min(10, Math.round(opts.difficulty ?? 1)));
  const count = Math.max(1, Math.min(20, opts.count ?? 10));
  const seed = (opts.seed ?? Math.floor(Math.random() * 2 ** 31)) >>> 0;

  const seen = new Set<string>();
  const questions: Question[] = [];
  let index = 0;
  while (questions.length < count && index < count * 60) {
    const q = generateOne(topic, band, difficulty, seed, index);
    index++;
    const key = `${q.text}|${q.answer}`;
    if (seen.has(key)) continue;
    seen.add(key);
    questions.push(q);
  }
  while (questions.length < count) {
    const q = generateOne(topic, band, difficulty, seed, index);
    index++;
    questions.push(q);
  }

  const meta = {
    subject: questions[0]?.subject ?? "math",
    topic,
    band,
    difficulty,
    count,
    seed,
  };
  return { questions, meta };
}

/** Suggested difficulty for a band given how well the kid is doing (0..1 mastery). */
export function suggestedDifficulty(band: BandId, mastery: number): number {
  if (band === "k") return Math.max(1, Math.min(6, Math.round(mastery * 5) + 1));
  if (band === "m") return Math.max(1, Math.min(8, Math.round(mastery * 7) + 1));
  return Math.max(1, Math.min(10, Math.round(mastery * 9) + 1));
}
