import { getLocale } from "../i18n/server";
import { localizedPath } from "../i18n/config";
import { localizeBlog, blogCategoryLabel } from "../i18n/blog";
import Link from "next/link";
import { BLOG_CATEGORY_STYLES as categoryStyles } from "../blogConstants";
import { FaComment } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { fetchPublicBlogPage } from "../api/publicData";

import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";
import ContentMark from "./ContentMark";



export default async function BlogsSection() {
  const locale = await getLocale();
  const en = locale === "en";
  const result = await fetchPublicBlogPage(1, 3);
  const blogs = result.blogs.map(blog => localizeBlog(blog, locale)).filter((blog) => blog && typeof blog._id === "string" && typeof blog.title === "string");

  return (
    <section className="surface-page px-4 py-12 sm:py-16" aria-label={en ? "Latest articles" : "Son yazılar"}>
      <div className="mx-auto max-w-6xl">
        <PageHeader title={en ? "Latest articles" : "Son yazılar"} level={2} icon={<FaComment />} />

        {blogs.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {blogs.map((blog) => (
              <Link href={localizedPath(`/blog/${encodeURIComponent(blog._id!)}`, locale)} key={blog._id} className="surface-card blog-card group overflow-hidden">
                
                <div className="flex flex-col p-5"><div className="mb-3"><ContentMark kind="blogs" image={blog.featuredImage} /></div>
                  <span className={`mb-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${categoryStyles[blog.category] || categoryStyles.diğer}`}>
                    {blogCategoryLabel(blog.category, locale)}
                  </span>
                  <h3 className="line-clamp-2 text-lg font-bold text-ink group-hover:text-brand">{blog.title}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-quiet">{blog.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-quiet">
                    <span>{blog.author || "Ömer Öztürk"}</span>
                    <span className="inline-flex items-center gap-1"><MdAccessTime aria-hidden="true" /> {blog.readingTime || 1} {en ? "min" : "dk"}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="surface-card p-6 text-center text-quiet" role="status">
            {result.status === "unavailable" ? (en ? "Articles could not be loaded." : "Yazılar şu anda yüklenemiyor.") : (en ? "No articles yet." : "Henüz yazı bulunmuyor.")}
          </p>
        )}

        {result.totalPages > 1 && <div className="mt-8"><SeeMore path="blog" /></div>}
      </div>
    </section>
  );
}



