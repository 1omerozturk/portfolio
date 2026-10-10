import { createPageMetadata } from "../seo";
import type { ReactNode } from "react";

export const metadata = createPageMetadata(
  "Deneyim",
  "Ömer Öztürk'ün profesyonel yazılım geliştirme deneyimi ve kariyer geçmişi.",
  "/experiences",
);

export default function ExperiencesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
