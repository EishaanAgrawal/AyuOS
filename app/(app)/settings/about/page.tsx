import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "About AyuOS" };

export default function Page() {
  return <StubScreen title="About AyuOS" />;
}
