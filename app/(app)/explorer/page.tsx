import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Record explorer" };

export default function Page() {
  return <StubScreen title="Record explorer" />;
}
