import type { Metadata } from "next";
import { Hari3Client } from "./Hari3Client";

export const metadata: Metadata = {
  title: "Hari 3: Life at CISDI",
};

export default function Hari3Page() {
  return <Hari3Client />;
}
