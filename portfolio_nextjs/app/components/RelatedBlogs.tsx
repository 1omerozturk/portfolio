import { getLocale } from "../i18n/server";
import { localizedPath } from "../i18n/config";
import { localizeBlog, blogCategoryLabel } from "../i18n/blog";
import Link from "next/link";
import { BLOG_CATEGORY_STYLES as categoryStyles } from "../blogConstants";

import { fetchPublicCollection } from "../api/publicData";
import { isSafeHttpUrl } from "../api/urlSafety";
import PublicImage from "./PublicImage";
import { normalizeBlogs } from "../api/blogPayload";



function formatDate(value: string | undefined, en: boolean) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString(en ? "en-GB" : "tr-TR", { timeZone: "Europe/Istanbul" });
}

export default async function RelatedBlogs({ category, currentId }: { category: string; currentId: string }) {
  const locale = await getLocale();
  const en = locale === "en";
  const path = `/user/blogs/category/${encodeURIComponent(category)}?page=1&limit=4`;
  const blogs = normalizeBlogs(await fetchPublicCollection(path))
    .filter((item) => item && item.isPublished !== false && item._id && item._id !== currentId && typeof item.title === "string" && item.title.trim())
    .slice(0, 3).map(blog => localizeBlog(blog, locale));

  if (!blogs.length) return null;

  return (
    <section className="mt-12" aria-labelledby="related-blogs-title">
      <h2 id="related-blogs-title" className="mb-8 text-3xl font-bold text-ink">{en ? "Related articles" : "İlgili yazılar"}</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {blogs.map((blog) => (
          <Link key={blog._id} href={localizedPath(`/blog/${encodeURIComponent(blog._id ?? "")}`, locale)} className="surface-card related-blog-card group overflow-hidden">
            {isSafeHttpUrl(blog.featuredImage) && (
              <div className="blog-card__image-wrap">
                <PublicImage src={blog.featuredImage} alt={blog.title} width={640} height={360} sizes="(max-width: 767px) 100vw, 33vw" className="related-blog-card__image h-full w-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <span className={`content-tag mb-2 ${categoryStyles[blog.category] || categoryStyles.diğer}`}>{blogCategoryLabel(blog.category, locale)}</span>
              <h3 className="line-clamp-2 font-bold text-ink group-hover:text-brand">{blog.title}</h3>
              <time className="mt-2 block text-sm text-quiet" dateTime={blog.createdAt}>{formatDate(blog.createdAt, en)}</time>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}



