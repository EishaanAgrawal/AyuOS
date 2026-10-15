import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Family care" };

export default function Page() {
  return <StubScreen title="Family care" />;
}
