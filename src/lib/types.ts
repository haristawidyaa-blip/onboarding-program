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
  tasks: ProgramTask[];
}

export interface ProgramDay {
  slug: string;
  dayNumber: number;
  title: string;
  emoji: string;
  intro: string;
  closingQuote?: string;
  sections: ProgramSection[];
  note?: string;
}
