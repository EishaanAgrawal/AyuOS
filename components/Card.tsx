import type { HTMLAttributes, ReactNode } from "react";

type CardLevel = "flat" | "lifted" | "overlay";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** flat: hairline border only · lifted: ambient teal shadow · overlay: modal depth */
  level?: CardLevel;
  children: ReactNode;
}

const LEVELS: Record<CardLevel, string> = {
  flat: "border border-hairline",
  lifted: "border border-hairline shadow-lifted",
  overlay: "border border-hairline shadow-overlay",
};

/** Content card: pure white, 1rem radius, hairline border (DESIGN.md Level 1). */
export function Card({ level = "flat", className = "", children, ...rest }: CardProps) {
  return (
    <div
      className={`rounded-lg bg-surface-container-lowest p-4 ${LEVELS[level]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
