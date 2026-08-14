"use client";

import { useSound } from "./SoundProvider";

interface BigButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  colorDeep?: string;
  size?: "sm" | "md" | "lg" | "xl";
  silent?: boolean;
}

const SIZES: Record<string, string> = {
  sm: "px-5 py-2.5 text-lg",
  md: "px-7 py-3.5 text-xl",
  lg: "px-9 py-4 text-2xl",
  xl: "px-12 py-6 text-3xl",
};

export default function BigButton({
  color = "var(--color-pops-pink)",
  colorDeep = "var(--color-pops-pinkd)",
  size = "lg",
  silent = false,
  className = "",
  children,
  ...rest
}: BigButtonProps) {
  const { play } = useSound();
  return (
    <button
      className={`btn-toy ${SIZES[size]} ${className}`}
      style={{ background: color, ["--btn-depth" as string]: colorDeep }}
      onPointerDown={() => {
        if (!silent) play("pop");
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
