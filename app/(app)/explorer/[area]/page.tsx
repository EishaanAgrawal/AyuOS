import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

type Params = { area: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { area } = await params;
  return { title: "Explore area: " + area };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { area } = await params;
  return <StubScreen title="Explore area" detail={`area: ${area}`} />;
}
