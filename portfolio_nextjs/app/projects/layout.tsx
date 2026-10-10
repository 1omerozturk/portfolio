import { createPageMetadata } from "../seo";
import type { ReactNode } from "react";

export const metadata = createPageMetadata(
  "Projeler",
  "Ömer Öztürk'ün geliştirdiği web, mobil ve yazılım projeleri.",
  "/projects",
);

export default function ProjectsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
