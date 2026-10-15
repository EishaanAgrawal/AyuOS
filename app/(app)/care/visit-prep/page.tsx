import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

export const metadata: Metadata = { title: "Visit prep" };

export default function Page() {
  return <StubScreen title="Visit prep" />;
}
