import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Text size" };

export default function Page() {
  return <StubScreen title="Text size" />;
}
