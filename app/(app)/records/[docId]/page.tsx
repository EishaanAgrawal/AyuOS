import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

type Params = { docId: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { docId } = await params;
  return { title: "Record details: " + docId };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { docId } = await params;
  return <StubScreen title="Record details" detail={`docId: ${docId}`} />;
}
