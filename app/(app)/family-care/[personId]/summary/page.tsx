import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

type Params = { personId: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { personId } = await params;
  return { title: "Health summary: " + personId };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { personId } = await params;
  return <StubScreen title="Health summary" detail={`personId: ${personId}`} />;
}
