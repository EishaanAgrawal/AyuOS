import type { ReactNode } from "react";
import { DemoGate } from "@/components/DemoGate";

/** Auth screens: demo banner on top, no bottom nav. */
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <DemoGate>{children}</DemoGate>;
}
