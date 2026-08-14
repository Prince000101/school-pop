"use client";

import { motion } from "framer-motion";

const COLORS = ["#ff5d8f", "#ffd447", "#4cc9ff", "#43e8b2", "#b48bff", "#ff8a5c", "#ff6b6b", "#ffffff"];

interface Piece {
  id: number;
  x: number;
  delay: number;
  dur: number;
  rot: number;
  color: string;
  size: number;
  shape: "rect" | "circle" | "star";
}

function makePieces(count: number, seed = 7): Piece[] {
  let s = seed * 9301 + 49297;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rnd() * 100,
    delay: rnd() * 0.6,
    dur: 1.6 + rnd() * 1.6,
    rot: rnd() * 720 - 360,
    color: COLORS[Math.floor(rnd() * COLORS.length)],
    size: 8 + rnd() * 10,
    shape: (["rect", "circle", "star"] as const)[Math.floor(rnd() * 3)],
  }));
}

export function ConfettiRain({ count = 90 }: { count?: number }) {
  const pieces = makePieces(count);
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -30, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", x: `calc(${p.x}vw + ${Math.sin(p.id) * 6}px)`, opacity: [1, 1, 0.9], rotate: p.rot }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
          className="absolute top-0"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.shape === "circle" ? "50%" : p.shape === "star" ? "50% 50% 0 0" : "3px",
          }}
        />
      ))}
    </div>
  );
}

export function ConfettiBurst({ x = 50, y = 50, count = 26 }: { x?: number; y?: number; count?: number }) {
  const pieces = makePieces(count);
  return (
    <div className="pointer-events-none fixed inset-0 z-50" aria-hidden>
      {pieces.map((p, i) => {
        const angle = (i / count) * Math.PI * 2;
        const dist = 120 + (i % 5) * 40;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist;
        return (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.6, rotate: 0 }}
            animate={{
              x: dx,
              y: dy + 120,
              opacity: [1, 1, 0],
              scale: 1,
              rotate: p.rot,
            }}
            transition={{ duration: 0.9 + p.dur * 0.3, ease: "easeOut" }}
            className="absolute"
            style={{
              left: `${x}vw`,
              top: `${y}vh`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: p.shape === "circle" ? "50%" : p.shape === "star" ? "50% 50% 0 0" : "3px",
            }}
          />
        );
      })}
    </div>
  );
}
