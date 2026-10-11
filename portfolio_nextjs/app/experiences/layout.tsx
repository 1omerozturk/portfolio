import { createLocalizedPageMetadata } from "../i18n/metadata";
import type { ReactNode } from "react";

export async function generateMetadata() { return createLocalizedPageMetadata(
  "Deneyim",
  "Ömer Öztürk'ün profesyonel yazılım geliştirme deneyimi ve kariyer geçmişi.",
  "/experiences",
); }

export default function ExperiencesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
