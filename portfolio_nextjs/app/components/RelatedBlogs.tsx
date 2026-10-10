import Link from "next/link";
import type { Blog } from "../models/blogs";
import { fetchPublicCollection } from "../api/publicData";
import { isSafeHttpUrl } from "../api/urlSafety";

const categoryStyles: Record<string, string> = {
  yazı: "blog-category--blue",
  düşünce: "blog-category--violet",
  "özlü söz": "blog-category--rose",
  teknik: "blog-category--green",
  diğer: "blog-category--gray",
};

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul" });
}

export default async function RelatedBlogs({ category, currentId }: { category: string; currentId: string }) {
  const path = `/user/blogs/category/${encodeURIComponent(category)}?page=1&limit=4`;
  const blogs = (await fetchPublicCollection<Blog>(path))
    .filter((item) => item && item.isPublished !== false && item._id && item._id !== currentId && typeof item.title === "string" && item.title.trim())
    .slice(0, 3);

  if (!blogs.length) return null;

  return (
    <section className="mt-12" aria-labelledby="related-blogs-title">
      <h2 id="related-blogs-title" className="mb-8 text-3xl font-bold text-ink">İlgili yazılar</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {blogs.map((blog) => (
          <Link key={blog._id} href={`/blog/${encodeURIComponent(blog._id ?? "")}`} className="surface-card related-blog-card group overflow-hidden">
            {isSafeHttpUrl(blog.featuredImage) && (
              <div className="blog-card__image-wrap">
                <img src={blog.featuredImage} alt={blog.title} width="640" height="360" loading="lazy" decoding="async" className="related-blog-card__image h-full w-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <span className={`content-tag mb-2 ${categoryStyles[blog.category] || categoryStyles.diğer}`}>{blog.category}</span>
              <h3 className="line-clamp-2 font-bold text-ink group-hover:text-brand">{blog.title}</h3>
              <time className="mt-2 block text-sm text-quiet" dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
