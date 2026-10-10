"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CertificationService, type CertificationInput } from "../../../service/certificationsService";
import { isSafeHttpUrl, isSafeImageSource } from "../../../../api/urlSafety";

export default function AddCertification({ certification }: { certification?: CertificationInput & { _id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<CertificationInput>({ name: certification?.name ?? "", issuingOrganization: certification?.issuingOrganization ?? "", issueDate: certification?.issueDate?.slice(0, 10) ?? "", certificateLink: certification?.certificateLink ?? "", certificateImage: certification?.certificateImage ?? "", type: certification?.type ?? "web" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const link = data.certificateLink?.trim() ?? "";
    const image = data.certificateImage?.trim() ?? "";
    if (!data.name.trim() || !data.issuingOrganization?.trim() || !data.issueDate || !Number.isFinite(Date.parse(data.issueDate)) || (link && !isSafeHttpUrl(link)) || (image && !isSafeImageSource(image))) { setError("Sertifika bilgilerini ve bağlantı adreslerini kontrol edin."); return; }
    setSaving(true); setError("");
    try {
      const payload = { ...data, name: data.name.trim(), issuingOrganization: data.issuingOrganization.trim(), certificateLink: link, certificateImage: image };
      const response = certification ? await CertificationService.updateCertification(certification._id, payload) : await CertificationService.createCertification(payload);
      if (response.status === 200 || response.status === 201) { router.push("/admin/dashboard/certificates"); router.refresh(); }
      else setError("Sertifika kaydedilemedi.");
    } catch { setError("Sertifika kaydedilemedi. Lütfen yeniden deneyin."); }
    finally { setSaving(false); }
  }
  const fields = [{ name: "name", label: "Sertifika adı", type: "text", required: true }, { name: "issuingOrganization", label: "Veren kurum", type: "text", required: true }, { name: "issueDate", label: "Veriliş tarihi", type: "date", required: true }, { name: "certificateLink", label: "Sertifika bağlantısı", type: "url", required: false }, { name: "certificateImage", label: "Görsel adresi", type: "text", required: false }] as const;
  return <section className="mx-auto max-w-2xl"><Link className="button-secondary mb-6" href="/admin/dashboard/certificates">Sertifikalara dön</Link><h1 className="mb-6 text-3xl font-bold">{certification ? "Sertifikayı düzenle" : "Sertifika ekle"}</h1><form className="surface-card grid gap-5 p-5 sm:p-8" onSubmit={submit} aria-busy={saving}><fieldset disabled={saving} className="grid min-w-0 gap-5"><legend className="sr-only">Sertifika bilgileri</legend>{fields.map(field => <div key={field.name}><label className="mb-2 block font-semibold" htmlFor={`cert-${field.name}`}>{field.label}</label><input id={`cert-${field.name}`} className="form-field" type={field.type} value={data[field.name] ?? ""} required={field.required} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} /></div>)}<div><label className="mb-2 block font-semibold" htmlFor="cert-type">Alan</label><select id="cert-type" className="form-field" value={data.type} onChange={event => setData(previous => ({ ...previous, type: event.target.value }))} required>{[["web", "Web"], ["mobile", "Mobil"], ["ai", "Yapay zekâ"], ["database", "Veritabanı"], ["security", "Güvenlik"]].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div></fieldset>{error && <p role="alert" className="text-danger">{error}</p>}<button className="button-primary" disabled={saving} type="submit">{saving ? "Kaydediliyor…" : "Kaydet"}</button></form></section>;
}
