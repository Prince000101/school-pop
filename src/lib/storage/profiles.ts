import type { BandId, TopicId } from "@/lib/math/types";

export interface TopicStats {
  best: number;
  plays: number;
  solved: number;
  total: number;
}

export interface Profile {
  id: string;
  name: string;
  color: string;
  band: BandId;
  coins: number;
  createdAt: number;
  stats: Partial<Record<TopicId, TopicStats>>;
  badges: string[];
  dailyStreak: number;
  lastPlayed: string;
}

export interface BadgeDef {
  id: string;
  name: string;
  emoji: string;
}

export const BADGE_DEFS: BadgeDef[] = [
  { id: "first", name: "First Steps", emoji: "👣" },
  { id: "streak3", name: "On Fire", emoji: "🔥" },
  { id: "streak5", name: "Super Streak", emoji: "⚡" },
  { id: "perfect", name: "Perfect Round", emoji: "💯" },
  { id: "coin100", name: "Coin Collector", emoji: "🪙" },
  { id: "coin500", name: "Coin Tycoon", emoji: "💰" },
  { id: "solved50", name: "Half a Hundred", emoji: "🌟" },
  { id: "solved100", name: "Century Club", emoji: "🏅" },
];

export const AVATAR_COLORS = [
  { key: "pink", name: "Pinky", value: "var(--color-pops-pink)", deep: "var(--color-pops-pinkd)" },
  { key: "sky", name: "Sky", value: "var(--color-pops-sky)", deep: "var(--color-pops-skyd)" },
  { key: "mint", name: "Minty", value: "var(--color-pops-mint)", deep: "var(--color-pops-mintd)" },
  { key: "purple", name: "Grape", value: "var(--color-pops-purple)", deep: "var(--color-pops-purpled)" },
  { key: "coral", name: "Peachy", value: "var(--color-pops-coral)", deep: "var(--color-pops-corald)" },
  { key: "yellow", name: "Sunny", value: "var(--color-pops-yellow)", deep: "var(--color-pops-yellowd)" },
];

const PROFILES_KEY = "mathpop:v1:profiles";
const ACTIVE_KEY = "mathpop:v1:active";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getProfiles(): Profile[] {
  return read<Profile[]>(PROFILES_KEY, []);
}

export function saveProfiles(profiles: Profile[]) {
  write(PROFILES_KEY, profiles);
}

export function getActiveProfileId(): string | null {
  return read<string | null>(ACTIVE_KEY, null);
}

export function setActiveProfileId(id: string | null) {
  write(ACTIVE_KEY, id);
}

export function getActiveProfile(): Profile | null {
  const id = getActiveProfileId();
  if (!id) return null;
  return getProfiles().find((p) => p.id === id) ?? null;
}

export function createProfile(input: { name: string; color: string; band: BandId }): Profile {
  const profile: Profile = {
    id: uid(),
    name: input.name.trim() || "Player",
    color: input.color,
    band: input.band,
    coins: 0,
    createdAt: Date.now(),
    stats: {},
    badges: [],
    dailyStreak: 0,
    lastPlayed: "",
  };
  const profiles = getProfiles();
  profiles.push(profile);
  saveProfiles(profiles);
  setActiveProfileId(profile.id);
  return profile;
}

export function updateProfile(id: string, patch: Partial<Profile>): Profile | null {
  const profiles = getProfiles();
  const idx = profiles.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  profiles[idx] = { ...profiles[idx], ...patch };
  saveProfiles(profiles);
  return profiles[idx];
}

export function deleteProfile(id: string) {
  const profiles = getProfiles().filter((p) => p.id !== id);
  saveProfiles(profiles);
  if (getActiveProfileId() === id) setActiveProfileId(null);
}

export function topicBest(profile: Profile, topic: TopicId): number {
  return profile.stats[topic]?.best ?? 0;
}

export function topicPlays(profile: Profile, topic: TopicId): number {
  return profile.stats[topic]?.plays ?? 0;
}

export function computeStars(correct: number, total: number): 1 | 2 | 3 {
  const ratio = total === 0 ? 0 : correct / total;
  if (ratio >= 0.9) return 3;
  if (ratio >= 0.6) return 2;
  return 1;
}

export function recordRound(
  profile: Profile,
  topic: TopicId,
  correct: number,
  total: number,
  bestStreak: number,
): { profile: Profile; coinsEarned: number; newBadges: BadgeDef[] } {
  const prev = profile.stats[topic] ?? { best: 0, plays: 0, solved: 0, total: 0 };
  const nextStats: TopicStats = {
    best: Math.max(prev.best, correct),
    plays: prev.plays + 1,
    solved: prev.solved + correct,
    total: prev.total + total,
  };

  const coinsEarned = correct * 10 + (correct === total ? 50 : 0) + (bestStreak >= 5 ? 30 : 0);

  const today = todayStr();
  const dailyStreak = profile.lastPlayed === today ? profile.dailyStreak : profile.lastPlayed === yesterdayStr() ? profile.dailyStreak + 1 : 1;

  const badges = new Set(profile.badges);
  if (!badges.has("first")) badges.add("first");
  if (bestStreak >= 3) badges.add("streak3");
  if (bestStreak >= 5) badges.add("streak5");
  if (correct === total) badges.add("perfect");
  if (profile.coins + coinsEarned >= 100) badges.add("coin100");
  if (profile.coins + coinsEarned >= 500) badges.add("coin500");
  const solvedTotal = sumSolved({ ...profile, stats: { ...profile.stats, [topic]: nextStats } });
  if (solvedTotal >= 50) badges.add("solved50");
  if (solvedTotal >= 100) badges.add("solved100");

  const updated: Profile = {
    ...profile,
    stats: { ...profile.stats, [topic]: nextStats },
    coins: profile.coins + coinsEarned,
    badges: [...badges],
    dailyStreak,
    lastPlayed: today,
  };

  saveProfiles(getProfiles().map((p) => (p.id === profile.id ? updated : p)));
  const newBadges = BADGE_DEFS.filter((b) => updated.badges.includes(b.id) && !profile.badges.includes(b.id));
  return { profile: updated, coinsEarned, newBadges };
}

function sumSolved(p: Profile): number {
  return Object.values(p.stats).reduce((sum, s) => sum + (s?.solved ?? 0), 0);
}

function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}
