import { courses } from "./courses";
import { programDays } from "./data";
import { learningMaterials } from "./learningSpace";
import { prdSections } from "./prdContent";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  href: string;
  group: "Program" | "Onboarding" | "Learning Space" | "PRD";
  external?: boolean;
}

function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const course of courses) {
    items.push({
      id: `course-${course.id}`,
      title: course.title,
      description: course.description,
      href: course.href,
      group: "Program",
    });
  }

  for (const day of programDays) {
    items.push({
      id: `day-${day.slug}`,
      title: `Hari ${day.dayNumber}: ${day.title}`,
      description: day.intro,
      href: `/hari/${day.slug}`,
      group: "Onboarding",
    });
  }

  for (const material of learningMaterials) {
    items.push({
      id: `material-${material.id}`,
      title: material.title,
      description: material.categories.join(", "),
      href: material.pdfUrl,
      group: "Learning Space",
      external: true,
    });
  }

  for (const section of prdSections) {
    items.push({
      id: `prd-${section.id}`,
      title: section.title,
      description: "PRD — Onboarding CISDI",
      href: `/prd#${section.id}`,
      group: "PRD",
    });
  }

  return items;
}

export const searchIndex: SearchItem[] = buildSearchIndex();
