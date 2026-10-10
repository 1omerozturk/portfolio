"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminProjectService } from "../../../service/projectService";
import { normalizeProject } from "../../../../api/projectPayload";
import { isSafeHttpUrl, isSafeImageSource } from "../../../../api/urlSafety";

const fields = [
  { name: "title", label: "Proje başlığı", required: true },
  { name: "description", label: "Açıklama", required: true, multiline: true },
  { name: "technologies", label: "Teknolojiler (virgülle ayırın)" },
  { name: "repoLink", label: "Kaynak kodu bağlantısı" },
  { name: "liveDemoLink", label: "Canlı demo bağlantısı" },
  { name: "images", label: "Görsel adresleri (her satıra bir adres)", multiline: true },
] as const;

export default function ProjectAdd({ project }: { project?: Record<string, unknown> }) {
  const router = useRouter();
  const initial = normalizeProject(project);
  const [data, setData] = useState({ title: initial?.title ?? "", description: initial?.description ?? "", type: initial?.type ?? "web", technologies: initial?.technologies.join(", ") ?? "", repoLink: initial?.repoLink ?? "", liveDemoLink: initial?.liveDemoLink ?? "", images: initial?.images.join("\n") ?? "", isShowcasing: initial?.isShowcasing ?? false });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const payload = { ...data, title: data.title.trim(), description: data.description.trim(), repoLink: data.repoLink.trim(), liveDemoLink: data.liveDemoLink.trim(), technologies: [...new Set(data.technologies.split(",").map(value => value.trim()).filter(Boolean))], images: [...new Set(data.images.split(/\r?\n/).map(value => value.trim()).filter(Boolean))] };
    if (!payload.title || !payload.description || !["web", "mobile"].includes(payload.type) || [payload.repoLink, payload.liveDemoLink].some(value => value && !isSafeHttpUrl(value)) || payload.images.some(value => !isSafeImageSource(value))) {
      setError("Başlık, açıklama ve proje türünü kontrol edin. Bağlantılar HTTP/HTTPS, görseller HTTP/HTTPS veya yerel dosya yolu olmalıdır."); return;
    }
    if (project && !initial) { setError("Proje bilgileri geçersiz. Listeye dönüp yeniden açın."); return; }
    setSaving(true); setError("");
    try {
      const response = initial ? await AdminProjectService.updateProject(initial._id, payload) : await AdminProjectService.addProject(payload);
      if (response && response.status >= 200 && response.status < 300) { router.push("/admin/dashboard/projects"); router.refresh(); }
      else setError("Proje kaydedilemedi. Lütfen yeniden deneyin.");
    } catch { setError("Proje kaydedilemedi. Lütfen yeniden deneyin."); }
    finally { setSaving(false); }
  }
  return <section className="mx-auto max-w-2xl">
    <Link href="/admin/dashboard/projects" className="button-secondary mb-6">Projelere dön</Link>
    <h1 className="mb-6 text-3xl font-bold">{project ? "Projeyi düzenle" : "Proje ekle"}</h1>
    <form className="surface-card grid gap-5 p-5 sm:p-8" onSubmit={submit} aria-busy={saving}>
      <fieldset disabled={saving} className="grid min-w-0 gap-5"><legend className="sr-only">Proje bilgileri</legend>
        {fields.map(field => <div key={field.name}>
          <label htmlFor={"project-" + field.name} className="mb-2 block font-semibold">{field.label}</label>
          {"multiline" in field && field.multiline ? <textarea id={"project-" + field.name} className="form-field" rows={5} required={"required" in field && field.required} value={data[field.name]} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} /> : <input id={"project-" + field.name} className="form-field" type={field.name.endsWith("Link") ? "url" : "text"} maxLength={field.name === "title" ? 200 : 2048} required={"required" in field && field.required} value={data[field.name]} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} />}
        </div>)}
        <div><label htmlFor="project-type" className="mb-2 block font-semibold">Proje türü</label><select id="project-type" className="form-field" value={data.type} required onChange={event => setData(previous => ({ ...previous, type: event.target.value }))}><option value="web">Web</option><option value="mobile">Mobil</option></select></div>
        <label className="flex items-center gap-3" htmlFor="project-showcase"><input id="project-showcase" type="checkbox" checked={data.isShowcasing} onChange={event => setData(previous => ({ ...previous, isShowcasing: event.target.checked }))} />Projeyi vitrinde göster</label>
      </fieldset>
      {error && <p className="text-danger" role="alert">{error}</p>}
      <button type="submit" className="button-primary" disabled={saving}>{saving ? "Kaydediliyor…" : "Kaydet"}</button>
    </form>
  </section>;
}
