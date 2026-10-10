"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Blog } from "../../models/blogs";
import { BLOG_CATEGORIES } from "../../blogConstants";
import { isSafeImageSource } from "../../api/urlSafety";
import { BlogAdminService } from "../service/blogAdminService";
import PublicImage from "../../components/PublicImage";

export default function BlogForm({ blog }: { blog?: Blog }) {
  const router = useRouter();
  const [data, setData] = useState({ title: blog?.title ?? "", content: blog?.content ?? "", author: blog?.author ?? "", category: blog?.category ?? "yazı", excerpt: blog?.excerpt ?? "", featuredImage: blog?.featuredImage ?? "", isPublished: blog?.isPublished ?? false });
  const [tags, setTags] = useState(blog?.tags.join(", ") ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const words = data.content.trim().split(/\s+/).filter(Boolean).length;
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const payload = { ...data, title: data.title.trim(), author: data.author.trim(), content: data.content.trim(), excerpt: data.excerpt.trim(), featuredImage: data.featuredImage.trim(), tags: [...new Set(tags.split(",").map(tag => tag.trim()).filter(Boolean))] };
    if (!payload.title || !payload.author || !payload.content || (payload.featuredImage && !isSafeImageSource(payload.featuredImage)) || payload.tags.length > 50 || payload.tags.some(tag => tag.length > 100)) { setError("Başlık, yazar, içerik, görsel adresi ve etiketleri kontrol edin."); return; }
    setSaving(true); setError("");
    try {
      const result = blog?._id ? await BlogAdminService.updateBlog(blog._id, payload) : await BlogAdminService.createBlog(payload);
      if (result) { router.push("/admin/dashboard/blogs"); router.refresh(); }
      else setError("Blog kaydedilemedi. Lütfen yeniden deneyin.");
    } catch { setError("Blog kaydedilemedi. Lütfen yeniden deneyin."); }
    finally { setSaving(false); }
  }
  return <section className="mx-auto max-w-3xl"><Link href="/admin/dashboard/blogs" className="button-secondary mb-6">Bloglara dön</Link><h1 className="mb-6 text-3xl font-bold">{blog ? "Blogu düzenle" : "Blog oluştur"}</h1>
    <form onSubmit={submit} className="surface-card grid gap-5 p-5 sm:p-8" aria-busy={saving}><fieldset disabled={saving} className="grid min-w-0 gap-5"><legend className="sr-only">Blog bilgileri</legend>
      {([{ name: "title", label: "Başlık", max: 200, required: true }, { name: "author", label: "Yazar", max: 200, required: true }, { name: "featuredImage", label: "Kapak görseli adresi", max: 2048, required: false }] as const).map(field => <div key={field.name}><label htmlFor={"blog-" + field.name} className="mb-2 block font-semibold">{field.label}</label><input id={"blog-" + field.name} className="form-field" value={data[field.name]} maxLength={field.max} required={field.required} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} /></div>)}
      {data.featuredImage && isSafeImageSource(data.featuredImage) && <PublicImage src={data.featuredImage} alt="Kapak görseli önizlemesi" width={720} height={360} sizes="(max-width: 768px) 100vw, 720px" className="max-h-64 w-full rounded-xl object-contain" />}
      <div><label htmlFor="blog-category" className="mb-2 block font-semibold">Kategori</label><select id="blog-category" className="form-field" value={data.category} onChange={event => setData(previous => ({ ...previous, category: event.target.value as Blog["category"] }))}>{BLOG_CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}</select></div>
      {([{ name: "excerpt", label: "Kısa özet", rows: 3, max: 2000 }, { name: "content", label: "İçerik (Markdown kullanabilirsiniz)", rows: 16, max: 100000 }] as const).map(field => <div key={field.name}><label htmlFor={"blog-" + field.name} className="mb-2 block font-semibold">{field.label}</label><textarea id={"blog-" + field.name} className="form-field" rows={field.rows} maxLength={field.max} required={field.name === "content"} value={data[field.name]} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} /></div>)}
      <p className="text-quiet">{data.content.length} karakter · Yaklaşık {Math.max(1, Math.ceil(words / 200))} dakika okuma</p>
      <div><label htmlFor="blog-tags" className="mb-2 block font-semibold">Etiketler (virgülle ayırın)</label><input id="blog-tags" className="form-field" value={tags} maxLength={5000} onChange={event => setTags(event.target.value)} /></div>
      <label htmlFor="blog-published" className="flex items-center gap-3"><input id="blog-published" type="checkbox" checked={data.isPublished} onChange={event => setData(previous => ({ ...previous, isPublished: event.target.checked }))} />Yayınla</label>
      <p className="text-quiet">Yayınla seçili değilse kayıt taslak olarak saklanır.</p>
    </fieldset>{error && <p role="alert" className="text-danger">{error}</p>}<button type="submit" className="button-primary" disabled={saving}>{saving ? "Kaydediliyor…" : "Kaydet"}</button></form>
  </section>;
}

