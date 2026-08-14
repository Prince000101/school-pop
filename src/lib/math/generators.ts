import type { Rng } from "./rng";
import { mulberry32, pick, randInt, shuffle } from "./rng";
import type { BandId, Question, TopicId, VisualCount } from "./types";
import { clampDifficulty } from "./topics";

const COUNT_ICONS = ["⭐", "🍎", "🐠", "🐻", "🎈", "🍬", "🚀", "🦖", "🫐", "🌼"];

const HINTS: Partial<Record<TopicId, string>> = {
  counting: "Count every single one out loud!",
  addition: "Put the numbers together in your head.",
  subtraction: "Take away from the bigger number.",
  comparing: "The bigger number is the one that is worth more.",
  bonds: "Count up from the number you see to reach the target.",
  missing: "Work backwards — what number does the trick?",
  multiplication: "Think of it as adding in groups.",
  division: "Share the big number into fair groups.",
  fractions: "Split it evenly, then count the pieces.",
  decimals: "Line up the decimal points in your head.",
  percents: "Percent means out of every 100.",
  negative: "Below zero, numbers go backwards.",
  order: "Brackets first, then multiply and divide, then add and take away.",
};

interface GenCtx {
  rng: Rng;
  band: BandId;
  difficulty: number;
  seed: number;
}

function options(rng: Rng, answer: number, count = 4): number[] {
  const deltas = [1, 2, 3, 5, 10, 1, 2, 4, 10, 20, 0.5, 1];
  const set = new Set<number>([answer]);
  let guard = 0;
  while (set.size < count && guard < 200) {
    guard++;
    const d = pick(rng, deltas);
    const sign = rng() < 0.5 ? -1 : 1;
    let v = answer + sign * d;
    if (rng() < 0.35) v = answer + sign * Math.round(d * (1 + rng() * 3));
    if (rng() < 0.15) v = answer + (rng() < 0.5 ? -1 : 1) * (10 * Math.ceil(answer / 10) || 10);
    if (v < 0 || v === answer) v = answer + d;
    if (Number.isInteger(answer) && !Number.isInteger(v)) v = Math.round(v);
    if (answer >= 100) v = Math.round(v / 10) * 10;
    set.add(v);
  }
  return shuffle(rng, [...set]).slice(0, count);
}

function smallOptions(rng: Rng, answer: number, lo: number, hi: number, count = 4): number[] {
  const set = new Set<number>([answer]);
  let guard = 0;
  while (set.size < count && guard < 100) {
    guard++;
    let v = answer + randInt(rng, -2, 2);
    if (v === answer) v = answer + 1;
    set.add(Math.max(lo, Math.min(hi, v)));
  }
  return shuffle(rng, [...set]).slice(0, count);
}

function base(
  ctx: GenCtx,
  topic: TopicId,
  text: string,
  answer: number,
  optCount: number,
  visual?: VisualCount,
): Question {
  const { band, difficulty, seed } = ctx;
  const id = `${seed}-${topic}-${randInt(ctx.rng, 1, 1e9)}`;
  return {
    id,
    topic,
    subject: "math",
    band,
    difficulty,
    text,
    answer,
    options: options(ctx.rng, answer, optCount),
    visual,
    hint: HINTS[topic] ?? "",
  };
}

function genCounting(ctx: GenCtx): Question {
  const { difficulty } = ctx;
  const cap = difficulty <= 2 ? 10 : difficulty <= 4 ? 12 : difficulty <= 6 ? 15 : difficulty <= 8 ? 18 : 20;
  const items = randInt(ctx.rng, 3, cap);
  const icon = pick(ctx.rng, COUNT_ICONS);
  const q = base(ctx, "counting", `How many ${icon} do you see?`, items, 4, {
    kind: "count",
    items,
    icon,
  });
  q.options = smallOptions(ctx.rng, items, Math.max(0, items - 3), items + 3, 4);
  return q;
}

const SUM_CAPS = [6, 10, 12, 20, 50, 100, 200, 500, 1000, 2000];

function genAddition(ctx: GenCtx): Question {
  const cap = SUM_CAPS[ctx.difficulty - 1];
  const a = randInt(ctx.rng, 1, Math.max(2, Math.floor(cap * 0.6)));
  const b = randInt(ctx.rng, 1, Math.max(1, cap - a));
  const answer = a + b;
  const optCount = ctx.band === "k" ? 3 : 4;
  return base(ctx, "addition", `What is ${a} + ${b}?`, answer, optCount);
}

function genSubtraction(ctx: GenCtx): Question {
  const cap = SUM_CAPS[ctx.difficulty - 1];
  const a = randInt(ctx.rng, 2, cap);
  const b = randInt(ctx.rng, 1, a);
  const answer = a - b;
  const optCount = ctx.band === "k" ? 3 : 4;
  return base(ctx, "subtraction", `What is ${a} - ${b}?`, answer, optCount);
}

const TABLE_MAX = [3, 4, 5, 6, 7, 8, 9, 12, 12, 12];

function genMultiplication(ctx: GenCtx): Question {
  const d = ctx.difficulty;
  let a: number;
  let b: number;
  if (d >= 10) {
    a = randInt(ctx.rng, 11, 15);
    b = randInt(ctx.rng, 11, 15);
  } else if (d === 9) {
    a = randInt(ctx.rng, 11, 25);
    b = randInt(ctx.rng, 2, 9);
  } else {
    const t = TABLE_MAX[d - 1];
    a = randInt(ctx.rng, 2, t);
    b = randInt(ctx.rng, 2, t);
  }
  const answer = a * b;
  return base(ctx, "multiplication", `What is ${a} × ${b}?`, answer, 4);
}

function genDivision(ctx: GenCtx): Question {
  const d = ctx.difficulty;
  const t = TABLE_MAX[d - 1];
  const b = randInt(ctx.rng, 2, t);
  const c = randInt(ctx.rng, 2, t);
  const a = b * c;
  return base(ctx, "division", `What is ${a} ÷ ${b}?`, c, 4);
}

function genComparing(ctx: GenCtx): Question {
  const d = ctx.difficulty;
  let a: number;
  let b: number;
  let text: string;
  if (d <= 5) {
    const cap = [10, 20, 50, 100, 200][d - 1];
    a = randInt(ctx.rng, 1, cap);
    b = randInt(ctx.rng, 1, cap);
    text = `Which number is bigger?`;
  } else {
    const cap = [30, 50, 100, 200, 500][d - 6];
    const s1 = randInt(ctx.rng, 2, Math.floor(cap / 2));
    const s2 = randInt(ctx.rng, 2, Math.floor(cap / 2));
    a = s1 + (cap - s1);
    b = s2 + (cap - s2);
    text = `Which sum is bigger? ${s1} + ${cap - s1} or ${s2} + ${cap - s2}?`;
  }
  const askBigger = ctx.rng() < 0.7;
  const answer = askBigger ? Math.max(a, b) : Math.min(a, b);
  const q = base(ctx, "comparing", text, answer, 2);
  q.options = shuffle(ctx.rng, [a, b]);
  if (a === b) q.options = shuffle(ctx.rng, [a, a + randInt(ctx.rng, 1, 3)]);
  return q;
}

function genBonds(ctx: GenCtx): Question {
  const targets = [5, 10, 10, 20, 20, 50, 100, 100, 100, 100];
  const target = targets[ctx.difficulty - 1];
  const given = randInt(ctx.rng, 1, target - 1);
  const answer = target - given;
  return base(ctx, "bonds", `${given} + ? = ${target}`, answer, 4);
}

function genMissing(ctx: GenCtx): Question {
  const d = ctx.difficulty;
  const kind = pick(ctx.rng, ["add", "add", "mul"] as const);
  if (kind === "add") {
    const cap = [10, 12, 20, 50, 100, 100, 200, 500, 500, 1000][d - 1];
    const b = randInt(ctx.rng, 1, Math.floor(cap / 2));
    const c = randInt(ctx.rng, b + 1, cap);
    const a = c - b;
    const text = ctx.rng() < 0.5 ? `? + ${b} = ${c}` : `${b} + ? = ${c}`;
    return base(ctx, "missing", text, a, 4);
  }
  const t = [4, 5, 6, 7, 8, 9, 9, 12, 12, 12][d - 1];
  const b = randInt(ctx.rng, 2, t);
  const c = randInt(ctx.rng, 2, t);
  const a = b * c;
  const text = ctx.rng() < 0.5 ? `? × ${b} = ${a}` : `${b} × ? = ${a}`;
  return base(ctx, "missing", text, c, 4);
}

function genFractions(ctx: GenCtx): Question {
  const d = ctx.difficulty;
  const denoms = [2, 3, 4, 5, 8, 10, 4, 5, 8, 10];
  const denom = denoms[d - 1];
  const num = randInt(ctx.rng, 1, denom - 1);
  const factor = randInt(ctx.rng, 1, d <= 5 ? 6 : 12);
  const total = denom * factor;
  const answer = (num / denom) * total;
  return base(ctx, "fractions", `What is ${num}/${denom} of ${total}?`, answer, 4);
}

function genDecimals(ctx: GenCtx): Question {
  const d = ctx.difficulty;
  const add = d <= 6;
  if (add) {
    const tenths = d <= 3;
    const max = tenths ? 30 : 300;
    const scale = tenths ? 1 : 0.01;
    const a = randInt(ctx.rng, 1, max) * scale;
    const b = randInt(ctx.rng, 1, max) * scale;
    const round = (n: number) => Math.round(n * 100) / 100;
    const answer = round(a + b);
    const q = base(ctx, "decimals", `What is ${a.toFixed(tenths ? 1 : 2)} + ${b.toFixed(tenths ? 1 : 2)}?`, answer, 4);
    return q;
  }
  const max = d <= 8 ? 30 : 300;
  const scale = 0.01;
  const a = randInt(ctx.rng, 2, max) * scale;
  const b = randInt(ctx.rng, 1, Math.floor(a * 100 - 1)) * scale;
  const round = (n: number) => Math.round(n * 100) / 100;
  const answer = round(a - b);
  return base(ctx, "decimals", `What is ${a.toFixed(2)} - ${b.toFixed(2)}?`, answer, 4);
}

function genPercents(ctx: GenCtx): Question {
  const d = ctx.difficulty;
  const pct = pick(ctx.rng, [10, 20, 25, 50, 75, 100]);
  let base10: number;
  if (pct === 10) base10 = randInt(ctx.rng, 1, Math.min(20, d * 2)) * 10;
  else if (pct === 20) base10 = randInt(ctx.rng, 1, Math.min(30, d * 3)) * 5;
  else if (pct === 25) base10 = randInt(ctx.rng, 1, Math.min(30, d * 3)) * 4;
  else if (pct === 50) base10 = randInt(ctx.rng, 1, Math.min(60, d * 6)) * 2;
  else if (pct === 75) base10 = randInt(ctx.rng, 1, Math.min(30, d * 3)) * 4;
  else base10 = randInt(ctx.rng, 10, 50);
  const answer = (pct / 100) * base10;
  const q = base(ctx, "percents", `What is ${pct}% of ${base10}?`, answer, 4);
  if (q.options.includes(base10) && q.options.length > 3 && !q.options.includes(answer)) {
    q.options[0] = answer;
    q.options = shuffle(ctx.rng, q.options);
  }
  return q;
}

function genNegative(ctx: GenCtx): Question {
  const d = ctx.difficulty;
  const maxN = d <= 5 ? 10 : 25;
  const maxP = d <= 5 ? 12 : 30;
  const neg = randInt(ctx.rng, 1, maxN);
  const pos = randInt(ctx.rng, 1, maxP);
  const text = ctx.rng() < 0.5 ? `(-${neg}) + ${pos} = ?` : `${pos} - ${neg + pos} = ?`;
  const answer = text.startsWith("(-") ? pos - neg : -neg;
  const q = base(ctx, "negative", text, answer, 4);
  if (!q.options.includes(answer)) {
    q.options[0] = answer;
    q.options = shuffle(ctx.rng, q.options);
  }
  return q;
}

function genOrder(ctx: GenCtx): Question {
  const d = ctx.difficulty;
  let answer: number;
  let text: string;
  if (d <= 5) {
    const a = randInt(ctx.rng, 2, 9);
    const b = randInt(ctx.rng, 2, 5);
    const c = randInt(ctx.rng, 2, 5);
    answer = a + b * c;
    text = `${a} + ${b} × ${c} = ?`;
  } else if (d <= 8) {
    const a = randInt(ctx.rng, 5, 20);
    const b = randInt(ctx.rng, 2, 6);
    const c = randInt(ctx.rng, 2, 6);
    answer = a * b - c;
    text = `${a} × ${b} - ${c} = ?`;
  } else {
    const a = randInt(ctx.rng, 2, 9);
    const b = randInt(ctx.rng, 2, 9);
    const c = randInt(ctx.rng, 2, 9);
    answer = (a + b) * c;
    text = `(${a} + ${b}) × ${c} = ?`;
  }
  return base(ctx, "order", text, answer, 4);
}

const GENERATORS: Partial<Record<TopicId, (ctx: GenCtx) => Question>> = {
  counting: genCounting,
  addition: genAddition,
  subtraction: genSubtraction,
  comparing: genComparing,
  bonds: genBonds,
  missing: genMissing,
  multiplication: genMultiplication,
  division: genDivision,
  fractions: genFractions,
  decimals: genDecimals,
  percents: genPercents,
  negative: genNegative,
  order: genOrder,
};

export function generateMathOne(
  topic: TopicId,
  band: BandId,
  difficultyInput: number,
  seedInput: number,
  index: number,
): Question {
  const difficulty = clampDifficulty(difficultyInput);
  const rng = mulberrySeed(seedInput, topic, index);
  const ctx: GenCtx = { rng, band, difficulty, seed: seedInput };
  const gen = GENERATORS[topic];
  if (!gen) throw new Error(`No math generator for "${topic}"`);
  return gen(ctx);
}

function mulberrySeed(seed: number, topic: TopicId, index: number): Rng {
  const a = ((seed + (topic.charCodeAt(0) * 31 + topic.length * 7 + index * 131071)) >>> 0);
  return mulberry32(a);
}
