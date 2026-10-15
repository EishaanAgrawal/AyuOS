import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Continue with Google" };

export default function Page() {
  return <StubScreen title="Continue with Google" />;
}
