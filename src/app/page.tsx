"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Mascot from "@/components/Mascot";
import BigButton from "@/components/BigButton";
import { InstallButton } from "@/components/InstallButton";
import { useSound } from "@/components/SoundProvider";
import {
  AVATAR_COLORS,
  getActiveProfileId,
  getProfiles,
  setActiveProfileId,
  createProfile,
  deleteProfile,
  type Profile,
} from "@/lib/storage/profiles";
import { BANDS } from "@/lib/math/topics";
import type { BandId } from "@/lib/math/types";

const LETTERS = [
  { ch: "P", color: "var(--color-pops-pink)" },
  { ch: "o", color: "var(--color-pops-coral)" },
  { ch: "p", color: "var(--color-pops-yellow)" },
  { ch: "S", color: "var(--color-pops-mint)" },
  { ch: "c", color: "var(--color-pops-sky)" },
  { ch: "h", color: "var(--color-pops-purple)" },
  { ch: "o", color: "var(--color-pops-red)" },
  { ch: "o", color: "var(--color-pops-pink)" },
  { ch: "l", color: "var(--color-pops-sky)" },
  { ch: "!", color: "var(--color-pops-ink)" },
];

export default function Home() {
  const router = useRouter();
  const { play, enabled, toggle } = useSound();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfiles(getProfiles());
    setActiveId(getActiveProfileId());
    setLoaded(true);
  }, []);

  const select = (id: string) => {
    play("pop");
    setActiveProfileId(id);
    setActiveId(id);
    router.push("/play");
  };

  const handleCreate = (name: string, color: string, band: BandId) => {
    createProfile({ name, color, band });
    setProfiles(getProfiles());
    setActiveId(getActiveProfileId());
    play("win");
    router.push("/play");
  };

  const removeProfile = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    play("click");
    deleteProfile(id);
    setProfiles(getProfiles());
    setActiveId(getActiveProfileId());
  };

  return (
    <main className="bg-playground bg-playground-doodle safe-screen screen-dvh relative flex flex-col items-center overflow-hidden">
      <button
        onClick={toggle}
        aria-label={enabled ? "Turn sound off" : "Turn sound on"}
        className="btn-toy absolute right-4 top-4 z-30 h-14 w-14 rounded-full"
        style={{ background: "var(--color-pops-cloud)", ["--btn-depth" as string]: "#e6dff0" }}
      >
        <span className="text-2xl">{enabled ? "🔊" : "🔇"}</span>
      </button>

      <motion.div
        className="mt-6 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <div className="flex items-end justify-center gap-1 text-5xl font-bold sm:text-6xl md:text-7xl" aria-label="PopSchool">
          {LETTERS.map((l, i) => (
            <span
              key={i}
              className="anim-letter inline-block drop-shadow-lg"
              style={{ color: l.color, animationDelay: `${i * 0.13}s` }}
            >
              {l.ch}
            </span>
          ))}
        </div>
        <div className="anim-floaty mt-2 text-center">
          <Mascot mood="celebrate" size={110} color="var(--color-pops-pink)" colorDeep="var(--color-pops-pinkd)" />
        </div>
            <p className="mt-1 text-center text-lg font-semibold text-pops-ink sm:text-xl">
              Pop the answers. <span className="text-pops-pink">Feel the magic!</span> 🪄
            </p>
      </motion.div>

      <motion.section
        className="mt-8 w-full max-w-2xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 120, damping: 16 }}
      >
        <h2 className="mb-3 text-center text-2xl font-bold text-pops-ink">
          {loaded && profiles.length > 0 ? "Who's playing today? 🎈" : "Let's make your player! 🎈"}
        </h2>

        {profiles.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <AnimatePresence>
              {profiles.map((p) => {
                const avatar = AVATAR_COLORS.find((c) => c.key === p.color);
                return (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    whileTap={{ scale: 0.92 }}
                    role="button"
                    tabIndex={0}
                    onClick={() => select(p.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") select(p.id);
                    }}
                    className={`card-pop group relative flex flex-col items-center gap-1 p-4 outline-none transition-transform hover:-translate-y-1 ${
                      activeId === p.id ? "ring-4 ring-pops-yellow" : ""
                    }`}
                  >
                    <Mascot size={72} color={avatar?.value} colorDeep={avatar?.deep} />
                    <span className="max-w-full truncate text-xl font-bold text-pops-ink">{p.name}</span>
                    <span className="text-sm font-semibold text-pops-ink/60">
                      🪙 {p.coins} · ⭐ {Object.values(p.stats).reduce((s, t) => s + (t?.best ?? 0), 0)}
                    </span>
                    <button
                      onClick={(e) => removeProfile(e, p.id)}
                      aria-label={`Delete ${p.name}`}
                      className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white shadow-md transition hover:scale-110"
                      style={{ background: "var(--color-pops-red)" }}
                    >
                      ✕
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            className="card-pop flex flex-col items-center gap-3 p-8 text-center"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <span className="text-5xl">🎉</span>
            <p className="text-lg font-semibold text-pops-ink">
              Tap below to make your very own learning buddy!
            </p>
          </motion.div>
        )}

        <div className="mt-6 flex flex-col items-center gap-3">
          <BigButton
            color="var(--color-pops-pink)"
            colorDeep="var(--color-pops-pinkd)"
            size="xl"
            onClick={() => {
              play("pop");
              setShowCreate(true);
            }}
          >
            {profiles.length > 0 ? "➕ New Player" : "🎈 Make a Player"}
          </BigButton>

          {profiles.length > 0 && activeId && (
            <BigButton
              color="var(--color-pops-mint)"
              colorDeep="var(--color-pops-mintd)"
              size="lg"
              onClick={() => select(activeId)}
            >
              ▶️ Play Now
            </BigButton>
          )}
        </div>
      </motion.section>

      <footer className="mt-10 text-center text-sm font-semibold text-pops-ink/50">
        Made with 💖 for brilliant kids everywhere · PopSchool!
      </footer>

      <InstallButton />

      <AnimatePresence>
        {showCreate && (
          <CreateProfileModal onClose={() => setShowCreate(false)} onCreate={handleCreate} />
        )}
      </AnimatePresence>
    </main>
  );
}

function CreateProfileModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (name: string, color: string, band: BandId) => void;
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState(AVATAR_COLORS[0].key);
  const [band, setBand] = useState<BandId>("m");

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-pops-ink/40 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="card-pop w-full max-w-md p-6"
        initial={{ scale: 0.7, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center text-2xl font-bold text-pops-ink">Make your buddy! 🧸</h3>

        <label className="mt-4 block">
          <span className="text-lg font-bold text-pops-ink">Their name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={14}
            placeholder="e.g. Mia"
            className="mt-1 w-full rounded-2xl border-4 border-pops-purple/40 bg-pops-cream px-4 py-3 text-xl font-bold text-pops-ink outline-none focus:border-pops-purple"
          />
        </label>

        <div className="mt-4">
          <span className="text-lg font-bold text-pops-ink">Pick a buddy</span>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {AVATAR_COLORS.map((c) => (
              <button
                key={c.key}
                onClick={() => setColor(c.key)}
                aria-label={c.name}
                className={`rounded-full border-4 transition-transform ${
                  color === c.key ? "scale-110 border-pops-yellow" : "border-white"
                }`}
                style={{ background: c.value }}
              >
                <Mascot size={52} color={c.value} colorDeep={c.deep} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <span className="text-lg font-bold text-pops-ink">Pick an adventure</span>
          <div className="mt-2 grid gap-2">
            {BANDS.map((b) => (
              <button
                key={b.id}
                onClick={() => setBand(b.id)}
                className={`flex items-center gap-3 rounded-2xl border-4 p-3 text-left transition ${
                  band === b.id ? "border-pops-yellow bg-pops-yellow/20" : "border-white bg-pops-cream"
                }`}
              >
                <span className="text-3xl">{b.emoji}</span>
                <span className="flex-1">
                  <span className="block text-lg font-bold text-pops-ink">{b.name}</span>
                  <span className="block text-sm font-semibold text-pops-ink/60">
                    {b.age} · {b.tagline}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <BigButton
            color="var(--color-pops-cloud)"
            colorDeep="#e6dff0"
            size="md"
            silent
            className="flex-1 !text-pops-ink"
            onClick={onClose}
          >
            Back
          </BigButton>
          <BigButton
            color="var(--color-pops-pink)"
            colorDeep="var(--color-pops-pinkd)"
            size="md"
            className="flex-1"
            onClick={() => onCreate(name || "Player", color, band)}
          >
            Let&apos;s go! 🚀
          </BigButton>
        </div>
      </motion.div>
    </motion.div>
  );
}
