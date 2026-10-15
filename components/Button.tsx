"use client";

import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { DEMO_TOAST_MESSAGE, useToast } from "@/lib/toast";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "md" | "sm";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary hover:bg-primary-dark active:bg-primary-dark disabled:bg-outline-variant disabled:text-on-surface-variant",
  secondary:
    "border border-hairline bg-surface-container-lowest text-on-surface hover:bg-surface active:bg-surface disabled:opacity-50",
  ghost: "text-primary hover:bg-primary/10 active:bg-primary/15 disabled:opacity-50",
  danger:
    "bg-muted-coral text-white hover:brightness-[0.95] active:brightness-90 disabled:opacity-50",
};

const SIZES: Record<ButtonSize, string> = {
  md: "h-12 px-6 text-base", // 48px touch target (DESIGN.md)
  sm: "h-10 px-4 text-sm",
};

/**
 * AyuOS button. Honest demo behavior: a button with no onClick shows
 * "Demo mode — backend pending" instead of faking success.
 */
export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  onClick,
  disabled,
  type = "button",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const { notify } = useToast();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    } else if (!disabled) {
      notify(DEMO_TOAST_MESSAGE);
    }
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
