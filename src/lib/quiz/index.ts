import type { BandId, Question, TopicId } from "@/lib/math/types";
import { TOPIC_BY_ID } from "@/lib/math/topics";
import { ENGLISH_BANKS } from "./english";
import { SCIENCE_BANKS } from "./science";
import { SOCIAL_BANKS } from "./social";
import { generateFromBank, type TopicBank } from "./bank";

const BANKS: Record<string, TopicBank> = Object.fromEntries(
  [...ENGLISH_BANKS, ...SCIENCE_BANKS, ...SOCIAL_BANKS].map((b) => [b.topic, b]),
);

const QUIZ_TOPICS = new Set<string>(Object.keys(BANKS));

/** Is this a non-math (curated bank) topic that is currently implemented? */
export function isQuizTopic(topic: string): boolean {
  return QUIZ_TOPICS.has(topic);
}

export function generateQuizOne(
  topic: TopicId,
  band: BandId,
  difficulty: number,
  seed: number,
  index: number,
): Question {
  const bank = BANKS[topic];
  if (!bank) {
    throw new Error(`Quiz topic "${topic}" is not implemented yet`);
  }
  return generateFromBank(bank, band, difficulty, seed, index);
}

/** Total number of curated questions currently available for a topic. */
export function bankSize(topic: string): number {
  return BANKS[topic]?.entries.length ?? 0;
}

/** Quick check used by tests/validation. */
export function implementedSubjectTopics(subject: TopicId | string): string[] {
  return Object.values(BANKS)
    .filter((b) => b.subject === subject)
    .map((b) => b.topic);
}

export function isKnownTopic(topic: string): boolean {
  return topic in TOPIC_BY_ID;
}
