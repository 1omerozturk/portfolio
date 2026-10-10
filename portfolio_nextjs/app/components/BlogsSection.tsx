import Link from "next/link";
import { BLOG_CATEGORY_STYLES as categoryStyles } from "../blogConstants";
import { FaComment } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { fetchPublicBlogPage } from "../api/publicData";
import { isSafeHttpUrl } from "../api/urlSafety";
import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";
import PublicImage from "./PublicImage";



export default async function BlogsSection() {
  const result = await fetchPublicBlogPage(1, 3);
  const blogs = result.blogs.filter((blog) => blog && typeof blog._id === "string" && typeof blog.title === "string");

  return (
    <section className="surface-page px-4 py-12 sm:py-16" aria-label="Son yazılar">
      <div className="mx-auto max-w-6xl">
        <PageHeader title="Son yazılar" level={2} icon={<FaComment />} />

        {blogs.length ? (
          <div className="grid gap-5 md:grid-cols-3">
            {blogs.map((blog) => (
              <Link href={`/blog/${encodeURIComponent(blog._id!)}`} key={blog._id} className="surface-card blog-card group overflow-hidden">
                {isSafeHttpUrl(blog.featuredImage) ? (
                  <PublicImage src={blog.featuredImage} alt={blog.title} width={640} height={360} sizes="(max-width: 767px) 100vw, 33vw" className="blog-card__image" />
                ) : (
                  <div className="blog-card__image-placeholder" aria-hidden="true">Aa</div>
                )}
                <div className="flex h-full flex-col p-5">
                  <span className={`mb-3 inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${categoryStyles[blog.category] || categoryStyles.diğer}`}>
                    {blog.category || "diğer"}
                  </span>
                  <h3 className="line-clamp-2 text-lg font-bold text-ink group-hover:text-brand">{blog.title}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm text-quiet">{blog.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-4 text-xs text-quiet">
                    <span>{blog.author || "Ömer Öztürk"}</span>
                    <span className="inline-flex items-center gap-1"><MdAccessTime aria-hidden="true" /> {blog.readingTime || 1} dk</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="surface-card p-6 text-center text-quiet" role="status">
            {result.status === "unavailable" ? "Yazılar şu anda yüklenemiyor." : "Henüz yazı bulunmuyor."}
          </p>
        )}

        {result.totalPages > 1 && <div className="mt-8"><SeeMore path="blog" /></div>}
      </div>
    </section>
  );
}

