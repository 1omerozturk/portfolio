import { BLOG_CATEGORIES } from "../blogConstants";
import BlogListing from "../components/BlogListing";
import { fetchPublicBlogPage } from "../api/publicData";
import type { Metadata } from "next";
import { createPageMetadata } from "../seo";

const categories = new Set(BLOG_CATEGORIES);
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function parseQuery(params: Awaited<SearchParams>) {
  const requestedPage = Number.parseInt(first(params.page) || "1", 10);
  const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1;
  const requestedCategory = first(params.category) || "";
  const category = categories.has(requestedCategory) ? requestedCategory : "";
  const requestedSearch = (first(params.search) || "").trim();
  const search = requestedSearch.length >= 2 ? requestedSearch : "";
  return { page, category, search };
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { page, category, search } = parseQuery(await searchParams);
  const query = new URLSearchParams();
  if (page > 1) query.set("page", String(page));
  if (category) query.set("category", category);
  if (search) query.set("search", search);
  const suffix = query.toString();
  const title = search ? "Blog arama sonuçları" : category ? `${category} yazıları` : "Blog";
  return {
    ...createPageMetadata(`${title}${page > 1 ? ` — Sayfa ${page}` : ""}`, "Yazılım, teknoloji ve kişisel gelişim üzerine yazılar.", `/blog${suffix ? `?${suffix}` : ""}`),
    ...(search ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function BlogsPage({ searchParams }: { searchParams: SearchParams }) {
  const { page, category, search } = parseQuery(await searchParams);
  const result = await fetchPublicBlogPage(page, 6, category || undefined, search || undefined);
  const blogs = result.blogs.filter((blog) => blog && blog.isPublished !== false && typeof blog._id === "string" && blog._id.trim() && typeof blog.title === "string" && blog.title.trim());

  return (
    <BlogListing
      key={JSON.stringify([page, category, search])}
      initialBlogs={blogs}
      initialTotalPages={result.totalPages}
      initialFailed={result.status === "unavailable"}
      initialPage={page}
      initialSearch={search}
      initialCategory={category}
    />
  );
}

