"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Mascot from "@/components/Mascot";
import BigButton from "@/components/BigButton";
import { useSound } from "@/components/SoundProvider";
import { getActiveProfile, updateProfile, AVATAR_COLORS, topicBest, topicPlays, type Profile } from "@/lib/storage/profiles";
import { BANDS, SUBJECTS, subjectsForBand, topicsForSubject } from "@/lib/math";
import type { BandId, SubjectId, TopicMeta } from "@/lib/math";

export default function Play() {
  const router = useRouter();
  const { play } = useSound();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [band, setBand] = useState<BandId>("m");
  const [subject, setSubject] = useState<SubjectId>("math");

  useEffect(() => {
    const p = getActiveProfile();
    if (!p) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(p);
    setBand(p.band);
  }, [router]);

  if (!profile) return null;

  const avatar = AVATAR_COLORS.find((c) => c.key === profile.color);
  const topics = topicsForSubject(subject, band);
  const bandMeta = BANDS.find((b) => b.id === band)!;
  const subjectMeta = SUBJECTS.find((s) => s.id === subject)!;
  const availableSubjects = subjectsForBand(band);

  const changeBand = (b: BandId) => {
    play("click");
    setBand(b);
    updateProfile(profile.id, { band: b });
    if (!subjectsForBand(b).some((s) => s.id === subject)) {
      setSubject(subjectsForBand(b)[0].id);
    }
  };

  const changeSubject = (s: SubjectId) => {
    play("click");
    setSubject(s);
  };

  return (
    <main className="bg-playground bg-playground-doodle safe-screen screen-dvh relative">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-3">
          <BigButton
            color="var(--color-pops-cloud)"
            colorDeep="#e6dff0"
            size="sm"
            silent
            className="!text-pops-ink"
            onClick={() => {
              play("pop");
              router.push("/");
            }}
          >
            ← Home
          </BigButton>
          <div className="ml-auto flex items-center gap-2 rounded-full border-4 border-white bg-white/70 px-4 py-1 shadow">
            <span className="text-sm font-bold text-pops-ink/60">🪙</span>
            <span className="font-bold text-pops-ink">{profile.coins}</span>
            <span className="mx-1 text-pops-ink/20">|</span>
            <span className="font-bold text-pops-ink">🔥 {profile.dailyStreak}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 14 }}>
            <Mascot size={96} color={avatar?.value} colorDeep={avatar?.deep} mood="happy" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold text-pops-ink sm:text-4xl">
              Hey, {profile.name}! 👋
            </h1>
            <p className="text-lg font-semibold text-pops-ink/60">What are we conquering today?</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {availableSubjects.map((s) => (
            <button
              key={s.id}
              onClick={() => changeSubject(s.id)}
              className={`btn-toy px-4 py-2 text-lg sm:px-5 sm:text-xl ${subject === s.id ? "" : "opacity-70"}`}
              style={{
                background: s.color,
                ["--btn-depth" as string]: s.colorDeep,
                boxShadow:
                  subject === s.id
                    ? `0 6px 0 ${s.colorDeep}, 0 10px 22px rgba(59,45,94,0.25)`
                    : "none",
              }}
            >
              {s.emoji} {s.name}
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-base font-semibold text-pops-ink/60">{subjectMeta.tagline}</p>

        <div className="mt-3 flex justify-center gap-2">
          {BANDS.map((b) => (
            <button
              key={b.id}
              onClick={() => changeBand(b.id)}
              className={`btn-toy px-4 py-2 text-lg sm:px-6 sm:py-2 sm:text-lg ${band === b.id ? "" : "opacity-70"}`}
              style={{
                background: b.color,
                ["--btn-depth" as string]: b.colorDeep,
                boxShadow:
                  band === b.id
                    ? `0 6px 0 ${b.colorDeep}, 0 10px 22px rgba(59,45,94,0.25)`
                    : "none",
              }}
            >
              {b.emoji} {b.name}
            </button>
          ))}
        </div>
        <p className="mt-2 text-center text-sm font-semibold text-pops-ink/50">
          {bandMeta.age} · {bandMeta.tagline}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {topics.map((t, i) => (
              <TopicCard
                key={`${band}-${t.id}`}
                topic={t}
                index={i}
                best={topicBest(profile, t.id)}
                plays={topicPlays(profile, t.id)}
                onPlay={() => {
                  play("pop");
                  router.push(`/play/${t.id}?band=${band}`);
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function TopicCard({
  topic,
  index,
  best,
  plays,
  onPlay,
}: {
  topic: TopicMeta;
  index: number;
  best: number;
  plays: number;
  onPlay: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ scale: 0.5, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.6, opacity: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 200, damping: 18 }}
      whileTap={{ scale: 0.92 }}
      onClick={onPlay}
      className="btn-toy flex flex-col items-center gap-1 rounded-[2rem] p-5"
      style={{ background: topic.color, ["--btn-depth" as string]: topic.colorDeep }}
    >
      <span className="anim-floaty text-5xl" style={{ animationDelay: `${index * 0.2}s` }}>
        {topic.emoji}
      </span>
      <span className="text-xl font-bold sm:text-2xl">{topic.name}</span>
      <span className="text-sm font-semibold opacity-90">{topic.tagline}</span>
      <span className="mt-1 text-sm font-bold text-white/90">
        {plays > 0 ? `⭐ ${best}/10 best` : "🎮 New!"}
      </span>
    </motion.button>
  );
}
