import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { programDays } from "@/lib/data";
import { DayPageClient } from "./DayPageClient";

export function generateStaticParams() {
  return programDays.map((day) => ({ slug: day.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const day = programDays.find((d) => d.slug === slug);
  if (!day) return {};
  return { title: `Hari ${day.dayNumber}: ${day.title}` };
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
