import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Notifications" };

export default function Page() {
  return <StubScreen title="Notifications" />;
}
