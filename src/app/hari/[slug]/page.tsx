import { notFound } from "next/navigation";
import { programDays } from "@/lib/data";
import { DayPageClient } from "./DayPageClient";

export function generateStaticParams() {
  return programDays.map((day) => ({ slug: day.slug }));
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dayIndex = programDays.findIndex((d) => d.slug === slug);
  const day = programDays[dayIndex];

  if (!day) {
    notFound();
  }

  return <DayPageClient day={day} dayIndex={dayIndex} />;
}
