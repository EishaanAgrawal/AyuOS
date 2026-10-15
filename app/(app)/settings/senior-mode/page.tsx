import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Senior mode" };

export default function Page() {
  return <StubScreen title="Senior mode" />;
}
