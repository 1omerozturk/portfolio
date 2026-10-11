import { createLocalizedPageMetadata } from "../i18n/metadata";
import type { ReactNode } from "react";

export async function generateMetadata() { return createLocalizedPageMetadata(
  "Blog",
  "Yazılım, teknoloji ve kişisel gelişim üzerine Ömer Öztürk'ün yazıları.",
  "/blog",
); }

export default function BlogLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
