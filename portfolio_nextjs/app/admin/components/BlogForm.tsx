"use client";
import BlogEditor from "./BlogEditor";
import AdminPageHeading from "./AdminPageHeading";
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
  const [data, setData] = useState({ title: blog?.title ?? "", titleEn: blog?.titleEn ?? "", contentEn: blog?.contentEn ?? "", excerptEn: blog?.excerptEn ?? "", content: blog?.content ?? "", author: blog?.author ?? "", category: blog?.category ?? "yazı", excerpt: blog?.excerpt ?? "", featuredImage: blog?.featuredImage ?? "", isPublished: blog?.isPublished ?? false });
  const [tags, setTags] = useState(blog?.tags.join(", ") ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const payload = { ...data, title: data.title.trim(), titleEn: data.titleEn.trim(), contentEn: data.contentEn.trim(), excerptEn: data.excerptEn.trim(), author: data.author.trim(), content: data.content.trim(), excerpt: data.excerpt.trim(), featuredImage: data.featuredImage.trim(), tags: [...new Set(tags.split(",").map(tag => tag.trim()).filter(Boolean))] };
    if (!payload.title || !payload.author || !payload.content || (payload.featuredImage && !isSafeImageSource(payload.featuredImage)) || payload.tags.length > 50 || payload.tags.some(tag => tag.length > 100)) { setError("Başlık, yazar, içerik, görsel adresi ve etiketleri kontrol edin."); return; }
    if (new TextEncoder().encode(JSON.stringify(payload)).length > 240000) { setError("Yazı ve çevirisinin toplam boyutu çok büyük. İçeriği kısaltın veya ayrı yazılara bölün."); return; }
    setSaving(true); setError("");
    try {
      const result = blog?._id ? await BlogAdminService.updateBlog(blog._id, payload) : await BlogAdminService.createBlog(payload);
      if (result) { router.push("/admin/dashboard/blogs"); router.refresh(); }
      else setError("Blog kaydedilemedi. Lütfen yeniden deneyin.");
    } catch { setError("Blog kaydedilemedi. Lütfen yeniden deneyin."); }
    finally { setSaving(false); }
  }
  return <section className="mx-auto max-w-5xl"><Link href="/admin/dashboard/blogs" className="button-secondary mb-6">Bloglara dön</Link><AdminPageHeading className="mb-6 text-3xl font-bold">{blog ? "Blogu düzenle" : "Blog oluştur"}</AdminPageHeading>
    <form onSubmit={submit} className="surface-card grid gap-5 p-5 sm:p-8" aria-busy={saving}><fieldset disabled={saving} className="grid min-w-0 gap-5"><legend className="sr-only">Blog bilgileri</legend><p className="text-sm text-quiet">İngilizce alanlar boşsa Türkçe içerik gösterilir. İngilizce içerik girip özeti boş bırakırsanız özet içerikten oluşturulur.</p>
      {([{ name: "title", label: "Başlık", max: 200, required: true }, { name: "titleEn", label: "İngilizce başlık (isteğe bağlı)", max: 200, required: false }, { name: "author", label: "Yazar", max: 200, required: true }, { name: "featuredImage", label: "Kapak görseli adresi", max: 2048, required: false }] as const).map(field => <div key={field.name}><label htmlFor={"blog-" + field.name} className="mb-2 block font-semibold">{field.label}</label><input id={"blog-" + field.name} className="form-field" value={data[field.name]} maxLength={field.max} required={field.required} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} /></div>)}
      {data.featuredImage && isSafeImageSource(data.featuredImage) && <PublicImage src={data.featuredImage} alt="Kapak görseli önizlemesi" width={720} height={360} sizes="(max-width: 768px) 100vw, 720px" className="max-h-64 w-full rounded-xl object-contain" />}
      <div><label htmlFor="blog-category" className="mb-2 block font-semibold">Kategori</label><select id="blog-category" className="form-field" value={data.category} onChange={event => setData(previous => ({ ...previous, category: event.target.value as Blog["category"] }))}>{BLOG_CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}</select></div>
      {([{ name: "excerpt", label: "Kısa özet", rows: 3, max: 2000 }, { name: "excerptEn", label: "İngilizce kısa özet (isteğe bağlı)", rows: 3, max: 2000 }] as const).map(field => <div key={field.name}><label htmlFor={"blog-" + field.name} className="mb-2 block font-semibold">{field.label}</label><textarea id={"blog-" + field.name} className="form-field" rows={field.rows} maxLength={field.max}  value={data[field.name]} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} /></div>)}
      <BlogEditor id="blog-content" label="Türkçe içerik" value={data.content} required onChange={content => setData(previous => ({ ...previous, content }))} />
      <details className="blog-editor__translation"><summary>İngilizce içerik (isteğe bağlı)</summary><BlogEditor id="blog-contentEn" label="İngilizce içerik" value={data.contentEn} onChange={contentEn => setData(previous => ({ ...previous, contentEn }))} /></details>
      <div><label htmlFor="blog-tags" className="mb-2 block font-semibold">Etiketler (virgülle ayırın)</label><input id="blog-tags" className="form-field" value={tags} maxLength={5000} onChange={event => setTags(event.target.value)} /></div>
      <label htmlFor="blog-published" className="flex items-center gap-3"><input id="blog-published" type="checkbox" checked={data.isPublished} onChange={event => setData(previous => ({ ...previous, isPublished: event.target.checked }))} />Yayınla</label>
      <p className="text-quiet">Yayınla seçili değilse kayıt taslak olarak saklanır.</p>
    </fieldset>{error && <p role="alert" className="text-danger">{error}</p>}<button type="submit" className="button-primary" disabled={saving}>{saving ? "Kaydediliyor…" : "Kaydet"}</button></form>
  </section>;
}


