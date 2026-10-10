import { createPageMetadata } from "../seo";
import type { ReactNode } from "react";

export const metadata = createPageMetadata(
  "Blog",
  "Yazılım, teknoloji ve kişisel gelişim üzerine Ömer Öztürk'ün yazıları.",
  "/blog",
);

export default function BlogLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
