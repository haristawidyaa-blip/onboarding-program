import type { Metadata } from "next";
import { Hari1Client } from "./Hari1Client";

export const metadata: Metadata = {
  title: "Hari 1: Mengenal CISDI yang Sehat, Adil, Setara",
};

export default function Hari1Page() {
  return <Hari1Client />;
}
