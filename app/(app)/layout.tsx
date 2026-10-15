import type { ReactNode } from "react";
import { BottomNav } from "@/components/BottomNav";
import { DemoGate } from "@/components/DemoGate";

/**
 * Main app shell: demo banner, padded content column, bottom tab bar.
 * Bottom padding keeps content from hiding behind the fixed BottomNav.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <DemoGate>
      <main className="flex-1 px-5 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
        {children}
      </main>
      <BottomNav />
    </DemoGate>
  );
}
