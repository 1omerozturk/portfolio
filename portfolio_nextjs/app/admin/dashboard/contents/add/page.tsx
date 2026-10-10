"use client";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ContentService, type ContentInput } from "../../../service/contentService";
import { isSafeHttpUrl, isSafeImageSource } from "../../../../api/urlSafety";

export default function ContentAdd({ content }: { content?: ContentInput & { _id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<ContentInput>({ name: content?.name ?? "", link: content?.link ?? "", image: content?.image ?? "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const payload = { name: data.name.trim(), link: data.link.trim(), image: data.image?.trim() ?? "" };
    if (!payload.name || !isSafeHttpUrl(payload.link) || (payload.image && !isSafeImageSource(payload.image))) {
      setError("İçerik adı ve geçerli bir bağlantı girin. Görsel adresi HTTP/HTTPS veya yerel dosya yolu olmalıdır.");
      return;
    }
    setSaving(true); setError("");
    try {
      const response = content ? await ContentService.updateContents(content._id, payload) : await ContentService.addContent(payload);
      if (response?.status === 200 || response?.status === 201) { router.push("/admin/dashboard/contents"); router.refresh(); }
      else setError("İçerik kaydedilemedi. Lütfen yeniden deneyin.");
    } catch { setError("İçerik kaydedilemedi. Lütfen yeniden deneyin."); }
    finally { setSaving(false); }
  }
  return <section className="mx-auto max-w-2xl"><Link href="/admin/dashboard/contents" className="button-secondary mb-6">İçeriklere dön</Link><h1 className="mb-6 text-3xl font-bold">{content ? "İçeriği düzenle" : "İçerik ekle"}</h1><form className="surface-card grid gap-5 p-5 sm:p-8" onSubmit={submit} aria-busy={saving}><fieldset disabled={saving} className="grid min-w-0 gap-5"><legend className="sr-only">İçerik bilgileri</legend>{([{ name: "name", label: "İçerik adı", type: "text" }, { name: "link", label: "İçerik bağlantısı", type: "url" }, { name: "image", label: "Görsel adresi (isteğe bağlı)", type: "text" }] as const).map(field => <div key={field.name}><label className="mb-2 block font-semibold" htmlFor={`content-${field.name}`}>{field.label}</label><input id={`content-${field.name}`} className="form-field" type={field.type} required={field.name !== "image"} value={data[field.name] ?? ""} maxLength={field.name === "name" ? 200 : 2048} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} /></div>)}</fieldset>{error && <p role="alert" className="text-danger">{error}</p>}<button type="submit" className="button-primary" disabled={saving}>{saving ? "Kaydediliyor…" : "Kaydet"}</button></form></section>;
}
