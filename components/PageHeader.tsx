"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  action?: ReactNode;
  onBack?: () => void;
  showBack?: boolean;
}

/**
 * Sub-screen header: back button + title + optional action.
 * Sticks just below the fixed demo banner (2.75rem + safe-area top).
 */
export function PageHeader({ title, action, onBack, showBack = true }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  return (
    <header className="sticky top-[calc(2.75rem+env(safe-area-inset-top))] z-30 -mx-5 border-b border-hairline bg-background">
      <div className="flex h-14 items-center gap-1 px-2">
        {showBack ? (
          <button
            type="button"
            onClick={handleBack}
            aria-label="Go back"
            className="flex h-10 w-10 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
        ) : null}
        <h1 className="flex-1 truncate text-lg font-semibold tracking-tight text-on-surface">
          {title}
        </h1>
        {action ? <div className="shrink-0 pr-1">{action}</div> : null}
      </div>
    </header>
  );
}
