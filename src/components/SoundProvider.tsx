"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { soundEngine } from "@/lib/audio/sound";

const KEY = "mathpop:sound";

interface SoundApi {
  enabled: boolean;
  toggle: () => void;
  play: (name: SfxName, streak?: number) => void;
}

export type SfxName =
  | "click"
  | "pop"
  | "correct"
  | "gentleCorrect"
  | "wrong"
  | "reveal"
  | "win"
  | "coin"
  | "tick";

const SFX_MAP: Record<SfxName, (streak?: number) => void> = {
  click: () => soundEngine.click(),
  pop: () => soundEngine.pop(),
  correct: (s = 1) => soundEngine.correct(s),
  gentleCorrect: () => soundEngine.gentleCorrect(),
  wrong: () => soundEngine.wrong(),
  reveal: () => soundEngine.reveal(),
  win: () => soundEngine.win(),
  coin: () => soundEngine.coin(),
  tick: () => soundEngine.tick(),
};

const SoundContext = createContext<SoundApi | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    let v = true;
    try {
      v = localStorage.getItem(KEY) !== "off";
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(v);
    soundEngine.setEnabled(v);
    soundEngine.unlock();
  }, []);

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(KEY, next ? "on" : "off");
      } catch {
        /* ignore */
      }
      soundEngine.setEnabled(next);
      return next;
    });
  }, []);

  const play = useCallback((name: SfxName, streak?: number) => {
    soundEngine.unlock();
    if (name === "correct") SFX_MAP.correct(streak);
    else SFX_MAP[name]();
  }, []);

  const value = useMemo(() => ({ enabled, toggle, play }), [enabled, toggle, play]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundApi {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside SoundProvider");
  return ctx;
}
