import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Care" };

export default function Page() {
  return <StubScreen title="Care" />;
}
