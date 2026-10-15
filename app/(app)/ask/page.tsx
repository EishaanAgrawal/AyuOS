import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Ask Ayu" };

export default function Page() {
  return <StubScreen title="Ask Ayu" />;
}
