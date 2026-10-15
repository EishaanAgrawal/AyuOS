import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Create account" };

export default function Page() {
  return <StubScreen title="Create account" />;
}
