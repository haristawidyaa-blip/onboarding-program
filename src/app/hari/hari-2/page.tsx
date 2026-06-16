import type { Metadata } from "next";
import { Hari2Client } from "./Hari2Client";

export const metadata: Metadata = {
  title: "Hari 2: Ekosistem Kerja, Kebijakan & Pedoman CISDI",
};

export default function Hari2Page() {
  return <Hari2Client />;
}
