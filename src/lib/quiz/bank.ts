import { hashSeed, mulberry32, shuffle } from "@/lib/math/rng";
import type { Answer, BandId, Question, SubjectId, TopicId } from "@/lib/math/types";

export interface BankEntry {
  /** Difficulty 1-10 this question is tuned for. */
  d: number;
  text: string;
  answer: Answer;
  /** Distractors + answer (unsorted — the generator shuffles). */
  options: Answer[];
  hint: string;
}

export interface TopicBank {
  topic: TopicId;
  subject: SubjectId;
  entries: BankEntry[];
}

/** How close an entry's difficulty must be to the requested difficulty. */
const DIFF_WINDOW = 2;

/**
 * Pick one question from a curated bank deterministically.
 * A shared offset (from seed+topic) plus the index means consecutive
 * indices in one batch yield distinct entries as long as the pool is
 * bigger than the batch — and `generateBatch` dedups as a safety net.
 */
export function generateFromBank(
  bank: TopicBank,
  band: BandId,
  difficulty: number,
  seed: number,
  index: number,
): Question {
  let pool = bank.entries.filter((e) => Math.abs(e.d - difficulty) <= DIFF_WINDOW);
  if (pool.length === 0) pool = bank.entries;

  const offsetRng = mulberry32(hashSeed(`${seed}|${bank.topic}|offset`));
  const offset = Math.floor(offsetRng() * pool.length);
  const entry = pool[(offset + index) % pool.length];

  const rng = mulberry32(hashSeed(`${seed}|${bank.topic}|${index}`));
  const options = shuffle(rng, entry.options);
  const id = `${seed}-${bank.topic}-${index}`;

  return {
    id,
    topic: bank.topic,
    subject: bank.subject,
    band,
    difficulty,
    text: entry.text,
    answer: entry.answer,
    options,
    hint: entry.hint,
  };
}
