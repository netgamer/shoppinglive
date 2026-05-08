import { liveEvents } from "@/lib/mock-data";
import LiveDetailClient from "./LiveDetailClient";

export function generateStaticParams() {
  return liveEvents.map((e) => ({ id: e.id }));
}

export default async function LiveDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <LiveDetailClient id={id} />;
}
