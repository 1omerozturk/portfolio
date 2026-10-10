import { createPageMetadata } from "../seo";
import type { ReactNode } from "react";

export const metadata = createPageMetadata(
  "İçerikler",
  "Ömer Öztürk'ün paylaştığı teknik içerikler ve kaynaklar.",
  "/contents",
);

export default function ContentsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
