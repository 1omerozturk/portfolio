import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../../seo";
import { fetchPublicRecord } from "../../api/publicData";



type RouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { id } = await params;
  const path = `/projects/${encodeURIComponent(id)}`;

  try {
    const result = await fetchPublicRecord<Record<string, unknown>>(`/user/projects/${encodeURIComponent(id)}`);
    if (result.status !== "ok") throw new Error("Metadata unavailable");
    const data = result.data;
    if (typeof data !== "object" || data === null || !("title" in data)) {
      throw new Error("Project metadata is incomplete");
    }

    const title = typeof data.title === "string" ? data.title.trim() : "";
    if (!title) throw new Error("Missing title");
    const description = "description" in data ? String(data.description) : "";
    const image =
      "images" in data && Array.isArray(data.images) && data.images[0]
        ? String(data.images[0])
        : "/ozturkomer.webp";

    return createPageMetadata(
      title,
      description.slice(0, 180) || `Ömer Öztürk'ün ${title} projesini inceleyin.`,
      path,
      image,
    );
  } catch {
    return createPageMetadata(
      "Proje detayı",
      "Ömer Öztürk'ün yazılım projeleri ve proje detayları.",
      path,
    );
  }
}

export default function ProjectDetailLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

