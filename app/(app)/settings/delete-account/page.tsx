import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Delete account" };

export default function Page() {
  return <StubScreen title="Delete account" />;
}
