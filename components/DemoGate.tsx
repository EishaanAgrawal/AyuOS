"use client";

import type { ReactNode } from "react";
import { useDemo } from "@/lib/demo";
import { DemoBanner } from "./DemoBanner";
import { DemoExited } from "./DemoExited";

/**
 * Wraps (app) and (auth) layouts: keeps the demo banner visible on every
 * screen and swaps in a plain explainer screen once demo mode is exited.
 * Content is offset so it never slides under the fixed banner.
 */
export function DemoGate({ children }: { children: ReactNode }) {
  const { demoExited } = useDemo();

  if (demoExited) {
    return (
      <div className="flex min-h-dvh flex-col">
        <DemoExited />
      </div>
    );
  }

  return (
    <>
      <DemoBanner />
      <div className="flex flex-1 flex-col pt-[calc(2.75rem+env(safe-area-inset-top))]">
        {children}
      </div>
    </>
  );
}
