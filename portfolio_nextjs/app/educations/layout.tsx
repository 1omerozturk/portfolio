import { createPageMetadata } from "../seo";
import type { ReactNode } from "react";

export const metadata = createPageMetadata(
  "Eğitim",
  "Ömer Öztürk'ün eğitim geçmişi ve akademik bilgileri.",
  "/educations",
);

export default function EducationsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
