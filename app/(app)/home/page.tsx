import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Home" };

export default function Page() {
  return <StubScreen title="Home" />;
}
