export type TaskType =
  | "video"
  | "document"
  | "link"
  | "reflection"
  | "action"
  | "meeting"
  | "info";

export interface ProgramTask {
  id: string;
  type: TaskType;
  title: string;
  description?: string;
  steps?: string[];
  href?: string;
  ctaLabel?: string;
}

export interface ProgramSection {
  id: string;
  title: string;
  note?: string;
  tasks: ProgramTask[];
}

export type DayIcon = "kickoff" | "growth";

export interface ProgramDay {
  slug: string;
  dayNumber: number;
  title: string;
  icon: DayIcon;
  intro: string;
  closingQuote?: string;
  sections: ProgramSection[];
  note?: string;
}

export interface LearningMaterial {
  id: string;
  title: string;
  categories: string[];
  pdfUrl: string;
}
