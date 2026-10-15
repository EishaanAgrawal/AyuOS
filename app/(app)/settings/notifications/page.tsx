import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Notification settings" };

export default function Page() {
  return <StubScreen title="Notification settings" />;
}
