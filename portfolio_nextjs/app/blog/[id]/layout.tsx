import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../../seo";
import { fetchPublicRecord } from "../../api/publicData";



type RouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { id } = await params;
  const path = `/blog/${encodeURIComponent(id)}`;

  try {
    const result = await fetchPublicRecord<Record<string, unknown>>(`/user/blogs/${encodeURIComponent(id)}`, { forbiddenAsNotFound: true });
    if (result.status === "not-found") {
      return { title: "Yazı bulunamadı", robots: { index: false, follow: false } };
    }
    if (result.status !== "ok") throw new Error("Metadata unavailable");
    const data = result.data;
    if (data.isPublished === false) {
      return { title: "Yazı bulunamadı", robots: { index: false, follow: false } };
    }
    if (typeof data !== "object" || data === null || !("title" in data)) {
      throw new Error("Blog metadata is incomplete");
    }

    const title = typeof data.title === "string" ? data.title.trim() : "";
    if (!title) throw new Error("Missing title");
    const description =
      "excerpt" in data
        ? String(data.excerpt)
        : "content" in data
          ? String(data.content).slice(0, 180)
          : "";
    const image =
      "featuredImage" in data && data.featuredImage
        ? String(data.featuredImage)
        : "/ozturkomer.webp";

    return createPageMetadata(
      title,
      description || `Ömer Öztürk'ün ${title} başlıklı yazısı.`,
      path,
      image,
    );
  } catch {
    return createPageMetadata(
      "Blog yazısı",
      "Yazılım, teknoloji ve kişisel gelişim üzerine yazılar.",
      path,
    );
  }
}

export default function BlogDetailLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}

