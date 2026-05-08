import { courses } from "@/lib/mock-data";
import CourseDetailClient from "./CourseDetailClient";

export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}

export default async function CourseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CourseDetailClient id={id} />;
}
