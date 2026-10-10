import { createPageMetadata } from "../seo";
import type { ReactNode } from "react";

export const metadata = createPageMetadata(
  "Hakkımda",
  "Ömer Öztürk'ün yazılım mühendisliği deneyimi, uzmanlık alanları ve özgeçmişi.",
  "/about",
);

export default function AboutLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
