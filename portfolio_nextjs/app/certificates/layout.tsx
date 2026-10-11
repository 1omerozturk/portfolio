import { createLocalizedPageMetadata } from "../i18n/metadata";
import type { ReactNode } from "react";

export async function generateMetadata() { return createLocalizedPageMetadata(
  "Sertifikalar",
  "Ömer Öztürk'ün yazılım ve teknoloji alanlarındaki sertifikaları.",
  "/certificates",
); }

export default function CertificatesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
