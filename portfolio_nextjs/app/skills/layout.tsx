import { createPageMetadata } from "../seo";
import type { ReactNode } from "react";

export const metadata = createPageMetadata(
  "Yetenekler",
  "Ömer Öztürk'ün yazılım, web ve mobil geliştirme yetkinlikleri.",
  "/skills",
);

export default function SkillsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
