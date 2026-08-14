import { motion } from "framer-motion";

export function Stars({ count, size = 40 }: { count: number; size?: number }) {
  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3].map((i) => {
        const filled = i <= count;
        return (
          <motion.span
            key={i}
            initial={filled ? { scale: 0, rotate: -30 } : false}
            animate={filled ? { scale: 1, rotate: 0 } : { scale: 0.9 }}
            transition={{ delay: filled ? i * 0.18 : 0, type: "spring", stiffness: 300, damping: 14 }}
            className={filled ? "anim-glow" : "opacity-40"}
            style={{ fontSize: size }}
            role="img"
            aria-label={filled ? "star" : "empty star"}
          >
            {filled ? "⭐" : "☆"}
          </motion.span>
        );
      })}
    </div>
  );
}
