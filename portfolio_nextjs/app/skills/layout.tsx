import { createLocalizedPageMetadata } from "../i18n/metadata";
import type { ReactNode } from "react";

export async function generateMetadata() { return createLocalizedPageMetadata(
  "Yetenekler",
  "Ömer Öztürk'ün yazılım, web ve mobil geliştirme yetkinlikleri.",
  "/skills",
); }

export default function SkillsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
