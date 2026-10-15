"use client";

import { useDemo } from "@/lib/demo";

/** Fixed banner marking every screen as a fictional demo preview. */
export function DemoBanner() {
  const { demoExited, exitDemo } = useDemo();
  if (demoExited) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 mx-auto w-full max-w-[430px] pt-[env(safe-area-inset-top)]">
      <div className="flex h-11 items-center justify-between border-b border-warm-amber/40 bg-warm-amber/15 px-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-on-surface">
          Demo preview — fictional data
        </p>
        <button
          type="button"
          onClick={exitDemo}
          className="rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-primary transition-colors hover:bg-warm-amber/25"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
