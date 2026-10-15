import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Upload" };

export default function Page() {
  return <StubScreen title="Upload" />;
}
