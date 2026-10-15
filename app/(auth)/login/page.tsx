import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Log in" };

export default function Page() {
  return <StubScreen title="Log in" />;
}
