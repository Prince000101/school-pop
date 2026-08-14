import { mulberry32 } from "@/lib/math/rng";
import type { Answer } from "@/lib/math/types";
import type { BankEntry, TopicBank } from "./bank";

const HINTS: Record<string, string> = {
  letters: "Say the letter and its sound out loud!",
  rhymes: "Say the word and listen to its ending sound!",
  spelling1: "Sound the word out one letter at a time!",
  plurals: "Think about how the word changes when there are many!",
  verbs: "Think about yesterday — the past — what did it look like?",
  capital: "Names, days, months and the start of a sentence get big letters!",
  synonyms: "Which word means almost the same thing?",
  spelling: "Look carefully — tricky words hide sneaky letters!",
  homophones: "Words that sound the same mean different things!",
  affixes: "Little bits at the start or end of a word change its meaning!",
};

// Deterministic RNG used only to pick distractors at module load, so the
// banks are stable. Changes the moment new content is added — that's fine.
const pick = mulberry32(20260810);
function dist(candidates: string[], exclude: string, n: number): string[] {
  const pool = candidates.filter((c) => c !== exclude);
  const out: string[] = [];
  let guard = 0;
  while (out.length < n && pool.length && guard++ < 200) {
    const i = Math.floor(pick() * pool.length);
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}
function e(d: number, text: string, answer: Answer, options: Answer[], hint?: string): BankEntry {
  return { d, text, answer, options, hint: hint ?? HINTS["letters"] };
}

/* ================================================================
   LETTERS (Playground · difficulty 1-2)
   ================================================================ */

const LETTER_WORDS: Record<string, string[]> = {
  b: ["ball", "bear", "bee", "book", "boat", "bus", "bird", "banana"],
  c: ["cat", "cake", "car", "cow", "cup", "crab", "corn", "cloud"],
  d: ["dog", "duck", "drum", "door", "doll", "dinosaur"],
  f: ["fish", "fox", "frog", "fan", "foot", "farm"],
  g: ["goat", "gum", "game", "girl", "gold", "grape"],
  h: ["hat", "hen", "hand", "horse", "house", "honey"],
  j: ["jam", "jet", "jug", "jump", "jacket"],
  k: ["kite", "king", "key", "kick", "kitten"],
  l: ["lion", "leaf", "lamp", "leg", "log", "lock"],
  m: ["moon", "milk", "mouse", "mop", "monkey", "mud"],
  n: ["net", "nest", "nose", "nine", "nail"],
  p: ["pig", "pen", "pan", "pie", "park", "puppy", "plane"],
  r: ["rat", "run", "rain", "ring", "rope", "rabbit"],
  s: ["sun", "sock", "star", "sea", "soup", "snake"],
  t: ["top", "ten", "tree", "tiger", "turtle", "toy"],
  w: ["web", "wig", "wave", "win", "wall", "water", "worm"],
  y: ["yes", "yarn", "yak", "yo-yo"],
};

const ALL_WORDS = Object.values(LETTER_WORDS).flat();
const LETTERS = Object.keys(LETTER_WORDS);

const lettersBank: BankEntry[] = [];

// Which letter comes after X?
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
for (let i = 0; i < ALPHABET.length - 1; i++) {
  const after = ALPHABET[i + 1];
  const distractors = dist(ALPHABET, after, 3);
  lettersBank.push(
    e(1, `Which letter comes after ${ALPHABET[i]}?`, after, [after, ...distractors]),
  );
}

// What letter does "dog" start with?
for (const [letter, words] of Object.entries(LETTER_WORDS)) {
  for (const word of words) {
    const distractors = dist(LETTERS, letter, 3);
    lettersBank.push(
      e(1, `What letter does "${word}" start with?`, letter, [letter, ...distractors]),
    );
  }
}

// Which word starts with the letter X?
for (const [letter, words] of Object.entries(LETTER_WORDS)) {
  if (words.length < 4) continue;
  for (const word of words.slice(0, 3)) {
    const otherWords = ALL_WORDS.filter((w) => !words.includes(w));
    const distractors = dist(otherWords, word, 3);
    lettersBank.push(
      e(2, `Which word starts with the letter ${letter}?`, word, [word, ...distractors]),
    );
  }
}

/* ================================================================
   RHYMES (Playground · difficulty 1-2)
   ================================================================ */

const RHYME_FAMILIES: string[][] = [
  ["cat", "hat", "mat", "rat", "bat", "sat"],
  ["dog", "frog", "log", "fog"],
  ["sun", "run", "fun", "bun"],
  ["pig", "wig", "big", "dig"],
  ["top", "mop", "hop", "pop", "stop"],
  ["bed", "red", "fed", "wed"],
  ["hen", "pen", "ten", "men"],
  ["ball", "fall", "tall", "wall", "call"],
  ["bee", "tree", "see", "three"],
  ["car", "star", "far", "jar"],
  ["boat", "coat", "goat", "float"],
  ["rain", "train", "chain", "brain"],
  ["moon", "spoon", "tune", "balloon"],
  ["cake", "lake", "make", "snake"],
  ["sing", "ring", "king", "wing", "swing"],
  ["bell", "shell", "well", "fell"],
  ["book", "look", "cook", "hook"],
  ["star", "car", "far", "bar"],
  ["duck", "truck", "luck", "stuck"],
  ["ten", "pen", "hen", "den"],
];

const ALL_RHYMERS = RHYME_FAMILIES.flat();
const rhymesBank: BankEntry[] = [];
for (const family of RHYME_FAMILIES) {
  const others = ALL_RHYMERS.filter((w) => !family.includes(w));
  for (const word of family.slice(0, 3)) {
    const distractors = dist(others, word, 3);
    rhymesBank.push(e(1, `Which word rhymes with "${family[0]}"?`, word, [word, ...distractors]));
  }
}

/* ================================================================
   FIRST WORDS / SPELLING (Playground · difficulty 2-3)
   ================================================================ */

const CVC_WORDS = [
  "cat", "dog", "sun", "hat", "bed", "pig", "cup", "fox", "map", "pen",
  "ten", "bus", "car", "jet", "kit", "log", "mat", "net", "pan", "rat",
  "top", "van", "wet", "zip", "hen", "jam", "jug", "key", "leg", "man",
  "mom", "mud", "nut", "red", "run", "sit", "tag", "tub", "wig", "win",
  "gum", "dot", "lip", "pot", "rug", "sad", "six", "tap", "cub", "hot",
  "fin", "gap", "hut", "kid", "lid", "mix", "pop", "rob", "sub", "tot",
];

const VOWELS = "aeiou";
function misspellings(word: string): string[] {
  const set = new Set<string>();
  const letters = word.split("");
  letters.forEach((ch, i) => {
    if (VOWELS.includes(ch)) {
      VOWELS.split("")
        .filter((v) => v !== ch)
        .forEach((v) => {
          const c = [...letters];
          c[i] = v;
          set.add(c.join(""));
        });
    }
  });
  set.add(word + word[word.length - 1]);
  set.add(word + "e");
  set.add(letters[1] + letters[0] + letters.slice(2).join(""));
  set.delete(word);
  return [...set].slice(0, 3);
}

const spelling1Bank: BankEntry[] = [];
for (const word of CVC_WORDS) {
  const wrongs = misspellings(word);
  if (wrongs.length < 3) continue;
  spelling1Bank.push(
    e(2, "Which one is spelled right?", word, [word, ...wrongs.slice(0, 3)], HINTS.spelling1),
  );
}

/* ================================================================
   PLURALS (Adventure · difficulty 3-5)
   ================================================================ */

interface PluralCase {
  word: string;
  plural: string;
  wrongs: string[];
  d: number;
}

const PLURALS: PluralCase[] = [
  { word: "cat", plural: "cats", wrongs: ["cates", "caties", "cat"], d: 3 },
  { word: "dog", plural: "dogs", wrongs: ["doges", "dogies", "dogg"], d: 3 },
  { word: "book", plural: "books", wrongs: ["bookes", "bookies", "book"], d: 3 },
  { word: "car", plural: "cars", wrongs: ["cares", "caries", "car"], d: 3 },
  { word: "ball", plural: "balls", wrongs: ["balles", "ballies", "ball"], d: 3 },
  { word: "tree", plural: "trees", wrongs: ["treeies", "treeses", "treees"], d: 3 },
  { word: "bird", plural: "birds", wrongs: ["birdes", "birdies", "birdd"], d: 3 },
  { word: "cup", plural: "cups", wrongs: ["cupes", "cupies", "cupp"], d: 3 },
  { word: "shoe", plural: "shoes", wrongs: ["shoeses", "shoeies", "shoe"], d: 3 },
  { word: "apple", plural: "apples", wrongs: ["applees", "appleies", "appleses"], d: 3 },
  { word: "box", plural: "boxes", wrongs: ["boxs", "boxies", "boxe"], d: 3 },
  { word: "bus", plural: "buses", wrongs: ["buss", "busies", "buse"], d: 3 },
  { word: "dish", plural: "dishes", wrongs: ["dishs", "dishies", "dishe"], d: 3 },
  { word: "watch", plural: "watches", wrongs: ["watchs", "watchies", "watche"], d: 3 },
  { word: "fox", plural: "foxes", wrongs: ["foxs", "foxies", "foxe"], d: 3 },
  { word: "glass", plural: "glasses", wrongs: ["glasss", "glassies", "glasse"], d: 3 },
  { word: "lunch", plural: "lunches", wrongs: ["lunchs", "lunchies", "lunche"], d: 3 },
  { word: "brush", plural: "brushes", wrongs: ["brushs", "brushies", "brushe"], d: 3 },
  { word: "bench", plural: "benches", wrongs: ["benchs", "benchies", "benche"], d: 3 },
  { word: "baby", plural: "babies", wrongs: ["babys", "babyes", "babie"], d: 4 },
  { word: "bunny", plural: "bunnies", wrongs: ["bunnys", "bunnyes", "bunnie"], d: 4 },
  { word: "puppy", plural: "puppies", wrongs: ["puppys", "puppyes", "puppie"], d: 4 },
  { word: "berry", plural: "berries", wrongs: ["berrys", "berryes", "berrie"], d: 4 },
  { word: "cherry", plural: "cherries", wrongs: ["cherrys", "cherryes", "cherrie"], d: 4 },
  { word: "lady", plural: "ladies", wrongs: ["ladys", "ladyes", "laddie"], d: 4 },
  { word: "story", plural: "stories", wrongs: ["storys", "storyes", "storrie"], d: 4 },
  { word: "city", plural: "cities", wrongs: ["citys", "cityes", "citie"], d: 4 },
  { word: "party", plural: "parties", wrongs: ["partys", "partyes", "partie"], d: 4 },
  { word: "family", plural: "families", wrongs: ["familys", "familyes", "familie"], d: 4 },
  { word: "leaf", plural: "leaves", wrongs: ["leafs", "leafes", "leafves"], d: 5 },
  { word: "wolf", plural: "wolves", wrongs: ["wolfs", "wolfes", "wolfves"], d: 5 },
  { word: "knife", plural: "knives", wrongs: ["knifes", "knive", "knifves"], d: 5 },
  { word: "loaf", plural: "loaves", wrongs: ["loafs", "loafes", "loafves"], d: 5 },
  { word: "shelf", plural: "shelves", wrongs: ["shelfs", "shelffes", "shelfves"], d: 5 },
  { word: "child", plural: "children", wrongs: ["childs", "childes", "childrens"], d: 5 },
  { word: "mouse", plural: "mice", wrongs: ["mouses", "mices", "miceies"], d: 5 },
  { word: "foot", plural: "feet", wrongs: ["foots", "feets", "footes"], d: 5 },
  { word: "tooth", plural: "teeth", wrongs: ["tooths", "teeths", "toothes"], d: 5 },
  { word: "man", plural: "men", wrongs: ["mans", "mens", "manes"], d: 5 },
  { word: "woman", plural: "women", wrongs: ["womans", "womens", "womanes"], d: 5 },
  { word: "goose", plural: "geese", wrongs: ["gooses", "geeses", "goosees"], d: 5 },
];

const pluralsBank: BankEntry[] = PLURALS.map((p) =>
  e(p.d, `One ${p.word}, two ___.`, p.plural, [p.plural, ...p.wrongs], HINTS.plurals),
);

/* ================================================================
   VERBS / PAST TENSE (Adventure · difficulty 3-5)
   ================================================================ */

interface VerbCase {
  base: string;
  past: string;
  wrongs: string[];
  d: number;
}

const REGULAR_VERBS: VerbCase[] = [
  { base: "jump", past: "jumped", wrongs: ["jump", "jumping", "jumps"], d: 3 },
  { base: "walk", past: "walked", wrongs: ["walk", "walking", "walks"], d: 3 },
  { base: "play", past: "played", wrongs: ["play", "playing", "plays"], d: 3 },
  { base: "look", past: "looked", wrongs: ["look", "looking", "looks"], d: 3 },
  { base: "talk", past: "talked", wrongs: ["talk", "talking", "talks"], d: 3 },
  { base: "help", past: "helped", wrongs: ["help", "helping", "helps"], d: 3 },
  { base: "clean", past: "cleaned", wrongs: ["clean", "cleaning", "cleans"], d: 3 },
  { base: "open", past: "opened", wrongs: ["open", "opening", "opens"], d: 3 },
  { base: "cook", past: "cooked", wrongs: ["cook", "cooking", "cooks"], d: 3 },
  { base: "call", past: "called", wrongs: ["call", "calling", "calls"], d: 3 },
  { base: "pick", past: "picked", wrongs: ["pick", "picking", "picks"], d: 3 },
  { base: "climb", past: "climbed", wrongs: ["climb", "climbing", "climbs"], d: 3 },
  { base: "dance", past: "danced", wrongs: ["dance", "dancing", "dances"], d: 4 },
  { base: "smile", past: "smiled", wrongs: ["smile", "smiling", "smiles"], d: 4 },
  { base: "hop", past: "hopped", wrongs: ["hop", "hopping", "hops"], d: 4 },
  { base: "stop", past: "stopped", wrongs: ["stop", "stopping", "stops"], d: 4 },
  { base: "clap", past: "clapped", wrongs: ["clap", "clapping", "claps"], d: 4 },
  { base: "skip", past: "skipped", wrongs: ["skip", "skipping", "skips"], d: 4 },
  { base: "drop", past: "dropped", wrongs: ["drop", "dropping", "drops"], d: 4 },
];

const IRREGULAR_VERBS: VerbCase[] = [
  { base: "go", past: "went", wrongs: ["go", "going", "goed"], d: 5 },
  { base: "see", past: "saw", wrongs: ["see", "seeing", "seed"], d: 5 },
  { base: "eat", past: "ate", wrongs: ["eat", "eating", "eated"], d: 5 },
  { base: "run", past: "ran", wrongs: ["run", "running", "runned"], d: 5 },
  { base: "come", past: "came", wrongs: ["come", "coming", "comed"], d: 5 },
  { base: "give", past: "gave", wrongs: ["give", "giving", "gived"], d: 5 },
  { base: "take", past: "took", wrongs: ["take", "taking", "taked"], d: 5 },
  { base: "make", past: "made", wrongs: ["make", "making", "maked"], d: 5 },
  { base: "have", past: "had", wrongs: ["have", "having", "haved"], d: 5 },
  { base: "say", past: "said", wrongs: ["say", "saying", "sayd"], d: 5 },
  { base: "do", past: "did", wrongs: ["do", "doing", "doed"], d: 5 },
  { base: "get", past: "got", wrongs: ["get", "getting", "getted"], d: 5 },
  { base: "find", past: "found", wrongs: ["find", "finding", "finded"], d: 5 },
  { base: "think", past: "thought", wrongs: ["think", "thinking", "thinked"], d: 5 },
  { base: "buy", past: "bought", wrongs: ["buy", "buying", "buyed"], d: 5 },
  { base: "bring", past: "brought", wrongs: ["bring", "bringing", "bringed"], d: 5 },
  { base: "catch", past: "caught", wrongs: ["catch", "catching", "catched"], d: 5 },
  { base: "sleep", past: "slept", wrongs: ["sleep", "sleeping", "sleeped"], d: 5 },
  { base: "feel", past: "felt", wrongs: ["feel", "feeling", "feeled"], d: 5 },
  { base: "build", past: "built", wrongs: ["build", "building", "builded"], d: 5 },
  { base: "swim", past: "swam", wrongs: ["swim", "swimming", "swimmed"], d: 5 },
  { base: "sing", past: "sang", wrongs: ["sing", "singing", "singed"], d: 5 },
  { base: "drink", past: "drank", wrongs: ["drink", "drinking", "drinked"], d: 5 },
  { base: "fly", past: "flew", wrongs: ["fly", "flying", "flied"], d: 5 },
  { base: "grow", past: "grew", wrongs: ["grow", "growing", "growed"], d: 5 },
  { base: "know", past: "knew", wrongs: ["know", "knowing", "knowed"], d: 5 },
  { base: "throw", past: "threw", wrongs: ["throw", "throwing", "throwed"], d: 5 },
  { base: "draw", past: "drew", wrongs: ["draw", "drawing", "drawed"], d: 5 },
  { base: "write", past: "wrote", wrongs: ["write", "writing", "writed"], d: 5 },
  { base: "ride", past: "rode", wrongs: ["ride", "riding", "rided"], d: 5 },
  { base: "drive", past: "drove", wrongs: ["drive", "driving", "drived"], d: 5 },
  { base: "wear", past: "wore", wrongs: ["wear", "wearing", "weared"], d: 5 },
  { base: "sit", past: "sat", wrongs: ["sit", "sitting", "sitted"], d: 5 },
  { base: "stand", past: "stood", wrongs: ["stand", "standing", "standed"], d: 5 },
];

const verbsBank: BankEntry[] = [...REGULAR_VERBS, ...IRREGULAR_VERBS].map((v) =>
  e(v.d, `Today I ${v.base}. Yesterday I ___.`, v.past, [v.past, ...v.wrongs], HINTS.verbs),
);

/* ================================================================
   CAPITAL CREW (Adventure · difficulty 3-5)
   ================================================================ */

interface CapitalCase {
  text: string;
  answer: string;
  options: string[];
  d: number;
}

const CAPITAL_CASES: CapitalCase[] = [
  { text: "Which of these should start with a capital letter?", answer: "Sam", options: ["Sam", "dog", "happy"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "Monday", options: ["Monday", "apple", "fast"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "July", options: ["July", "table", "fun"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "Paris", options: ["Paris", "park", "small"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "Mia", options: ["Mia", "cat", "blue"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "China", options: ["China", "chair", "round"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "Tom", options: ["Tom", "box", "cold"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "Friday", options: ["Friday", "shiny", "milk"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "December", options: ["December", "yellow", "boat"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "London", options: ["London", "silly", "jump"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "Rex", options: ["Rex", "fish", "green"], d: 3 },
  { text: "Which of these should start with a capital letter?", answer: "April", options: ["April", "orange", "sand"], d: 3 },
  { text: "Which sentence is correct?", answer: "I like pizza.", options: ["I like pizza.", "i like pizza.", "I like Pizza."], d: 4 },
  { text: "Which sentence is correct?", answer: "My dog is funny.", options: ["My dog is funny.", "my dog is funny.", "My Dog is funny."], d: 4 },
  { text: "Which sentence is correct?", answer: "We went to school.", options: ["We went to school.", "we went to school.", "We Went to school."], d: 4 },
  { text: "Which sentence is correct?", answer: "She reads books.", options: ["She reads books.", "she reads books.", "She Reads books."], d: 4 },
  { text: "Which sentence is correct?", answer: "Happy birthday!", options: ["Happy birthday!", "happy birthday!", "Happy Birthday!"], d: 4 },
  { text: "Which sentence is correct?", answer: "The cat slept.", options: ["The cat slept.", "the cat slept.", "The Cat slept."], d: 4 },
  { text: "Which sentence is correct?", answer: "What time is it?", options: ["What time is it?", "what time is it?", "What time is it."], d: 4 },
  { text: "Which sentence is correct?", answer: "Are you okay?", options: ["Are you okay?", "are you okay?", "Are you okay."], d: 4 },
  { text: "Which sentence is correct?", answer: "I am so happy!", options: ["I am so happy!", "I am so happy", "i am so happy!"], d: 4 },
  { text: "Which sentence is correct?", answer: "Where is my toy?", options: ["Where is my toy?", "where is my toy?", "Where is my toy."], d: 4 },
  { text: "What does every sentence start with?", answer: "A capital letter", options: ["A capital letter", "A small letter", "A question mark"], d: 3 },
  { text: "What should you put at the end of a question?", answer: "A question mark", options: ["A question mark", "A comma", "Nothing"], d: 4 },
  { text: "What should you put at the end of a happy sentence?", answer: "An exclamation mark", options: ["An exclamation mark", "A comma", "Nothing"], d: 4 },
  { text: "Which day needs a capital letter?", answer: "Wednesday", options: ["Wednesday", "sunday-morning", "tomorrow"], d: 5 },
  { text: "Which name needs a capital letter?", answer: "Grandma Rose", options: ["Grandma Rose", "my dog", "the park"], d: 4 },
  { text: "Which month needs a capital letter?", answer: "October", options: ["October", "spring", "weekend"], d: 4 },
];

const capitalBank: BankEntry[] = CAPITAL_CASES.map((c) =>
  e(c.d, c.text, c.answer, c.options, HINTS.capital),
);

/* ================================================================
   SYNONYMS / WORD PALS (Adventure · difficulty 4-5)
   ================================================================ */

const SYNONYM_PAIRS: { word: string; syn: string; d: number }[] = [
  { word: "happy", syn: "glad", d: 4 },
  { word: "big", syn: "large", d: 4 },
  { word: "small", syn: "tiny", d: 4 },
  { word: "fast", syn: "quick", d: 4 },
  { word: "pretty", syn: "beautiful", d: 4 },
  { word: "sad", syn: "unhappy", d: 4 },
  { word: "mad", syn: "angry", d: 4 },
  { word: "cold", syn: "chilly", d: 4 },
  { word: "hot", syn: "warm", d: 4 },
  { word: "smart", syn: "clever", d: 4 },
  { word: "funny", syn: "silly", d: 4 },
  { word: "hard", syn: "difficult", d: 4 },
  { word: "easy", syn: "simple", d: 4 },
  { word: "start", syn: "begin", d: 4 },
  { word: "shout", syn: "yell", d: 4 },
  { word: "jump", syn: "leap", d: 4 },
  { word: "look", syn: "watch", d: 4 },
  { word: "talk", syn: "speak", d: 4 },
  { word: "walk", syn: "stroll", d: 4 },
  { word: "sleep", syn: "rest", d: 4 },
  { word: "quiet", syn: "silent", d: 4 },
  { word: "noisy", syn: "loud", d: 4 },
  { word: "clean", syn: "tidy", d: 4 },
  { word: "tired", syn: "sleepy", d: 4 },
  { word: "old", syn: "ancient", d: 5 },
  { word: "brave", syn: "courageous", d: 5 },
  { word: "kind", syn: "gentle", d: 5 },
  { word: "fast", syn: "swift", d: 5 },
  { word: "wet", syn: "damp", d: 5 },
  { word: "happy", syn: "cheerful", d: 5 },
  { word: "big", syn: "enormous", d: 5 },
  { word: "pretty", syn: "lovely", d: 5 },
  { word: "clever", syn: "brilliant", d: 5 },
  { word: "funny", syn: "hilarious", d: 5 },
  { word: "rich", syn: "wealthy", d: 5 },
  { word: "quick", syn: "rapid", d: 5 },
  { word: "happy", syn: "delighted", d: 5 },
];

const SYNONYM_POOL = SYNONYM_PAIRS.map((p) => p.syn);
const synonymsBank: BankEntry[] = SYNONYM_PAIRS.map((p) => {
  const distractors = dist(SYNONYM_POOL, p.syn, 3);
  return e(p.d, `Which word means the same as "${p.word}"?`, p.syn, [p.syn, ...distractors], HINTS.synonyms);
});

/* ================================================================
   SPELLING BEE (Champion · difficulty 6-8)
   ================================================================ */

const SPELLINGS: { word: string; wrongs: string[]; d: number }[] = [
  { word: "because", wrongs: ["becuase", "becase", "becuse"], d: 6 },
  { word: "friend", wrongs: ["freind", "frind", "firend"], d: 6 },
  { word: "school", wrongs: ["shcool", "skool", "shool"], d: 6 },
  { word: "family", wrongs: ["familey", "famly", "familly"], d: 6 },
  { word: "people", wrongs: ["peple", "peeple", "peoble"], d: 6 },
  { word: "animal", wrongs: ["animel", "anamal", "anumal"], d: 6 },
  { word: "morning", wrongs: ["moring", "mornning", "mornig"], d: 6 },
  { word: "together", wrongs: ["togeather", "togther", "togheter"], d: 6 },
  { word: "maybe", wrongs: ["meybe", "maby", "maybee"], d: 6 },
  { word: "answer", wrongs: ["anser", "ansar", "annswer"], d: 6 },
  { word: "something", wrongs: ["somthing", "sumthing", "soemthing"], d: 6 },
  { word: "different", wrongs: ["diferent", "diffrent", "diffarant"], d: 7 },
  { word: "important", wrongs: ["importent", "imortant", "impotant"], d: 7 },
  { word: "elephant", wrongs: ["elefant", "eliphant", "elephent"], d: 7 },
  { word: "beautiful", wrongs: ["beautifull", "beutiful", "beautful"], d: 7 },
  { word: "tomorrow", wrongs: ["tommorow", "tommorrow", "tomorow"], d: 7 },
  { word: "surprise", wrongs: ["suprise", "surprize", "surpise"], d: 7 },
  { word: "weather", wrongs: ["wether", "weathar", "wehter"], d: 7 },
  { word: "holiday", wrongs: ["holliday", "holday", "haliday"], d: 7 },
  { word: "favorite", wrongs: ["favorit", "favrite", "faverite"], d: 7 },
  { word: "minute", wrongs: ["minuit", "minit", "minet"], d: 7 },
  { word: "special", wrongs: ["specal", "speshal", "spechial"], d: 7 },
  { word: "remember", wrongs: ["rember", "remeber", "remmember"], d: 7 },
  { word: "believe", wrongs: ["beleive", "belive", "beleve"], d: 7 },
  { word: "thought", wrongs: ["thout", "thot", "thoght"], d: 7 },
  { word: "through", wrongs: ["thru", "thorugh", "thourgh"], d: 7 },
  { word: "computer", wrongs: ["compooter", "computor", "compueter"], d: 7 },
  { word: "mountain", wrongs: ["moutain", "mountin", "montain"], d: 7 },
  { word: "decide", wrongs: ["deside", "decid", "decieed"], d: 7 },
  { word: "describe", wrongs: ["discribe", "descibe", "describ"], d: 8 },
  { word: "imagine", wrongs: ["imagion", "imajine", "imagene"], d: 7 },
  { word: "library", wrongs: ["librery", "libary", "libraray"], d: 8 },
  { word: "restaurant", wrongs: ["resturant", "restraunt", "restaurent"], d: 8 },
  { word: "February", wrongs: ["Febuary", "Feburary", "Febrary"], d: 8 },
  { word: "Wednesday", wrongs: ["Wensday", "Wednsday", "Wednesdy"], d: 8 },
  { word: "dinosaur", wrongs: ["dinosour", "dinosor", "dinosuar"], d: 8 },
  { word: "chocolate", wrongs: ["chocalate", "choclate", "chocollate"], d: 8 },
  { word: "separate", wrongs: ["seperate", "seperat", "separet"], d: 8 },
  { word: "probably", wrongs: ["probly", "probaly", "proberly"], d: 8 },
  { word: "suddenly", wrongs: ["suddently", "sudenly", "sudently"], d: 8 },
  { word: "neighbor", wrongs: ["nieghbor", "neigbour", "neihbor"], d: 8 },
  { word: "occasion", wrongs: ["ocasion", "occassion", "ocasian"], d: 8 },
  { word: "privilege", wrongs: ["priviledge", "previlege", "privlege"], d: 9 },
  { word: "temperature", wrongs: ["temperture", "temprature", "temperacher"], d: 9 },
  { word: "knowledge", wrongs: ["knowlege", "knowladge", "knowledg"], d: 9 },
  { word: "mischievous", wrongs: ["mischievious", "mischevious", "mischeevous"], d: 9 },
  { word: "weird", wrongs: ["wierd", "werd", "wairrd"], d: 8 },
  { word: "decide", wrongs: ["deside", "decid", "decyde"], d: 7 },
];

const spellingBank: BankEntry[] = SPELLINGS.map((s) =>
  e(s.d, "Which one is spelled right?", s.word, [s.word, ...s.wrongs], HINTS.spelling),
);

/* ================================================================
   HOMOPHONES (Champion · difficulty 6-8)
   ================================================================ */

const HOMOPHONES: { text: string; answer: string; options: string[]; d: number }[] = [
  { text: "Which word fits? 'I have ___ cats.'", answer: "two", options: ["two", "too", "to"], d: 6 },
  { text: "Which word fits? 'I am going ___ school.'", answer: "to", options: ["to", "too", "two"], d: 6 },
  { text: "Which word fits? 'That is ___ much noise!'", answer: "too", options: ["too", "to", "two"], d: 6 },
  { text: "Which word fits? 'Look over ___!'", answer: "there", options: ["there", "their", "they're"], d: 6 },
  { text: "Which word fits? '___ dog is so cute.'", answer: "Their", options: ["Their", "There", "They're"], d: 6 },
  { text: "Which word fits? '___ going home now.'", answer: "They're", options: ["They're", "Their", "There"], d: 7 },
  { text: "Which word fits? 'Is this ___ book?'", answer: "your", options: ["your", "you're", "yore"], d: 6 },
  { text: "Which word fits? '___ my best friend!'", answer: "You're", options: ["You're", "Your", "Yore"], d: 7 },
  { text: "Which word fits? 'The cat licked ___ paw.'", answer: "its", options: ["its", "it's", "it"], d: 7 },
  { text: "Which word fits? '___ raining outside.'", answer: "It's", options: ["It's", "Its", "It"], d: 7 },
  { text: "Which word fits? 'Come ___ please!'", answer: "here", options: ["here", "hear", "hair"], d: 6 },
  { text: "Which word fits? 'I can ___ the music.'", answer: "hear", options: ["hear", "here", "hair"], d: 6 },
  { text: "Which word fits? 'The ___ is big and blue.'", answer: "sea", options: ["sea", "see", "she"], d: 6 },
  { text: "Which word fits? 'I ___ a rainbow.'", answer: "see", options: ["see", "sea", "she"], d: 6 },
  { text: "Which word fits? 'I ___ an apple.'", answer: "ate", options: ["ate", "eight", "eat"], d: 6 },
  { text: "Which word fits? 'I am ___ years old.'", answer: "eight", options: ["eight", "ate", "eit"], d: 6 },
  { text: "Which word fits? 'The ___ is shining.'", answer: "sun", options: ["sun", "son", "run"], d: 6 },
  { text: "Which word fits? 'He is my ___ .'", answer: "son", options: ["son", "sun", "some"], d: 6 },
  { text: "Which word fits? 'The ___ buzzes.'", answer: "bee", options: ["bee", "be", "by"], d: 6 },
  { text: "Which word fits? 'I want to ___ a pilot.'", answer: "be", options: ["be", "bee", "by"], d: 6 },
  { text: "Which word fits? 'I ___ the answer!'", answer: "know", options: ["know", "no", "knew"], d: 6 },
  { text: "Which word fits? 'There are ___ cookies left.'", answer: "no", options: ["no", "know", "not"], d: 6 },
  { text: "Which word fits? 'I ___ the race!'", answer: "won", options: ["won", "one", "wun"], d: 7 },
  { text: "Which word fits? 'I have ___ cookie.'", answer: "one", options: ["one", "won", "win"], d: 6 },
  { text: "Which word fits? 'I ate a sweet ___.'", answer: "pear", options: ["pear", "pair", "pare"], d: 7 },
  { text: "Which word fits? 'A ___ of socks.'", answer: "pair", options: ["pair", "pear", "pare"], d: 7 },
  { text: "Which word fits? 'A ___ of cake, please.'", answer: "piece", options: ["piece", "peace", "peas"], d: 7 },
  { text: "Which word fits? 'We wish for ___ on Earth.'", answer: "peace", options: ["peace", "piece", "peas"], d: 8 },
  { text: "Which word fits? 'This bridge is ___ .'", answer: "weak", options: ["weak", "week", "weke"], d: 7 },
  { text: "Which word fits? 'See you next ___!'", answer: "week", options: ["week", "weak", "weke"], d: 7 },
  { text: "Which word fits? 'I ___ a letter to Grandma.'", answer: "write", options: ["write", "right", "rote"], d: 7 },
  { text: "Which word fits? 'You got the answer ___!'", answer: "right", options: ["right", "write", "rite"], d: 7 },
  { text: "Which word fits? 'I ___ my bike to school.'", answer: "rode", options: ["rode", "road", "rowd"], d: 7 },
  { text: "Which word fits? 'The ___ goes to the beach.'", answer: "road", options: ["road", "rode", "rowd"], d: 7 },
  { text: "Which word fits? 'The red ___ smells sweet.'", answer: "flower", options: ["flower", "flour", "flauer"], d: 7 },
  { text: "Which word fits? 'Bake the cake with ___.'", answer: "flour", options: ["flour", "flower", "flauer"], d: 8 },
  { text: "Which word fits? 'I ___ the answer already.'", answer: "knew", options: ["knew", "new", "gnu"], d: 7 },
  { text: "Which word fits? 'I got a ___ toy.'", answer: "new", options: ["new", "knew", "gnu"], d: 7 },
  { text: "Which word fits? 'Let's ___ at noon.'", answer: "meet", options: ["meet", "meat", "met"], d: 7 },
  { text: "Which word fits? 'I eat ___ and rice.'", answer: "meat", options: ["meat", "meet", "met"], d: 7 },
  { text: "Which word fits? 'The dog wags its ___.'", answer: "tail", options: ["tail", "tale", "tall"], d: 6 },
  { text: "Which word fits? 'Read me a bedtime ___.'", answer: "tale", options: ["tale", "tail", "tall"], d: 7 },
  { text: "Which word fits? 'I can't wait — I'm so ___.'", answer: "excited", options: ["excited", "exsited", "excitted"], d: 8 },
];

const homophonesBank: BankEntry[] = HOMOPHONES.map((h) =>
  e(h.d, h.text, h.answer, h.options, HINTS.homophones),
);

/* ================================================================
   AFFIXES / WORD BUILDERS (Champion · difficulty 7-9)
   ================================================================ */

const AFFIXES: { text: string; answer: string; options: string[]; d: number }[] = [
  { text: "What does 'un-' mean in 'unhappy'?", answer: "not", options: ["not", "very", "again", "before"], d: 7 },
  { text: "What does 're-' mean in 'rewrite'?", answer: "again", options: ["again", "before", "not", "after"], d: 7 },
  { text: "What does 'pre-' mean in 'preview'?", answer: "before", options: ["before", "after", "again", "not"], d: 8 },
  { text: "What does 'dis-' mean in 'disagree'?", answer: "not", options: ["not", "again", "very", "together"], d: 8 },
  { text: "What does 'mis-' mean in 'misplace'?", answer: "wrongly", options: ["wrongly", "again", "before", "very"], d: 8 },
  { text: "What does 'over-' mean in 'overcook'?", answer: "too much", options: ["too much", "not enough", "again", "before"], d: 8 },
  { text: "What does '-less' mean in 'fearless'?", answer: "without", options: ["without", "full of", "again", "more"], d: 8 },
  { text: "What does '-ful' mean in 'joyful'?", answer: "full of", options: ["full of", "without", "again", "before"], d: 8 },
  { text: "Which word means 'without fear'?", answer: "fearless", options: ["fearless", "fearful", "fearsome", "fearing"], d: 8 },
  { text: "Which word means 'full of joy'?", answer: "joyful", options: ["joyful", "joyless", "joying", "joyed"], d: 8 },
  { text: "Which word means 'not happy'?", answer: "unhappy", options: ["unhappy", "rehappy", "prehappy", "overhappy"], d: 7 },
  { text: "The opposite of 'appear' is ___.", answer: "disappear", options: ["disappear", "reappear", "preappear", "unappear"], d: 8 },
  { text: "The opposite of 'tie' is ___.", answer: "untie", options: ["untie", "retie", "pretie", "overtie"], d: 7 },
  { text: "The opposite of 'read' is ___.", answer: "misread", options: ["misread", "preread", "overread", "unread"], d: 9 },
  { text: "A person who paints is a ___.", answer: "painter", options: ["painter", "paintest", "painterest", "painting"], d: 8 },
  { text: "A person who sings is a ___.", answer: "singer", options: ["singer", "singest", "singing", "singful"], d: 7 },
  { text: "A person who teaches is a ___.", answer: "teacher", options: ["teacher", "teachest", "teaching", "teachful"], d: 7 },
  { text: "Big, bigger, ___.", answer: "biggest", options: ["biggest", "biggestest", "biger", "bigful"], d: 7 },
  { text: "Small, smaller, ___.", answer: "smallest", options: ["smallest", "smallerest", "smallful", "small-less"], d: 7 },
  { text: "She ran ___ (in a quick way).", answer: "quickly", options: ["quickly", "quickful", "quickless", "quickest"], d: 8 },
  { text: "He laughed ___ (in a happy way).", answer: "happily", options: ["happily", "happyful", "happy-less", "happiest"], d: 8 },
  { text: "Which word means 'not kind'?", answer: "unkind", options: ["unkind", "rekind", "prekind", "overkind"], d: 7 },
  { text: "Which word means 'do it again'?", answer: "redo", options: ["redo", "undo", "pre-do", "overdo"], d: 7 },
  { text: "Which word means 'wash again'?", answer: "rewash", options: ["rewash", "unwash", "prewash", "miswash"], d: 7 },
  { text: "If you 'preheat', you heat ___.", answer: "before", options: ["before", "after", "again", "never"], d: 8 },
  { text: "If you 'overeat', you eat ___.", answer: "too much", options: ["too much", "too little", "again", "nothing"], d: 8 },
  { text: "Which word means 'without end'?", answer: "endless", options: ["endless", "endful", "ending", "ended"], d: 8 },
  { text: "Which word means 'full of color'?", answer: "colorful", options: ["colorful", "colorless", "coloring", "colored"], d: 8 },
  { text: "Which word means 'without color'?", answer: "colorless", options: ["colorless", "colorful", "coloring", "colored"], d: 8 },
  { text: "Which word means 'without hope'?", answer: "hopeless", options: ["hopeless", "hopeful", "hoping", "hoped"], d: 8 },
  { text: "Which word means 'full of hope'?", answer: "hopeful", options: ["hopeful", "hopeless", "hoping", "hoped"], d: 8 },
  { text: "'Player', 'teacher' and 'helper' all end in ___.", answer: "-er", options: ["-er", "-est", "-ful", "-less"], d: 8 },
  { text: "The tallest person is the ___ one.", answer: "tallest", options: ["tallest", "tallestest", "tallful", "tall-less"], d: 8 },
  { text: "Which word means 'not careful'?", answer: "careless", options: ["careless", "careful", "caring", "cared"], d: 8 },
  { text: "Which word means 'full of care'?", answer: "careful", options: ["careful", "careless", "caring", "cared"], d: 8 },
  { text: "The opposite of 'lock' is ___.", answer: "unlock", options: ["unlock", "relock", "prelock", "overlock"], d: 7 },
  { text: "The opposite of 'fold' is ___.", answer: "unfold", options: ["unfold", "refold", "prefold", "overfold"], d: 7 },
  { text: "If you 'replay' a game, you play ___.", answer: "again", options: ["again", "before", "not", "once"], d: 7 },
  { text: "A 'helper' is someone who ___.", answer: "helps", options: ["helps", "is helped", "helped most", "never helps"], d: 8 },
];

const affixesBank: BankEntry[] = AFFIXES.map((a) =>
  e(a.d, a.text, a.answer, a.options, HINTS.affixes),
);

/* ================================================================
   Registry
   ================================================================ */

export const ENGLISH_BANKS: TopicBank[] = [
  { topic: "letters", subject: "english", entries: lettersBank },
  { topic: "rhymes", subject: "english", entries: rhymesBank },
  { topic: "spelling1", subject: "english", entries: spelling1Bank },
  { topic: "plurals", subject: "english", entries: pluralsBank },
  { topic: "verbs", subject: "english", entries: verbsBank },
  { topic: "capital", subject: "english", entries: capitalBank },
  { topic: "synonyms", subject: "english", entries: synonymsBank },
  { topic: "spelling", subject: "english", entries: spellingBank },
  { topic: "homophones", subject: "english", entries: homophonesBank },
  { topic: "affixes", subject: "english", entries: affixesBank },
];
