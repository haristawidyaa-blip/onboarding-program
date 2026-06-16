import rawSopData from "@/content/sop.json";

export type SopItem = {
  id: string;
  name: string;
  type: "SOP" | "Pedoman Kerja";
  division: string;
  status: "Authorized";
  pdfUrl: string;
};

export const sopData: SopItem[] = rawSopData as SopItem[];

export const sopDivisions = [...new Set(sopData.map((s) => s.division))].sort();
