import BlogListing from "../components/BlogListing";
import { fetchPublicBlogPage } from "../api/publicData";

const categories = new Set(["yazı", "düşünce", "özlü söz", "teknik", "diğer"]);
type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BlogsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const requestedPage = Number.parseInt(first(params.page) || "1", 10);
  const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1;
  const requestedCategory = first(params.category) || "";
  const category = categories.has(requestedCategory) ? requestedCategory : "";
  const requestedSearch = (first(params.search) || "").trim();
  const search = requestedSearch.length >= 2 ? requestedSearch : "";
  const result = await fetchPublicBlogPage(page, 6, category || undefined, search || undefined);
  const blogs = result.blogs.filter((blog) => blog && typeof blog._id === "string" && typeof blog.title === "string");

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
