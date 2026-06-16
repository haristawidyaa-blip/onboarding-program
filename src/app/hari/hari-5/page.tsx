import type { Metadata } from "next";
import { Hari5Client } from "./Hari5Client";

export const metadata: Metadata = {
  title: "Hari 5: Sesi Penyelarasan Penutup",
};

export default function Hari5Page() {
  return <Hari5Client />;
}
