import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Reset password" };

export default function Page() {
  return <StubScreen title="Reset password" />;
}
