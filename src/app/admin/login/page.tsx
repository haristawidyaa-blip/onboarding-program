import type { Metadata } from "next";
import { CmsLoginClient } from "./CmsLoginClient";

export const metadata: Metadata = { title: "Login CMS" };

export default function CmsLoginPage() {
  return <CmsLoginClient />;
}
