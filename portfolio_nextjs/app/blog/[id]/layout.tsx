import { getLocale } from "../../i18n/server";
import { localizeBlog } from "../../i18n/blog";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createLocalizedPageMetadata } from "../../i18n/metadata";
import { fetchPublicBlogRecord } from "../../api/publicData";



type RouteProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  const en = locale === "en";
  const path = `/blog/${encodeURIComponent(id)}`;

  try {
    const result = await fetchPublicBlogRecord(id);
    if (result.status === "not-found") {
      return { title: en ? "Article not found" : "Yazı bulunamadı", robots: { index: false, follow: false } };
    }
    if (result.status !== "ok") throw new Error("Metadata unavailable");
    const data = localizeBlog(result.data, locale);
    if (data.isPublished === false) {
      return { title: en ? "Article not found" : "Yazı bulunamadı", robots: { index: false, follow: false } };
    }
    if (typeof data !== "object" || data === null || !("title" in data)) {
      throw new Error("Blog metadata is incomplete");
    }

    const title = typeof data.title === "string" ? data.title.trim() : "";
    if (!title) throw new Error("Missing title");
    const description = data.excerpt.trim() || data.content.slice(0, 180);
    const image =
      "featuredImage" in data && data.featuredImage
        ? String(data.featuredImage)
        : "/ozturkomer.webp";

    return createLocalizedPageMetadata(
      title,
      description || (en ? `${title}, an article by Ömer Öztürk.` : `Ömer Öztürk'ün ${title} başlıklı yazısı.`),
      path,
      image,
    );
  } catch {
    return createLocalizedPageMetadata(
      en ? "Blog article" : "Blog yazısı",
      en ? "Articles on software, technology and personal development." : "Yazılım, teknoloji ve kişisel gelişim üzerine yazılar.",
      path,
    );
  }
}

export default function BlogDetailLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}


