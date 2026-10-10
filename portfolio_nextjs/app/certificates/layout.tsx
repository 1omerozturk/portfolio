import { createPageMetadata } from "../seo";
import type { ReactNode } from "react";

export const metadata = createPageMetadata(
  "Sertifikalar",
  "Ömer Öztürk'ün yazılım ve teknoloji alanlarındaki sertifikaları.",
  "/certificates",
);

export default function CertificatesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
