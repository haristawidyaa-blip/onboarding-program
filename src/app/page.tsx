import type { Metadata } from "next";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = { title: "Beranda" };

export default function Home() {
  return <HomeClient />;
}
