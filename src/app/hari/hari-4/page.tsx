import type { Metadata } from "next";
import { Hari4Client } from "./Hari4Client";

export const metadata: Metadata = {
  title: "Hari 4: Misi Mengenal Kantor & Rekan Kerja",
};

export default function Hari4Page() {
  return <Hari4Client />;
}
