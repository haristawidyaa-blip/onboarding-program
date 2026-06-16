import { GraduationCap, BookOpen, FileText, type LucideIcon } from "lucide-react";
import { programDays, totalTaskCount } from "./data";
import { learningMaterials } from "./learningSpace";
import { sopData } from "./sopData";

export interface Course {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  meta: string;
  kind: "program" | "library";
}

export const courses: Course[] = [
  {
    id: "onboarding",
    title: "Program Orientasi Karyawan Baru",
    description:
      "Perjalanan onboarding terstruktur 5 hari untuk mengenal visi, misi, nilai-nilai, dan ekosistem kerja CISDI.",
    href: "/program/onboarding",
    icon: GraduationCap,
    meta: `${programDays.length} Hari • ${totalTaskCount} Task`,
    kind: "program",
  },
  {
    id: "learning-space",
    title: "Learning Space",
    description:
      "Kumpulan materi belajar mandiri di luar onboarding — kebijakan kesehatan, pengembangan diri, keuangan, dan lainnya.",
    href: "/belajar",
    icon: BookOpen,
    meta: `${learningMaterials.length} Materi`,
    kind: "library",
  },
  {
    id: "sop",
    title: "SOP & Pedoman Kerja",
    description:
      "Seluruh SOP dan pedoman kerja CISDI yang berlaku — dari keuangan, HR, komunikasi, hingga kebijakan etika organisasi.",
    href: "/sop",
    icon: FileText,
    meta: `${sopData.length} Dokumen`,
    kind: "library",
  },
];
