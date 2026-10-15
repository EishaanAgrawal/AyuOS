import type { Metadata } from "next";
import { StubScreen } from "@/components/StubScreen";

type Params = { id: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { id } = await params;
  return { title: "Appointment details: " + id };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  return <StubScreen title="Appointment details" detail={`id: ${id}`} />;
}
