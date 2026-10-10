"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { BLOG_CATEGORY_STYLES as categoryStyles, BLOG_CATEGORIES as categories } from "../blogConstants";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { MdAccessTime, MdCategory } from "react-icons/md";
import type { Blog } from "../models/blogs";
import { isSafeHttpUrl } from "../api/urlSafety";
import { BlogService } from "../service/blogService";
import PublicImage from "./PublicImage";




function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? "—" : date.toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul" });
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
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [failed, setFailed] = useState(initialFailed);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [search, setSearch] = useState(initialSearch);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const queryKey = JSON.stringify([page, category, search]);
  const [resolvedQuery, setResolvedQuery] = useState(queryKey);
  const loading = resolvedQuery !== queryKey;
  const previousSearchInput = useRef(initialSearch);

  useEffect(() => {
    if (searchInput === previousSearchInput.current) return;
    previousSearchInput.current = searchInput;
    const value = searchInput.trim();
    const timer = window.setTimeout(() => {
      setSearch(value.length >= 2 ? value : "");
      setPage(1);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    if (nextUrl !== currentUrl) window.history.replaceState(window.history.state, "", nextUrl);
  }, [page, category, search]);

  useEffect(() => {
    const syncFromLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const nextPage = Number.parseInt(params.get("page") || "1", 10);
      const nextCategory = params.get("category") || "";
      const nextSearch = (params.get("search") || "").trim();
      setPage(Number.isFinite(nextPage) ? Math.max(1, nextPage) : 1);
      setCategory(categories.includes(nextCategory) ? nextCategory : "");
      setSearch(nextSearch.length >= 2 ? nextSearch : "");
      setSearchInput(nextSearch.length >= 2 ? nextSearch : "");
      previousSearchInput.current = nextSearch.length >= 2 ? nextSearch : "";
    };
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  useEffect(() => {
    if (resolvedQuery === queryKey) return;
    let active = true;
    const controller = new AbortController();

    BlogService.getBlogs(page, 6, category || undefined, search || undefined, controller.signal)
      .then((result) => {
        if (!active) return;
        setBlogs((result?.blogs ?? []).filter((blog) => blog && blog.isPublished !== false && typeof blog._id === "string" && blog._id.trim().length > 0 && typeof blog.title === "string" && blog.title.trim().length > 0));
        const pages = Number(result?.pages);
        setTotalPages(Number.isFinite(pages) ? Math.max(1, Math.floor(pages)) : 1);
        setFailed(!result);
      })
      .catch(() => {
        if (active) {
          setBlogs([]);
          setFailed(true);
        }
      })
      .finally(() => {
        if (active) setResolvedQuery(queryKey);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [page, category, search, queryKey, resolvedQuery]);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const value = searchInput.trim();
    setSearch(value.length >= 2 ? value : "");
    setPage(1);
  };

  const navigateFilter = (nextPage: number, nextCategory: string) => {
    const params = new URLSearchParams();
    if (nextPage > 1) params.set("page", String(nextPage));
    if (nextCategory) params.set("category", nextCategory);
    if (search) params.set("search", search);
    const query = params.toString();
    const nextUrl = `${window.location.pathname}${query ? `?${query}` : ""}`;
    if (nextUrl !== `${window.location.pathname}${window.location.search}`) {
      window.history.pushState(window.history.state, "", nextUrl);
    }
    setPage(nextPage);
    setCategory(nextCategory);
  };

  const pageUrl = (nextPage: number) => {
    const params = new URLSearchParams();
    if (nextPage > 1) params.set("page", String(nextPage));
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    const query = params.toString();
    return `/blog${query ? `?${query}` : ""}`;
  };

  return (
    <main className="surface-page min-h-screen">
      <header className="blog-hero py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-brand">Yazılar ve fikirler</p>
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-lg text-quiet">Düşünceler, teknik notlar ve öğrendiklerim.</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <section className="mb-9" aria-label="Yazı ara ve filtrele">
          <form onSubmit={handleSearch} className="mb-5 flex gap-2">
            <div className="relative flex-1">
              <input
                type="search"
                placeholder="Yazılarda ara…"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                className="form-field pr-11"
                aria-label="Yazılarda ara"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="search-clear"
                  aria-label="Aramayı temizle"
                >
                  <AiOutlineClose aria-hidden="true" />
                </button>
              )}
            </div>
            <button type="submit" className="button-primary" aria-label="Ara">
              <AiOutlineSearch aria-hidden="true" />
            </button>
          </form>

          <div className="flex flex-wrap gap-2" aria-label="Yazı kategorileri">
            <button
              type="button"
              aria-pressed={!category}
              onClick={() => navigateFilter(1, "")}
              className={`category-filter ${!category ? "category-filter--active" : ""}`}
            >Tümü</button>
            {categories.map((item) => (
              <button
                type="button"
                key={item}
                aria-pressed={category === item}
                onClick={() => navigateFilter(1, category === item ? "" : item)}
                className={`category-filter ${category === item ? "category-filter--active" : ""}`}
              >{item}</button>
            ))}
          </div>
        </section>

        {loading ? (
          <div className="surface-card flex min-h-64 items-center justify-center" role="status" aria-label="Yazılar yükleniyor"><span className="loading-spinner" /></div>
        ) : blogs.length === 0 ? (
          <div className="surface-card p-10 text-center" role="status">
            <p className="text-lg font-semibold text-ink">{failed ? "Yazılar şu anda yüklenemiyor." : "Yazı bulunamadı."}</p>
            {failed && <>
              <p className="mt-2 text-quiet">Lütfen biraz sonra yeniden deneyin.</p>
              <button type="button" className="button-secondary mt-4" onClick={() => setResolvedQuery("")}>Yeniden dene</button>
            </>}
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link key={blog._id ?? `${blog.title}-${blog.createdAt}`} href={`/blog/${encodeURIComponent(blog._id ?? "")}`} className="surface-card blog-card group overflow-hidden">
                  {isSafeHttpUrl(blog.featuredImage) && (
                    <PublicImage
                      src={blog.featuredImage}
                      alt={blog.title}
                      width={640}
                      height={360}
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="blog-card__image"
                    />
                  )}
                  <div className="flex h-full flex-col p-5">
                    <span className={`mb-3 inline-flex w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${categoryStyles[blog.category] || categoryStyles.diğer}`}>
                      <MdCategory aria-hidden="true" /> {blog.category}
                    </span>
                    <h2 className="line-clamp-2 text-xl font-bold text-ink group-hover:text-brand">{blog.title}</h2>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-quiet">{blog.excerpt}</p>
                    <div className="mt-5 flex items-end justify-between gap-3 border-t border-line pt-4 text-xs text-quiet">
                      <div><p className="font-semibold text-ink">{blog.author || "Ömer Öztürk"}</p><time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time></div>
                      <span className="inline-flex items-center gap-1"><MdAccessTime aria-hidden="true" /> {blog.readingTime || 1} dk</span>
                    </div>
                    {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2" aria-label="Etiketler">
                        {blog.tags.slice(0, 3).map((tag) => <li className="content-tag" key={tag}>#{tag}</li>)}
                      </ul>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-10 flex items-center justify-center gap-3" aria-label="Yazı sayfaları">
                {page > 1 ? <Link className="button-secondary" href={pageUrl(page - 1)} prefetch={false}>Önceki</Link> : <span className="button-secondary opacity-50" aria-disabled="true">Önceki</span>}
                <span className="text-sm font-semibold text-ink" aria-live="polite">Sayfa {page} / {totalPages}</span>
                {page < totalPages ? <Link className="button-secondary" href={pageUrl(page + 1)} prefetch={false}>Sonraki</Link> : <span className="button-secondary opacity-50" aria-disabled="true">Sonraki</span>}
              </nav>
            )}
          </>
        )}
      </div>
    </main>
  );
}

