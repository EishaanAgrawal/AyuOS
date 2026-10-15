import type { ReactNode } from "react";

export type BadgeTone = "primary" | "secondary" | "success" | "warning" | "critical" | "neutral";

interface BadgeProps {
  tone?: BadgeTone;
  children: ReactNode;
  className?: string;
}

const TONES: Record<BadgeTone, string> = {
  primary: "bg-primary/10 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  success: "bg-calm-green/15 text-calm-green",
  warning: "bg-warm-amber/20 text-on-surface",
  critical: "bg-error-container text-on-error-container",
  neutral: "bg-surface-container-high text-on-surface-variant",
};

/** Pill-shaped tag / badge (DESIGN.md: fully rounded pill geometry). */
export function Badge({ tone = "neutral", children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.04em] ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
