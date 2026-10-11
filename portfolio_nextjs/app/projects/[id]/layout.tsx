import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createLocalizedPageMetadata } from "../../i18n/metadata";
import { getLocale } from "../../i18n/server";
import { fetchPublicProjectRecord } from "../../api/publicData";



type RouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { id } = await params;
  const en = (await getLocale()) === "en";
  const path = `/projects/${encodeURIComponent(id)}`;

  try {
    const result = await fetchPublicProjectRecord(id);
    if (result.status === "not-found") {
      return { title: en ? "Project not found" : "Proje bulunamadı", robots: { index: false, follow: false } };
    }
    if (result.status !== "ok") throw new Error("Metadata unavailable");
    const data = result.data;
    if (typeof data !== "object" || data === null || !("title" in data)) {
      throw new Error("Project metadata is incomplete");
    }

    const title = (en && data.titleEn ? data.titleEn : data.title).trim();
    if (!title) throw new Error("Missing title");
    const description = en && data.descriptionEn ? data.descriptionEn : data.description;
    const image =
      "images" in data && Array.isArray(data.images) && data.images[0]
        ? String(data.images[0])
        : "/ozturkomer.webp";

    return createLocalizedPageMetadata(
      title,
      description.slice(0, 180) || (en ? `Explore ${title}, a project by Ömer Öztürk.` : `Ömer Öztürk'ün ${title} projesini inceleyin.`),
      path,
      image,
    );
  } catch {
    return createLocalizedPageMetadata(
      en ? "Project details" : "Proje detayı",
      en ? "Software projects by Ömer Öztürk and their details." : "Ömer Öztürk'ün yazılım projeleri ve proje detayları.",
      path,
    );
  }
}

export default function ProjectDetailLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}


