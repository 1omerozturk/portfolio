import { createLocalizedPageMetadata } from "../i18n/metadata";
import type { ReactNode } from "react";

export async function generateMetadata() { return createLocalizedPageMetadata(
  "Hakkımda",
  "Ömer Öztürk'ün yazılım mühendisliği deneyimi, uzmanlık alanları ve özgeçmişi.",
  "/about",
); }

export default function AboutLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
