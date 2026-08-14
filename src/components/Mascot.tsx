export type MascotMood = "idle" | "happy" | "think" | "celebrate" | "sad" | "excited";

interface MascotProps {
  mood?: MascotMood;
  color?: string;
  colorDeep?: string;
  className?: string;
  size?: number;
  animate?: boolean;
}

const MOOD_EYES: Record<MascotMood, "open" | "happy" | "sad"> = {
  idle: "open",
  happy: "open",
  think: "open",
  celebrate: "happy",
  sad: "sad",
  excited: "open",
};

export default function Mascot({
  mood = "happy",
  color = "#ff5d8f",
  colorDeep = "#e03a70",
  className = "",
  size = 120,
  animate = true,
}: MascotProps) {
  const eyes = MOOD_EYES[mood];
  const isSad = mood === "sad";
  const isCelebrate = mood === "celebrate";
  const isThink = mood === "think";
  const isExcited = mood === "excited";

  return (
    <div
      className={`relative inline-flex items-center justify-center ${animate ? (isCelebrate ? "anim-wiggle" : "anim-floaty") : ""} ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        <defs>
          <radialGradient id={`mascot-body-${color.replace("#", "")}`} cx="50%" cy="38%" r="70%">
            <stop offset="0%" stopColor={lighten(color)} />
            <stop offset="100%" stopColor={color} />
          </radialGradient>
        </defs>

        {isCelebrate && (
          <>
            <text x="18" y="40" fontSize="22" textAnchor="middle">🎵</text>
            <text x="182" y="52" fontSize="24" textAnchor="middle">✨</text>
            <text x="168" y="150" fontSize="20" textAnchor="middle">🎉</text>
            <text x="30" y="160" fontSize="20" textAnchor="middle">💫</text>
          </>
        )}
        {isThink && (
          <g>
            <circle cx="176" cy="34" r="10" fill="white" stroke="#3b2d5e" strokeWidth="3" />
            <text x="176" y="40" fontSize="16" textAnchor="middle" fontWeight="bold" fill="#3b2d5e">?</text>
          </g>
        )}
        {isSad && (
          <text x="38" y="128" fontSize="22" textAnchor="middle">💧</text>
        )}

        <g transform={isSad ? "translate(0 4)" : "translate(0 0)"}>
          <ellipse cx="100" cy="128" rx="34" ry="12" fill={colorDeep} opacity="0.35" />
          <ellipse cx="60" cy="120" rx="16" ry="8" fill={colorDeep} opacity="0.35" />
          <ellipse cx="140" cy="120" rx="16" ry="8" fill={colorDeep} opacity="0.35" />

          <ellipse cx="100" cy="112" rx="66" ry="58" fill={`url(#mascot-body-${color.replace("#", "")})`} stroke={colorDeep} strokeWidth="5" />

          <ellipse cx="48" cy="44" rx="18" ry="24" fill={color} stroke={colorDeep} strokeWidth="5" transform="rotate(-18 48 44)" />
          <ellipse cx="152" cy="44" rx="18" ry="24" fill={color} stroke={colorDeep} strokeWidth="5" transform="rotate(18 152 44)" />
          <ellipse cx="48" cy="40" rx="9" ry="12" fill={lighten(color)} transform="rotate(-18 48 40)" />
          <ellipse cx="152" cy="40" rx="9" ry="12" fill={lighten(color)} transform="rotate(18 152 40)" />

          <ellipse cx="100" cy="128" rx="38" ry="30" fill={lighten(color)} opacity="0.85" />

          {isCelebrate && (
            <g>
              <ellipse cx="74" cy="66" rx="16" ry="22" fill={color} stroke={colorDeep} strokeWidth="5" transform="rotate(-35 74 66)" />
              <ellipse cx="126" cy="66" rx="16" ry="22" fill={color} stroke={colorDeep} strokeWidth="5" transform="rotate(35 126 66)" />
            </g>
          )}

          {eyes === "open" && (
            <g>
              <circle cx="82" cy="100" r={isExcited ? 16 : 13} fill="white" />
              <circle cx="118" cy="100" r={isExcited ? 16 : 13} fill="white" />
              <circle cx={isExcited ? 84 : 84} cy={isExcited ? 103 : 102} r={isExcited ? 8 : 6.5} fill="#3b2d5e" />
              <circle cx={isExcited ? 120 : 116} cy={isExcited ? 103 : 102} r={isExcited ? 8 : 6.5} fill="#3b2d5e" />
              <circle cx="86" cy="98" r="2.4" fill="white" />
              <circle cx="122" cy="98" r="2.4" fill="white" />
            </g>
          )}
          {eyes === "happy" && (
            <g>
              <path d="M70 103 q12 -12 24 0" stroke="#3b2d5e" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M106 103 q12 -12 24 0" stroke="#3b2d5e" strokeWidth="6" fill="none" strokeLinecap="round" />
            </g>
          )}
          {eyes === "sad" && (
            <g>
              <circle cx="82" cy="100" r="12" fill="white" />
              <circle cx="118" cy="100" r="12" fill="white" />
              <circle cx="84" cy="103" r="6" fill="#3b2d5e" />
              <circle cx="116" cy="103" r="6" fill="#3b2d5e" />
              <path d="M70 88 q4 6 8 4" stroke="#3b2d5e" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M122 88 q4 6 8 4" stroke="#3b2d5e" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}

          <ellipse cx="64" cy="122" rx="9" ry="6" fill={isSad ? "#ffd7e2" : "#ffd7e2"} opacity="0.9" />
          <ellipse cx="136" cy="122" rx="9" ry="6" fill={isSad ? "#ffd7e2" : "#ffd7e2"} opacity="0.9" />

          {mood === "happy" && (
            <path d="M82 138 q18 18 36 0" stroke="#3b2d5e" strokeWidth="6" fill="none" strokeLinecap="round" />
          )}
          {mood === "idle" && (
            <path d="M84 138 q16 10 32 0" stroke="#3b2d5e" strokeWidth="6" fill="none" strokeLinecap="round" />
          )}
          {mood === "excited" && (
            <>
              <ellipse cx="100" cy="142" rx="17" ry="14" fill="#3b2d5e" />
              <path d="M100 128 q4 -5 8 0 M104 150 q4 5 8 0" stroke="#3b2d5e" strokeWidth="4" fill="none" strokeLinecap="round" />
            </>
          )}
          {mood === "think" && (
            <path d="M84 138 q16 8 32 0" stroke="#3b2d5e" strokeWidth="6" fill="none" strokeLinecap="round" />
          )}
          {mood === "celebrate" && (
            <>
              <path d="M80 138 q20 20 40 0" stroke="#3b2d5e" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M88 132 L84 118 M112 132 L116 118" stroke="#3b2d5e" strokeWidth="5" fill="none" strokeLinecap="round" />
            </>
          )}
          {mood === "sad" && (
            <path d="M84 144 q16 -10 32 0" stroke="#3b2d5e" strokeWidth="6" fill="none" strokeLinecap="round" />
          )}
        </g>
      </svg>
    </div>
  );
}

function lighten(hex: string): string {
  const h = hex.replace("#", "");
  if (h.length !== 6) return "#ffffff";
  const r = Math.min(255, parseInt(h.slice(0, 2), 16) + 60);
  const g = Math.min(255, parseInt(h.slice(2, 4), 16) + 60);
  const b = Math.min(255, parseInt(h.slice(4, 6), 16) + 60);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
