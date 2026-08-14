"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Mascot from "@/components/Mascot";
import BigButton from "@/components/BigButton";
import ProgressBar from "@/components/ProgressBar";
import { ConfettiBurst, ConfettiRain } from "@/components/Confetti";
import { Stars } from "@/components/Stars";
import { useSound } from "@/components/SoundProvider";
import { getActiveProfile, recordRound, type BadgeDef, type Profile } from "@/lib/storage/profiles";
import { TOPIC_BY_ID, isValidTopic, suggestedDifficulty } from "@/lib/math";
import type { Answer, Question } from "@/lib/math/types";
import { AVATAR_COLORS } from "@/lib/storage/profiles";

const ROUND_SIZE = 10;
const BUBBLE_COLORS = [
  { color: "var(--color-pops-pink)", deep: "var(--color-pops-pinkd)" },
  { color: "var(--color-pops-sky)", deep: "var(--color-pops-skyd)" },
  { color: "var(--color-pops-mint)", deep: "var(--color-pops-mintd)" },
  { color: "var(--color-pops-yellow)", deep: "var(--color-pops-yellowd)" },
];

const PRAISE = [
  "WOW! 🎉",
  "AMAZING! ⭐",
  "SUPER! 🦄",
  "POP! 💥",
  "GREAT JOB! 🌟",
  "BOOM! 🎆",
  "SMARTY! 🧠",
  "MAGIC! 🪄",
];

type Status = "loading" | "answering" | "correct" | "wrong" | "reveal" | "done";

interface RoundResult {
  correct: number;
  total: number;
  stars: number;
  coinsEarned: number;
  bestStreak: number;
  newBadges: BadgeDef[];
}

export default function GamePage() {
  const params = useParams<{ topic: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { play } = useSound();

  const topic = params.topic;
  const band = (searchParams.get("band") as "k" | "m" | "e") || "m";
  const topicId = isValidTopic(topic) ? topic : null;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("loading");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<Answer | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const [burst, setBurst] = useState<{ x: number; y: number; id: number } | null>(null);
  const [praise, setPraise] = useState<string | null>(null);
  const [round, setRound] = useState(0);
  const [hintOpen, setHintOpen] = useState(false);
  const [result, setResult] = useState<RoundResult | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(() => (typeof navigator === "undefined" ? true : navigator.onLine));
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const topicMeta = isValidTopic(topic) ? TOPIC_BY_ID[topic] : null;

  useEffect(() => {
    const p = getActiveProfile();
    if (!p || !topicId) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(p);

    const st = p.stats[topicId];
    const mastery = st && st.total > 0 ? st.solved / st.total : 0.3;
    const difficulty = suggestedDifficulty(band, mastery);
    const seed = Math.floor(Math.random() * 2 ** 31);

    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `/api/questions?topic=${topicId}&band=${band}&difficulty=${difficulty}&count=${ROUND_SIZE}&seed=${seed}`,
          { signal: ctrl.signal },
        );
        if (!res.ok) throw new Error("Could not fetch questions");
        const data = (await res.json()) as { questions: Question[] };
        if (!data.questions?.length) throw new Error("No questions came back");
        setQuestions(data.questions);
        setStatus("answering");
      } catch (err) {
        if (!ctrl.signal.aborted) {
          setError(err instanceof Error ? err.message : "Something went wrong");
          setStatus("done");
        }
      }
    })();
    return () => ctrl.abort();
  }, [topicId, band, router, round]);

  // Track connectivity so offline errors get a friendly message + auto-retry.
  const errorRef = useRef<string | null>(null);
  useEffect(() => {
    errorRef.current = error;
  }, [error]);
  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true);
      if (errorRef.current) {
        errorRef.current = null;
        setError(null);
        setRound((r) => r + 1);
      }
    };
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  const q = questions[index];

  const mascotMood = useMemo(() => {
    if (status === "correct" || status === "done") return "celebrate" as const;
    if (status === "reveal") return "sad" as const;
    if (status === "wrong") return "think" as const;
    return "excited" as const;
  }, [status]);

  const finish = useCallback(() => {
    setStatus("done");
    play("win");
    const total = questions.length;
    const coinsEarned = correct * 10 + (correct === total ? 50 : 0) + (bestStreak >= 5 ? 30 : 0);
    const stars = total === 0 ? 1 : correct / total >= 0.9 ? 3 : correct / total >= 0.6 ? 2 : 1;
    if (profile && topicId) {
      const { newBadges } = recordRound(profile, topicId, correct, total, bestStreak);
      setResult({ correct, total, stars, coinsEarned, bestStreak, newBadges });
      setProfile(getActiveProfile());
    } else {
      setResult({ correct, total, stars, coinsEarned, bestStreak, newBadges: [] });
    }
  }, [correct, bestStreak, questions.length, play, profile, topicId]);

  const advance = useCallback(() => {
    setHintOpen(false);
    setSelected(null);
    setWrongCount(0);
    setPraise(null);
    if (index + 1 >= questions.length) {
      finish();
    } else {
      setIndex((i) => i + 1);
      setStatus("answering");
    }
  }, [index, questions.length, finish]);

  const scheduleAdvance = useCallback(
    (ms: number) => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(advance, ms);
    },
    [advance],
  );

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  const handleAnswer = useCallback(
    (value: Answer, e?: React.MouseEvent) => {
      if (!q) return;
      if (status !== "answering" && !(status === "wrong" && wrongCount === 1)) return;
      if (status === "wrong" && value === selected) return;
      if (e && e.clientX) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setBurst({ x, y, id: Date.now() });
      }

      if (value === q.answer) {
        setSelected(value);
        const firstTry = wrongCount === 0;
        const newStreak = firstTry ? streak + 1 : streak;
        setStreak(newStreak);
        setBestStreak((b) => Math.max(b, newStreak));
        setCorrect((c) => c + 1);
        setCoins((c) => c + 10);
        setPraise(firstTry ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : "Nice! 💪");
        if (firstTry) play("correct", newStreak);
        else play("gentleCorrect");
        setStatus("correct");
        scheduleAdvance(1000);
      } else {
        setSelected(value);
        if (wrongCount === 0) {
          setWrongCount(1);
          setStreak(0);
          setPraise("Almost! Try again 💪");
          play("wrong");
          setStatus("wrong");
        } else {
          setPraise(`It's okay — the answer is ${q.answer}! 💛`);
          play("reveal");
          setStatus("reveal");
          scheduleAdvance(1500);
        }
      }
    },
    [q, status, wrongCount, streak, play, scheduleAdvance, selected],
  );

  const onExit = () => {
    play("click");
    router.push("/play");
  };

  if (!topicMeta) return null;
  const avatar = AVATAR_COLORS.find((c) => c.key === profile?.color);

  if (status === "loading") {
    return (
      <main className="bg-playground bg-playground-doodle safe-screen screen-dvh flex flex-col items-center justify-center gap-4">
        <Mascot mood="excited" size={140} color={avatar?.value} colorDeep={avatar?.deep} />
        <p className="text-2xl font-bold text-pops-ink">Popping your questions...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-playground bg-playground-doodle safe-screen screen-dvh flex flex-col items-center justify-center gap-4">
        <Mascot mood="sad" size={120} color="var(--color-pops-coral)" colorDeep="var(--color-pops-corald)" />
        <p className="max-w-sm text-center text-xl font-bold text-pops-ink">
          {isOnline ? "Oops! Something went wrong." : "You're offline — no internet! 📶"}
        </p>
        <p className="max-w-xs text-center text-base font-semibold text-pops-ink/60">
          {isOnline ? error : "Pop back online and try again — your questions are waiting!"}
        </p>
        <div className="flex gap-3">
          <BigButton color="var(--color-pops-mint)" colorDeep="var(--color-pops-mintd)" onClick={() => setRound((r) => r + 1)}>
            🔁 Try again
          </BigButton>
          <BigButton color="var(--color-pops-sky)" colorDeep="var(--color-pops-skyd)" onClick={() => router.push("/play")}>
            🎮 Other games
          </BigButton>
        </div>
      </main>
    );
  }

  if (status === "done") {
    return (
      <ResultScreen
        result={result}
        topicEmoji={topicMeta.emoji}
        topicName={topicMeta.name}
        onReplay={() => {
          play("pop");
          setBurst(null);
          setQuestions([]);
          setIndex(0);
          setSelected(null);
          setWrongCount(0);
          setCorrect(0);
          setStreak(0);
          setBestStreak(0);
          setCoins(0);
          setResult(null);
          setError(null);
          setStatus("loading");
          setRound((r) => r + 1);
        }}
        onHome={() => router.push("/play")}
        play={play}
      />
    );
  }

  return (
    <main className="bg-playground bg-playground-doodle safe-screen screen-dvh game-screen relative flex flex-col items-center">
      {burst && (
        <ConfettiBurst key={burst.id} x={burst.x} y={burst.y} count={28} />
      )}
      {status === "correct" && streak >= 5 && <ConfettiRain count={60} />}

      <div className="w-full max-w-2xl">
        {/* HUD */}
        <div className="flex items-center gap-2">
          <button
            onClick={onExit}
            aria-label="Leave game"
            className="btn-toy h-12 w-12 rounded-full"
            style={{ background: "var(--color-pops-cloud)", ["--btn-depth" as string]: "#e6dff0" }}
          >
            <span className="text-xl text-pops-ink">✕</span>
          </button>

          <div className="ml-2 flex items-center gap-1 rounded-full border-4 border-white bg-white/80 px-3 py-1.5 shadow">
            <Mascot size={34} color={avatar?.value} colorDeep={avatar?.deep} animate={false} />
            <span className="max-w-[90px] truncate text-lg font-bold text-pops-ink sm:max-w-none">
              {profile?.name}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <motion.div
              className="flex items-center gap-1 rounded-full border-4 border-white bg-white/80 px-3 py-1.5 shadow"
              animate={streak >= 2 ? { scale: [1, 1.15, 1] } : {}}
              transition={{ repeat: streak >= 2 ? Infinity : 0, duration: 0.5 }}
            >
              <span className="text-xl">{streak >= 2 ? "🔥" : "🌱"}</span>
              <span className="text-lg font-bold text-pops-ink">{streak}</span>
            </motion.div>
            <div className="flex items-center gap-1 rounded-full border-4 border-white bg-white/80 px-3 py-1.5 shadow">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={coins}
                  initial={{ scale: 1.6, rotate: -12 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="text-lg font-bold text-pops-ink"
                >
                  🪙 {coins}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <ProgressBar current={index + (status === "answering" || status === "wrong" ? 1 : 0) || 1} total={questions.length} />
        </div>

        {/* Question card */}
        <motion.div
          key={q.id}
          className="card-pop mt-5 flex min-h-[240px] flex-col items-center justify-center px-6 py-8 text-center"
          initial={{ scale: 0.6, opacity: 0, rotate: -2 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-2">
            <h2
              className={`text-4xl font-bold leading-tight text-pops-ink ${
                q.text.length > 42 ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl"
              }`}
            >
              {q.text}
            </h2>
            {"speechSynthesis" in window && (
              <button
                onClick={() => speak(q.text)}
                aria-label="Read the question out loud"
                className="btn-toy h-11 w-11 shrink-0 rounded-full"
                style={{ background: "var(--color-pops-cloud)", ["--btn-depth" as string]: "#e6dff0" }}
              >
                <span className="text-lg text-pops-ink">🔊</span>
              </button>
            )}
          </div>

          {q.visual && q.visual.kind === "count" ? <VisualCount visual={q.visual} /> : null}

          <div className="mt-4 h-12">
            <AnimatePresence>
              {praise && (
                <motion.p
                  key={praise + index}
                  initial={{ scale: 0.4, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 260, damping: 15 }}
                  className={`text-2xl font-bold ${status === "correct" ? "text-pops-mintd" : status === "wrong" ? "text-pops-corald" : "text-pops-ink"}`}
                >
                  {praise}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => {
              setHintOpen((h) => !h);
              play("tick");
            }}
            className="mt-1 rounded-full border-2 border-white bg-pops-purple/15 px-4 py-1.5 text-sm font-bold text-pops-purpled transition hover:scale-105"
          >
            💡 {hintOpen ? "Hide hint" : "Need a hint?"}
          </button>
          <AnimatePresence>
            {hintOpen && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 overflow-hidden text-base font-semibold text-pops-ink/70"
              >
                {q.hint}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Answer bubbles */}
        <div
          className={`mt-6 grid gap-4 ${
            typeof q.answer === "string"
              ? "grid-cols-2"
              : q.options.length === 3
                ? "grid-cols-3"
                : "grid-cols-2"
          }`}
        >
          {q.options.map((opt, i) => {
            const bubble = BUBBLE_COLORS[i % BUBBLE_COLORS.length];
            const isCorrectOpt = opt === q.answer;
            const isSelected = opt === selected;
            const revealed = status === "reveal";
            const isText = typeof opt === "string";
            let extra: React.CSSProperties = {};
            let bubbleClass = "";
            if (status === "correct" || revealed) {
              if (isCorrectOpt) {
                bubbleClass = "anim-pop-in scale-105";
                extra = { background: "var(--color-pops-mint)", ["--bubble-depth" as string]: "var(--color-pops-mintd)", boxShadow: "0 0 0 5px rgba(67,232,178,0.35), 0 7px 0 var(--color-pops-mintd)" };
              } else {
                extra = { opacity: 0.45, filter: "grayscale(0.6)" };
              }
            }
            if (status === "wrong" && isSelected) {
              bubbleClass = "anim-shake";
              extra = { background: "var(--color-pops-coral)", ["--bubble-depth" as string]: "var(--color-pops-corald)" };
            }
            const isBigNumber = !isText && String(opt).length <= 6;
            return (
              <motion.button
                key={opt}
                className={`bubble flex items-center justify-center font-bold text-center ${
                  isText
                    ? "min-h-[4.6rem] px-3 py-3 text-lg leading-snug sm:text-xl"
                    : isBigNumber
                      ? "h-24 text-4xl sm:h-28 sm:text-5xl"
                      : "h-20 px-2 text-3xl sm:h-24 sm:text-4xl"
                } ${bubbleClass}`}
                style={
                  isText
                    ? { borderRadius: "1.6rem", background: bubble.color, ["--bubble-depth" as string]: bubble.deep, ...extra }
                    : { background: bubble.color, ["--bubble-depth" as string]: bubble.deep, ...extra }
                }
                initial={{ scale: 0, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 17 }}
                whileHover={status === "answering" ? { scale: 1.04 } : {}}
                whileTap={status === "answering" ? { scale: 0.9 } : {}}
                disabled={status !== "answering" && status !== "wrong"}
                aria-label={`Answer ${opt}`}
                onClick={(e) => handleAnswer(opt, e)}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>

        {/* Mascot corner */}
        <div className="pointer-events-none fixed bottom-3 right-3 z-30 sm:bottom-6 sm:right-8">
          <Mascot mood={mascotMood} size={90} color={avatar?.value} colorDeep={avatar?.deep} />
        </div>
      </div>
    </main>
  );
}

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  u.pitch = 1.1;
  u.lang = "en-US";
  window.speechSynthesis.speak(u);
}

function VisualCount({ visual }: { visual: { items: number; icon: string } }) {
  return (
    <div className="flex max-w-full flex-wrap items-center justify-center gap-2">
      {Array.from({ length: visual.items }, (_, i) => (
        <motion.span
          key={i}
          className="anim-floaty inline-block text-4xl sm:text-5xl"
          style={{ animationDelay: `${(i % 5) * 0.15}s` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.03, type: "spring", stiffness: 300, damping: 14 }}
        >
          {visual.icon}
        </motion.span>
      ))}
    </div>
  );
}

function ResultScreen({
  result,
  topicEmoji,
  topicName,
  onReplay,
  onHome,
  play,
}: {
  result: RoundResult | null;
  topicEmoji: string;
  topicName: string;
  onReplay: () => void;
  onHome: () => void;
  play: (n: "win" | "pop" | "coin" | "click") => void;
}) {
  const r = result ?? { correct: 0, total: 10, stars: 1, coinsEarned: 0, bestStreak: 0, newBadges: [] };
  const [showBadges, setShowBadges] = useState(false);

  useEffect(() => {
    if (r.newBadges.length > 0) {
      const t = setTimeout(() => setShowBadges(true), 1400);
      return () => clearTimeout(t);
    }
  }, [r.newBadges.length]);

  return (
    <main className="bg-playground bg-playground-doodle safe-screen screen-dvh relative flex flex-col items-center justify-center overflow-hidden">
      <ConfettiRain count={120} />
      <div className="card-pop relative z-10 flex w-full max-w-md flex-col items-center gap-4 p-8 text-center">
        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}>
          <Mascot mood="celebrate" size={130} color="var(--color-pops-pink)" colorDeep="var(--color-pops-pinkd)" />
        </motion.div>

        <h1 className="text-4xl font-bold text-pops-ink">
          {r.correct === r.total ? "PERFECT!" : r.correct >= Math.ceil(r.total * 0.6) ? "AMAZING!" : "GOOD JOB!"}
        </h1>
        <p className="text-xl font-semibold text-pops-ink/70">
          {topicEmoji} {topicName} · You got {r.correct} of {r.total}!
        </p>

        <Stars count={r.stars} size={52} />

        <div className="flex items-center gap-3 rounded-full border-4 border-white bg-pops-yellow/30 px-5 py-2">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 12 }}
            className="text-2xl"
          >
            🪙
          </motion.span>
          <span className="text-2xl font-bold text-pops-ink">+{r.coinsEarned}</span>
        </div>

        {r.bestStreak >= 2 && (
          <p className="text-lg font-bold text-pops-corald">Best streak: 🔥 {r.bestStreak} in a row!</p>
        )}

        <AnimatePresence>
          {showBadges && (
            <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
              <p className="text-lg font-bold text-pops-purpled">New badges unlocked!</p>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                {r.newBadges.map((b) => (
                  <span key={b.id} className="anim-glow rounded-full border-4 border-white bg-pops-purple/15 px-3 py-1.5 text-lg font-bold text-pops-ink">
                    {b.emoji} {b.name}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-2 flex w-full flex-col gap-3">
          <BigButton
            color="var(--color-pops-pink)"
            colorDeep="var(--color-pops-pinkd)"
            size="xl"
            onClick={() => {
              play("pop");
              onReplay();
            }}
          >
            🔁 Play Again
          </BigButton>
          <BigButton
            color="var(--color-pops-sky)"
            colorDeep="var(--color-pops-skyd)"
            size="lg"
            onClick={() => {
              play("pop");
              onHome();
            }}
          >
            🎮 More Games
          </BigButton>
        </div>
      </div>
    </main>
  );
}
