import { createLocalizedPageMetadata } from "../i18n/metadata";
import type { ReactNode } from "react";

export async function generateMetadata() { return createLocalizedPageMetadata(
  "Eğitim",
  "Ömer Öztürk'ün eğitim geçmişi ve akademik bilgileri.",
  "/educations",
); }

export default function EducationsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
