export type BandId = "k" | "m" | "e";

export type SubjectId = "math" | "english" | "science" | "social";

/** A correct answer can be a number or a short word/phrase. */
export type Answer = number | string;

export type TopicId =
  | "counting"
  | "addition"
  | "subtraction"
  | "comparing"
  | "bonds"
  | "missing"
  | "multiplication"
  | "division"
  | "fractions"
  | "decimals"
  | "percents"
  | "negative"
  | "order"
  | "letters"
  | "rhymes"
  | "spelling1"
  | "plurals"
  | "verbs"
  | "capital"
  | "synonyms"
  | "spelling"
  | "homophones"
  | "affixes"
  | "animals"
  | "colors"
  | "food"
  | "habitats"
  | "matter"
  | "weather"
  | "plants"
  | "body"
  | "space"
  | "machines"
  | "ecosystems"
  | "forces"
  | "community"
  | "days"
  | "directions"
  | "family"
  | "maps"
  | "continents"
  | "money"
  | "landmarks"
  | "capitals"
  | "flags"
  | "government";

export interface VisualCount {
  kind: "count";
  items: number;
  icon: string;
}

export interface Question {
  id: string;
  topic: TopicId;
  subject: SubjectId;
  band: BandId;
  difficulty: number;
  /** Short headline shown big, e.g. "What is 7 + 5?" or "Which word rhymes with cat?" */
  text: string;
  /** Optional sub-line, e.g. a kid-friendly whisper */
  sub?: string;
  answer: Answer;
  options: Answer[];
  visual?: VisualCount;
  hint: string;
}

export interface RoundMeta {
  subject: SubjectId;
  topic: TopicId;
  band: BandId;
  difficulty: number;
  count: number;
  seed: number;
}

export interface QuestionBatch {
  questions: Question[];
  meta: RoundMeta;
}
