"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { localeFromPath, localizedPath } from "../i18n/config";
import { localizeBlog, blogCategoryLabel } from "../i18n/blog";
import { usePathname, useRouter } from "next/navigation";
import { BLOG_CATEGORY_STYLES as categoryStyles, BLOG_CATEGORIES as categories } from "../blogConstants";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { MdAccessTime, MdCategory } from "react-icons/md";
import type { Blog } from "../models/blogs";

import ContentMark from "./ContentMark";
import { BLOG_SEARCH_MAX_LENGTH, normalizeBlogQuery } from "../blogQuery";




function formatDate(value: string | undefined, en: boolean) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "—" : date.toLocaleDateString(en ? "en-GB" : "tr-TR", { timeZone: "Europe/Istanbul" });
}

type BlogListingProps = {
  initialBlogs: Blog[];
  initialTotalPages: number;
  initialFailed: boolean;
  initialPage: number;
  initialSearch: string;
  initialCategory: string;
};

export default function BlogListing({ initialBlogs, initialTotalPages, initialFailed, initialPage, initialSearch, initialCategory }: BlogListingProps) {
  const router = useRouter();
  const locale = localeFromPath(usePathname());
  const en = locale === "en";
  const blogPath = localizedPath("/blog", locale);
  const searchField = useRef<HTMLInputElement>(null);
  const [loading, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [observedSearch, setObservedSearch] = useState(initialSearch);
  const blogs = initialBlogs.map(blog => localizeBlog(blog, locale));
  const failed = initialFailed;
  const page = initialPage;
  const totalPages = initialTotalPages;
  const search = initialSearch;
  const category = initialCategory;

  if (observedSearch !== initialSearch) {
    setObservedSearch(initialSearch);
    // Preserve text entered while the previous search was still loading.
    const input = normalizeBlogQuery({ search: searchInput }).search;
    if (input === observedSearch || input === initialSearch) setSearchInput(initialSearch);
  }

  useEffect(() => {
    const value = normalizeBlogQuery({ search: searchInput }).search;
    if (value === initialSearch) return;
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams();
      if (initialCategory) params.set("category", initialCategory);
      if (value) params.set("search", value);
      const query = params.toString();
      startTransition(() => router.replace(blogPath + (query ? "?" + query : ""), { scroll: false }));
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput, initialSearch, initialCategory, router, blogPath]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const value = normalizeBlogQuery({ search: searchInput }).search;
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (value) params.set("search", value);
    const query = params.toString();
    startTransition(() => router.replace(blogPath + (query ? "?" + query : ""), { scroll: false }));
  };

  const navigateFilter = (nextPage: number, nextCategory: string) => {
    const params = new URLSearchParams();
    if (nextPage > 1) params.set("page", String(nextPage));
    if (nextCategory) params.set("category", nextCategory);
    if (search) params.set("search", search);
    const query = params.toString();
    startTransition(() => router.push(blogPath + (query ? "?" + query : ""), { scroll: false }));
  };

  const pageUrl = (nextPage: number) => {
    const params = new URLSearchParams();
    if (nextPage > 1) params.set("page", String(nextPage));
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    const query = params.toString();
    return `${blogPath}${query ? `?${query}` : ""}`;
  };

  return (
    <main className="surface-page min-h-screen">
      <header className="blog-hero py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-brand">{en ? "Articles and ideas" : "Yazılar ve fikirler"}</p>
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-lg text-quiet">{en ? "Thoughts, technical notes and things I have learned." : "Düşünceler, teknik notlar ve öğrendiklerim."}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <section className="mb-9" aria-label={en ? "Search and filter articles" : "Yazı ara ve filtrele"}>
          <form onSubmit={handleSearch} className="mb-5 flex gap-2">
            <div className="relative flex-1">
              <input
                ref={searchField}
                type="search"
                maxLength={BLOG_SEARCH_MAX_LENGTH}
                placeholder={en ? "Search articles…" : "Yazılarda ara…"}
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                className="form-field pr-11"
                aria-label={en ? "Search articles" : "Yazılarda ara"}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    searchField.current?.focus();
                  }}
                  className="search-clear"
                  aria-label={en ? "Clear search" : "Aramayı temizle"}
                >
                  <AiOutlineClose aria-hidden="true" />
                </button>
              )}
            </div>
            <button type="submit" className="button-primary" aria-label={en ? "Search" : "Ara"}>
              <AiOutlineSearch aria-hidden="true" />
            </button>
          </form>

          <div className="flex flex-wrap gap-2" aria-label={en ? "Article categories" : "Yazı kategorileri"}>
            <button
              type="button"
              aria-pressed={!category}
              onClick={() => navigateFilter(1, "")}
              className={`category-filter ${!category ? "category-filter--active" : ""}`}
            >{en ? "All" : "Tümü"}</button>
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={category === item}
                onClick={() => navigateFilter(1, category === item ? "" : item)}
                className={`category-filter ${category === item ? "category-filter--active" : ""}`}
              >{blogCategoryLabel(item, locale)}</button>
            ))}
          </div>
        </section>

        {loading ? (
          <div className="surface-card flex min-h-64 items-center justify-center" role="status" aria-label={en ? "Loading articles" : "Yazılar yükleniyor"}><span className="loading-spinner" /></div>
        ) : blogs.length === 0 ? (
          <div className="surface-card p-10 text-center" role="status">
            <p className="text-lg font-semibold text-ink">{failed ? (en ? "Articles could not be loaded." : "Yazılar şu anda yüklenemiyor.") : page > totalPages ? (en ? "No articles on this page." : "Bu sayfada yazı yok.") : (en ? "No articles found." : "Yazı bulunamadı.")}</p>
            {!failed && page > 1 && (
              <Link className="button-secondary mt-4" href={pageUrl(1)} prefetch={false}>{en ? "Back to first page" : "İlk sayfaya dön"}</Link>
            )}
            {failed && <>
              <p className="mt-2 text-quiet">{en ? "Please try again later." : "Lütfen biraz sonra yeniden deneyin."}</p>
              <button type="button" className="button-secondary mt-4" onClick={() => startTransition(() => router.refresh())}>{en ? "Try again" : "Yeniden dene"}</button>
            </>}
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link key={blog._id ?? `${blog.title}-${blog.createdAt}`} href={localizedPath(`/blog/${encodeURIComponent(blog._id ?? "")}`, locale)} className="surface-card blog-card group overflow-hidden">
                  
                  <div className="flex flex-col p-5"><div className="mb-3"><ContentMark kind="blogs" image={blog.featuredImage} /></div>
                    <span className={`mb-3 inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${categoryStyles[blog.category] || categoryStyles.diğer}`}>
                      <MdCategory aria-hidden="true" /> {blogCategoryLabel(blog.category, locale)}
                    </span>
                    <h2 className="line-clamp-2 text-xl font-bold text-ink group-hover:text-brand">{blog.title}</h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-quiet">{blog.excerpt}</p>
                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4 text-xs text-quiet">
                      <div><p className="font-semibold text-ink">{blog.author || "Ömer Öztürk"}</p><time dateTime={blog.createdAt}>{formatDate(blog.createdAt, en)}</time></div>
                      <span className="inline-flex items-center gap-1"><MdAccessTime aria-hidden="true" /> {blog.readingTime || 1} {en ? "min" : "dk"}</span>
                    </div>
                    {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label={en ? "Tags" : "Etiketler"}>
                        {blog.tags.slice(0, 3).map((tag) => <li className="content-tag" key={tag}>#{tag}</li>)}
                      </ul>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-3" aria-label={en ? "Article pages" : "Yazı sayfaları"}>
                {page > 1 ? <Link className="button-secondary" href={pageUrl(page - 1)} prefetch={false}>{en ? "Previous" : "Önceki"}</Link> : <span className="button-secondary opacity-50" aria-disabled="true">{en ? "Previous" : "Önceki"}</span>}
                <span className="text-sm font-semibold text-ink" aria-live="polite">{en ? "Page" : "Sayfa"} {page} / {totalPages}</span>
                {page < totalPages ? <Link className="button-secondary" href={pageUrl(page + 1)} prefetch={false}>{en ? "Next" : "Sonraki"}</Link> : <span className="button-secondary opacity-50" aria-disabled="true">{en ? "Next" : "Sonraki"}</span>}
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  );
}



