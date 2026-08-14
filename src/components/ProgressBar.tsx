"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  current: number;
  total: number;
  color?: string;
  colorDeep?: string;
}

export default function ProgressBar({ current, total, color = "#4cc9ff", colorDeep = "#1f9fe0" }: ProgressBarProps) {
  const pct = Math.min(100, (current / total) * 100);
  return (
    <div className="w-full" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total}>
      <div
        className="relative h-8 w-full overflow-hidden rounded-full border-4 border-white shadow-inner"
        style={{ background: "#eef2ff", boxShadow: "inset 0 3px 8px rgba(59,45,94,0.18)" }}
      >
        <motion.div
          className="relative h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${colorDeep})`,
            boxShadow: "0 0 14px rgba(255,255,255,0.7)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          {current >= 1 && (
            <span className="absolute right-1 top-1/2 -translate-y-1/2 text-sm">⭐</span>
          )}
        </motion.div>
      </div>
      <div className="mt-1 text-center text-sm font-bold text-pops-ink/70">
        {Math.min(current, total)} of {total} booms
      </div>
    </div>
  );
}
