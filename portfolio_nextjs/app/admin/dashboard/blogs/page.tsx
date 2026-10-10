"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BLOG_CATEGORIES } from "../../../blogConstants";
import type { BlogResponse } from "../../../models/blogs";
import { BlogAdminService } from "../../service/blogAdminService";

export default function BlogDashboard() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [attempt, setAttempt] = useState(0);
  const key = JSON.stringify([page, search, category, status, attempt]);
  const [result, setResult] = useState<{ key: string; data: BlogResponse | null } | null>(null);
  const [deleting, setDeleting] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    const timer = setTimeout(() => {
      BlogAdminService.getBlogs(page, 10, category || undefined, search || undefined, status || undefined).then(data => { if (active) setResult({ key, data: data ?? null }); }).catch(() => { if (active) setResult({ key, data: null }); });
    }, search ? 300 : 0);
    return () => { active = false; clearTimeout(timer); };
  }, [page, search, category, status, key]);
  const loading = !result || result.key !== key;
  const data = loading ? null : result.data;
  async function remove(id: string) {
    if (deleting || !confirm("Bu blogu silmek istediğinize emin misiniz?")) return;
    setDeleting(id); setError("");
    try {
      if (await BlogAdminService.deleteBlog(id)) {
        if (data?.blogs.length === 1 && page > 1) setPage(value => value - 1);
        else setAttempt(value => value + 1);
      } else setError("Blog silinemedi.");
    } catch { setError("Blog silinemedi."); }
    finally { setDeleting(""); }
  }
  return <section><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-bold">Blog yönetimi</h1><Link href="/admin/dashboard/blogs/create" className="button-primary">Blog oluştur</Link></div>
    <div className="surface-card mb-6 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
      <div><label className="mb-2 block font-semibold" htmlFor="admin-blog-search">Ara</label><input id="admin-blog-search" className="form-field" value={search} maxLength={200} onChange={event => { setSearch(event.target.value); setPage(1); }} /></div>
      <div><label className="mb-2 block font-semibold" htmlFor="admin-blog-category">Kategori</label><select id="admin-blog-category" className="form-field" value={category} onChange={event => { setCategory(event.target.value); setPage(1); }}><option value="">Tüm kategoriler</option>{BLOG_CATEGORIES.map(value => <option key={value} value={value}>{value}</option>)}</select></div>
      <div><label className="mb-2 block font-semibold" htmlFor="admin-blog-status">Yayın durumu</label><select id="admin-blog-status" className="form-field" value={status} onChange={event => { setStatus(event.target.value); setPage(1); }}><option value="">Tüm durumlar</option><option value="published">Yayınlanmış</option><option value="draft">Taslak</option></select></div>
      <button className="button-secondary self-end" onClick={() => { setSearch(""); setCategory(""); setStatus(""); setPage(1); }}>Filtreleri temizle</button>
    </div>
    {error && <p role="alert" className="mb-4 text-danger">{error}</p>}
    {loading ? <p role="status">Bloglar yükleniyor…</p> : !data ? <div role="alert" className="surface-card p-6"><p>Bloglar yüklenemedi.</p><button className="button-secondary mt-4" onClick={() => setAttempt(value => value + 1)}>Yeniden dene</button></div> : data.blogs.length === 0 ? <p className="surface-card p-6">Bu filtrelerle blog bulunamadı.</p> : <div className="grid gap-4">{data.blogs.map(blog => <article key={blog._id} className="surface-card flex flex-wrap items-start justify-between gap-4 p-5"><div className="min-w-0 flex-1"><h2 className="break-words text-xl font-bold">{blog.title}</h2><p className="mt-2 text-quiet">{blog.category} · {blog.isPublished ? "Yayınlanmış" : "Taslak"} · {blog.author}</p></div><div className="flex flex-wrap gap-3"><Link href={"/admin/dashboard/blogs/" + encodeURIComponent(blog._id ?? "")} className="button-secondary" aria-label={blog.title + " blogunu düzenle"}>Düzenle</Link><button className="button-secondary" disabled={Boolean(deleting)} onClick={() => remove(blog._id ?? "")} aria-label={blog.title + " blogunu sil"}>{deleting === blog._id ? "Siliniyor…" : "Sil"}</button></div></article>)}</div>}
    {data && data.pages > 1 && <nav aria-label="Blog sayfaları" className="mt-6 flex flex-wrap items-center gap-4"><button className="button-secondary" disabled={page <= 1 || Boolean(deleting)} onClick={() => setPage(value => value - 1)}>Önceki</button><span>{page} / {data.pages}</span><button className="button-secondary" disabled={page >= data.pages || Boolean(deleting)} onClick={() => setPage(value => value + 1)}>Sonraki</button></nav>}
  </section>;
}
