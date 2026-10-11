import { createLocalizedPageMetadata } from "../i18n/metadata";
import type { ReactNode } from "react";

export async function generateMetadata() { return createLocalizedPageMetadata(
  "İçerikler",
  "Ömer Öztürk'ün paylaştığı teknik içerikler ve kaynaklar.",
  "/contents",
); }

export default function ContentsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
