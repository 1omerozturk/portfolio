import { createLocalizedPageMetadata } from "../i18n/metadata";
import type { ReactNode } from "react";

export async function generateMetadata() { return createLocalizedPageMetadata(
  "Projeler",
  "Ömer Öztürk'ün geliştirdiği web, mobil ve yazılım projeleri.",
  "/projects",
); }

export default function ProjectsLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
