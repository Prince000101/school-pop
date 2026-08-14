import type { BandId, SubjectId, TopicId } from "./types";

export interface BandMeta {
  id: BandId;
  name: string;
  emoji: string;
  age: string;
  tagline: string;
  color: string;
  colorDeep: string;
  sort: number;
}

export const BANDS: BandMeta[] = [
  {
    id: "k",
    name: "Playground",
    emoji: "🧸",
    age: "Ages 5-7",
    tagline: "Counting, adding & playful first steps",
    color: "var(--color-pops-mint)",
    colorDeep: "var(--color-pops-mintd)",
    sort: 0,
  },
  {
    id: "m",
    name: "Adventure",
    emoji: "🚀",
    age: "Ages 7-9",
    tagline: "Times tables, division & brave number quests",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    sort: 1,
  },
  {
    id: "e",
    name: "Champion",
    emoji: "🏆",
    age: "Ages 9-12",
    tagline: "Fractions, percents & mighty math challenges",
    color: "var(--color-pops-purple)",
    colorDeep: "var(--color-pops-purpled)",
    sort: 2,
  },
];

export const BAND_BY_ID: Record<BandId, BandMeta> = Object.fromEntries(
  BANDS.map((b) => [b.id, b]),
) as Record<BandId, BandMeta>;

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  emoji: string;
  color: string;
  colorDeep: string;
  tagline: string;
  sort: number;
}

export const SUBJECTS: SubjectMeta[] = [
  {
    id: "math",
    name: "Math",
    emoji: "➕",
    color: "var(--color-pops-pink)",
    colorDeep: "var(--color-pops-pinkd)",
    tagline: "Numbers, shapes & mighty math magic",
    sort: 0,
  },
  {
    id: "english",
    name: "English",
    emoji: "🔤",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    tagline: "Letters, words & reading superpowers",
    sort: 1,
  },
  {
    id: "science",
    name: "Science",
    emoji: "🔬",
    color: "var(--color-pops-mint)",
    colorDeep: "var(--color-pops-mintd)",
    tagline: "Animals, space & how things work",
    sort: 2,
  },
  {
    id: "social",
    name: "Social",
    emoji: "🌍",
    color: "var(--color-pops-coral)",
    colorDeep: "var(--color-pops-corald)",
    tagline: "People, places & our big world",
    sort: 3,
  },
];

export const SUBJECT_BY_ID: Record<SubjectId, SubjectMeta> = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, s]),
) as Record<SubjectId, SubjectMeta>;

export interface TopicMeta {
  id: TopicId;
  subject: SubjectId;
  name: string;
  emoji: string;
  color: string;
  colorDeep: string;
  bands: BandId[];
  tagline: string;
}

export const TOPICS: TopicMeta[] = [
  // ---- Math ----
  {
    id: "counting",
    subject: "math",
    name: "Count the Fun",
    emoji: "⭐",
    color: "var(--color-pops-yellow)",
    colorDeep: "var(--color-pops-yellowd)",
    bands: ["k"],
    tagline: "Count shiny things!",
  },
  {
    id: "addition",
    subject: "math",
    name: "Add It Up",
    emoji: "➕",
    color: "var(--color-pops-pink)",
    colorDeep: "var(--color-pops-pinkd)",
    bands: ["k", "m", "e"],
    tagline: "Put numbers together",
  },
  {
    id: "subtraction",
    subject: "math",
    name: "Take Away",
    emoji: "➖",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    bands: ["k", "m", "e"],
    tagline: "Steal some numbers away",
  },
  {
    id: "comparing",
    subject: "math",
    name: "Bigger & Smaller",
    emoji: "⚖️",
    color: "var(--color-pops-coral)",
    colorDeep: "var(--color-pops-corald)",
    bands: ["k", "m"],
    tagline: "Who's the biggest?",
  },
  {
    id: "bonds",
    subject: "math",
    name: "Number Besties",
    emoji: "🤝",
    color: "var(--color-pops-mint)",
    colorDeep: "var(--color-pops-mintd)",
    bands: ["k", "m"],
    tagline: "Find the missing buddy",
  },
  {
    id: "missing",
    subject: "math",
    name: "Missing Mystery",
    emoji: "🕵️",
    color: "var(--color-pops-purple)",
    colorDeep: "var(--color-pops-purpled)",
    bands: ["m", "e"],
    tagline: "Sneaky hidden numbers",
  },
  {
    id: "multiplication",
    subject: "math",
    name: "Times Tables",
    emoji: "✖️",
    color: "var(--color-pops-red)",
    colorDeep: "var(--color-pops-redd)",
    bands: ["m", "e"],
    tagline: "Multiply like a hero",
  },
  {
    id: "division",
    subject: "math",
    name: "Sharing Time",
    emoji: "🍰",
    color: "var(--color-pops-yellow)",
    colorDeep: "var(--color-pops-yellowd)",
    bands: ["m", "e"],
    tagline: "Share things fairly",
  },
  {
    id: "fractions",
    subject: "math",
    name: "Fraction Fun",
    emoji: "🥧",
    color: "var(--color-pops-pink)",
    colorDeep: "var(--color-pops-pinkd)",
    bands: ["e"],
    tagline: "Slices of the pie",
  },
  {
    id: "decimals",
    subject: "math",
    name: "Decimal Dive",
    emoji: "🌊",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    bands: ["e"],
    tagline: "Numbers in the deep",
  },
  {
    id: "percents",
    subject: "math",
    name: "Percent Power",
    emoji: "💯",
    color: "var(--color-pops-coral)",
    colorDeep: "var(--color-pops-corald)",
    bands: ["e"],
    tagline: "Out of every 100!",
  },
  {
    id: "negative",
    subject: "math",
    name: "Below Zero",
    emoji: "🧊",
    color: "var(--color-pops-mint)",
    colorDeep: "var(--color-pops-mintd)",
    bands: ["e"],
    tagline: "Cold, tricky numbers",
  },
  {
    id: "order",
    subject: "math",
    name: "Order of Ops",
    emoji: "🎢",
    color: "var(--color-pops-purple)",
    colorDeep: "var(--color-pops-purpled)",
    bands: ["e"],
    tagline: "Follow the number rules",
  },

  // ---- English ----
  {
    id: "letters",
    subject: "english",
    name: "Letter Land",
    emoji: "🔤",
    color: "var(--color-pops-pink)",
    colorDeep: "var(--color-pops-pinkd)",
    bands: ["k"],
    tagline: "Meet the letters & their sounds",
  },
  {
    id: "rhymes",
    subject: "english",
    name: "Rhyme Time",
    emoji: "🎵",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    bands: ["k"],
    tagline: "Words that sound the same",
  },
  {
    id: "spelling1",
    subject: "english",
    name: "First Words",
    emoji: "🧩",
    color: "var(--color-pops-mint)",
    colorDeep: "var(--color-pops-mintd)",
    bands: ["k"],
    tagline: "Spell little words right",
  },
  {
    id: "plurals",
    subject: "english",
    name: "Plural Power",
    emoji: "👯",
    color: "var(--color-pops-yellow)",
    colorDeep: "var(--color-pops-yellowd)",
    bands: ["m"],
    tagline: "One, two, many!",
  },
  {
    id: "verbs",
    subject: "english",
    name: "Verb Time",
    emoji: "🏃",
    color: "var(--color-pops-purple)",
    colorDeep: "var(--color-pops-purpled)",
    bands: ["m"],
    tagline: "Doing words in the past",
  },
  {
    id: "capital",
    subject: "english",
    name: "Capital Crew",
    emoji: "🅰️",
    color: "var(--color-pops-coral)",
    colorDeep: "var(--color-pops-corald)",
    bands: ["m"],
    tagline: "Big letters, big rules",
  },
  {
    id: "synonyms",
    subject: "english",
    name: "Word Pals",
    emoji: "🤝",
    color: "var(--color-pops-red)",
    colorDeep: "var(--color-pops-redd)",
    bands: ["m"],
    tagline: "Words that mean the same",
  },
  {
    id: "spelling",
    subject: "english",
    name: "Spelling Bee",
    emoji: "🐝",
    color: "var(--color-pops-yellow)",
    colorDeep: "var(--color-pops-yellowd)",
    bands: ["e"],
    tagline: "Tricky word wizardry",
  },
  {
    id: "homophones",
    subject: "english",
    name: "Sound-Alikes",
    emoji: "👂",
    color: "var(--color-pops-mint)",
    colorDeep: "var(--color-pops-mintd)",
    bands: ["e"],
    tagline: "Same sound, different word",
  },
  {
    id: "affixes",
    subject: "english",
    name: "Word Builders",
    emoji: "🏗️",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    bands: ["e"],
    tagline: "Prefixes & suffixes unlock words",
  },

  // ---- Science ----
  {
    id: "animals",
    subject: "science",
    name: "Animal Friends",
    emoji: "🐘",
    color: "var(--color-pops-yellow)",
    colorDeep: "var(--color-pops-yellowd)",
    bands: ["k"],
    tagline: "Furry, scaly, feathery pals",
  },
  {
    id: "colors",
    subject: "science",
    name: "Color Pop",
    emoji: "🌈",
    color: "var(--color-pops-pink)",
    colorDeep: "var(--color-pops-pinkd)",
    bands: ["k"],
    tagline: "Shapes & colors everywhere",
  },
  {
    id: "food",
    subject: "science",
    name: "Yummy Garden",
    emoji: "🍎",
    color: "var(--color-pops-mint)",
    colorDeep: "var(--color-pops-mintd)",
    bands: ["k"],
    tagline: "Fruits, veggies & healthy snacks",
  },
  {
    id: "habitats",
    subject: "science",
    name: "Home Sweet Home",
    emoji: "🏡",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    bands: ["m"],
    tagline: "Where do animals live?",
  },
  {
    id: "matter",
    subject: "science",
    name: "States of Matter",
    emoji: "🧊",
    color: "var(--color-pops-coral)",
    colorDeep: "var(--color-pops-corald)",
    bands: ["m"],
    tagline: "Solid, liquid, gas",
  },
  {
    id: "weather",
    subject: "science",
    name: "Weather Wizard",
    emoji: "🌦️",
    color: "var(--color-pops-yellow)",
    colorDeep: "var(--color-pops-yellowd)",
    bands: ["m"],
    tagline: "Seasons, rainbows & storms",
  },
  {
    id: "plants",
    subject: "science",
    name: "Plant Power",
    emoji: "🌱",
    color: "var(--color-pops-mint)",
    colorDeep: "var(--color-pops-mintd)",
    bands: ["m"],
    tagline: "How plants grow",
  },
  {
    id: "body",
    subject: "science",
    name: "Amazing Body",
    emoji: "🦴",
    color: "var(--color-pops-red)",
    colorDeep: "var(--color-pops-redd)",
    bands: ["m"],
    tagline: "Senses, bones & super skin",
  },
  {
    id: "space",
    subject: "science",
    name: "Space Voyage",
    emoji: "🚀",
    color: "var(--color-pops-purple)",
    colorDeep: "var(--color-pops-purpled)",
    bands: ["e"],
    tagline: "Planets, stars & the Moon",
  },
  {
    id: "machines",
    subject: "science",
    name: "Simple Machines",
    emoji: "🔧",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    bands: ["e"],
    tagline: "Levers, wheels & wedges",
  },
  {
    id: "ecosystems",
    subject: "science",
    name: "Food Chains",
    emoji: "🦁",
    color: "var(--color-pops-coral)",
    colorDeep: "var(--color-pops-corald)",
    bands: ["e"],
    tagline: "Who eats who?",
  },
  {
    id: "forces",
    subject: "science",
    name: "Push & Pull",
    emoji: "🛷",
    color: "var(--color-pops-mint)",
    colorDeep: "var(--color-pops-mintd)",
    bands: ["e"],
    tagline: "Forces, magnets & motion",
  },

  // ---- Social ----
  {
    id: "community",
    subject: "social",
    name: "Community Heroes",
    emoji: "👮",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    bands: ["k"],
    tagline: "Helpers in your town",
  },
  {
    id: "days",
    subject: "social",
    name: "Day & Date",
    emoji: "📅",
    color: "var(--color-pops-yellow)",
    colorDeep: "var(--color-pops-yellowd)",
    bands: ["k"],
    tagline: "Days, months & the calendar",
  },
  {
    id: "directions",
    subject: "social",
    name: "Left & Right",
    emoji: "🧭",
    color: "var(--color-pops-pink)",
    colorDeep: "var(--color-pops-pinkd)",
    bands: ["k"],
    tagline: "Up, down, left & right",
  },
  {
    id: "family",
    subject: "social",
    name: "My Family",
    emoji: "👨‍👩‍👧",
    color: "var(--color-pops-coral)",
    colorDeep: "var(--color-pops-corald)",
    bands: ["k"],
    tagline: "Who's who at home",
  },
  {
    id: "maps",
    subject: "social",
    name: "Map Master",
    emoji: "🗺️",
    color: "var(--color-pops-mint)",
    colorDeep: "var(--color-pops-mintd)",
    bands: ["m"],
    tagline: "North, South, East, West",
  },
  {
    id: "continents",
    subject: "social",
    name: "Continents & Oceans",
    emoji: "🌊",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    bands: ["m"],
    tagline: "Our amazing Earth",
  },
  {
    id: "money",
    subject: "social",
    name: "Money Matters",
    emoji: "💰",
    color: "var(--color-pops-yellow)",
    colorDeep: "var(--color-pops-yellowd)",
    bands: ["m"],
    tagline: "Needs, wants & coins",
  },
  {
    id: "landmarks",
    subject: "social",
    name: "Famous Places",
    emoji: "🗼",
    color: "var(--color-pops-purple)",
    colorDeep: "var(--color-pops-purpled)",
    bands: ["m"],
    tagline: "Wonders of the world",
  },
  {
    id: "capitals",
    subject: "social",
    name: "World Capitals",
    emoji: "🏛️",
    color: "var(--color-pops-red)",
    colorDeep: "var(--color-pops-redd)",
    bands: ["e"],
    tagline: "Cities of the world",
  },
  {
    id: "flags",
    subject: "social",
    name: "Flags & Cultures",
    emoji: "🚩",
    color: "var(--color-pops-sky)",
    colorDeep: "var(--color-pops-skyd)",
    bands: ["e"],
    tagline: "Colors of the world",
  },
  {
    id: "government",
    subject: "social",
    name: "How We Run",
    emoji: "🏛️",
    color: "var(--color-pops-coral)",
    colorDeep: "var(--color-pops-corald)",
    bands: ["e"],
    tagline: "Rules, leaders & fairness",
  },
];

export const TOPIC_BY_ID: Record<TopicId, TopicMeta> = Object.fromEntries(
  TOPICS.map((t) => [t.id, t]),
) as Record<TopicId, TopicMeta>;

/** All topics available in a given age band (any subject). */
export function topicsForBand(band: BandId): TopicMeta[] {
  return TOPICS.filter((t) => t.bands.includes(band));
}

/** Subjects that have at least one topic in the given band. */
export function subjectsForBand(band: BandId): SubjectMeta[] {
  return SUBJECTS.filter((s) => TOPICS.some((t) => t.subject === s.id && t.bands.includes(band)));
}

/** Topics of one subject, optionally limited to a band. */
export function topicsForSubject(subject: SubjectId, band?: BandId): TopicMeta[] {
  return TOPICS.filter((t) => t.subject === subject && (!band || t.bands.includes(band)));
}

export function isValidTopic(id: string): id is TopicId {
  return id in TOPIC_BY_ID;
}

export function clampDifficulty(d: number): number {
  return Math.max(1, Math.min(10, Math.round(d) || 1));
}
