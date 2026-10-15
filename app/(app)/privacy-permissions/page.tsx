import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Privacy & permissions" };

export default function Page() {
  return <StubScreen title="Privacy & permissions" />;
}
