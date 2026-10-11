import { normalizeBlogQuery } from "../blogQuery";
import BlogListing from "../components/BlogListing";
import { fetchPublicBlogPage } from "../api/publicData";
import type { Metadata } from "next";
import { createLocalizedPageMetadata } from "../i18n/metadata";
import { getLocale } from "../i18n/server";
import { blogCategoryLabel } from "../i18n/blog";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const locale = await getLocale();
  const en = locale === "en";
  const { page, category, search } = normalizeBlogQuery(await searchParams);
  const query = new URLSearchParams();
  if (page > 1) query.set("page", String(page));
  if (category) query.set("category", category);
  if (search) query.set("search", search);
  const suffix = query.toString();
  const title = search ? (en ? "Blog search results" : "Blog arama sonuçları") : category ? (en ? `${blogCategoryLabel(category, locale)} articles` : `${category} yazıları`) : "Blog";
  const result = page > 1 ? await fetchPublicBlogPage(page, 6, category || undefined, search || undefined) : null;
  const outsideRange = result?.status === "ok" && page > result.totalPages;
  return {
    ...await createLocalizedPageMetadata(`${title}${page > 1 ? ` — ${en ? "Page" : "Sayfa"} ${page}` : ""}`, en ? "Articles on software, technology and personal development." : "Yazılım, teknoloji ve kişisel gelişim üzerine yazılar.", `/blog${suffix ? `?${suffix}` : ""}`),
    ...(search || outsideRange ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function BlogsPage({ searchParams }: { searchParams: SearchParams }) {
  const { page, category, search } = normalizeBlogQuery(await searchParams);
  const result = await fetchPublicBlogPage(page, 6, category || undefined, search || undefined);
  const blogs = result.blogs.filter((blog) => blog && blog.isPublished !== false && typeof blog._id === "string" && blog._id.trim() && typeof blog.title === "string" && blog.title.trim());

  return (
    <BlogListing
      initialBlogs={blogs}
      initialTotalPages={result.totalPages}
      initialFailed={result.status === "unavailable"}
      initialPage={page}
      initialSearch={search}
      initialCategory={category}
    />
  );
}

