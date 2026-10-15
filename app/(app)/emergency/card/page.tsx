import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Emergency card" };

export default function Page() {
  return <StubScreen title="Emergency card" />;
}
