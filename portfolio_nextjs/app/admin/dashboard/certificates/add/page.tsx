"use client";
import AdminPageHeading from "../../../components/AdminPageHeading";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CertificationService, type CertificationInput } from "../../../service/certificationsService";
import { isSafeHttpUrl } from "../../../../api/urlSafety";
import { uploadCertificationPdf } from "../../../../api/api";
import CertificatePdf from "../../../../components/CertificatePdf";

export default function AddCertification({ certification }: { certification?: CertificationInput & { _id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<CertificationInput>({ name: certification?.name ?? "", nameEn: certification?.nameEn ?? "", issuingOrganizationEn: certification?.issuingOrganizationEn ?? "", issuingOrganization: certification?.issuingOrganization ?? "", issueDate: certification?.issueDate?.slice(0, 10) ?? "", certificateLink: certification?.certificateLink ?? "", certificatePdf: certification?.certificatePdf ?? "", type: certification?.type ?? "web" });
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const link = data.certificateLink?.trim() ?? "";
    let pdf = data.certificatePdf?.trim() ?? "";
    if (!data.name.trim() || !data.issuingOrganization?.trim() || !data.issueDate || !Number.isFinite(Date.parse(data.issueDate)) || (link && !isSafeHttpUrl(link)) || (pdf && !isSafeHttpUrl(pdf))) { setError("Sertifika bilgilerini ve bağlantı adreslerini kontrol edin."); return; }
    if (file && (!file.size || file.size > 5 * 1024 * 1024 || !file.name.toLowerCase().endsWith(".pdf"))) { setError("En fazla 5 MB boyutunda bir PDF seçin."); return; }
    setSaving(true); setError("");
    try {
      if (file) {
        if (new TextDecoder().decode(await file.slice(0, 5).arrayBuffer()) !== "%PDF-") { setError("Geçerli bir PDF seçin."); return; }
        const uploaded = await uploadCertificationPdf(file);
        pdf = uploaded.data.url;
        if (!isSafeHttpUrl(pdf)) throw new Error("Invalid PDF response");
        setData(previous => ({ ...previous, certificatePdf: pdf }));
        setFile(null);
      }
      const payload = { ...data, name: data.name.trim(), nameEn: data.nameEn?.trim() ?? "", issuingOrganizationEn: data.issuingOrganizationEn?.trim() ?? "", issuingOrganization: data.issuingOrganization.trim(), certificateLink: link, certificatePdf: pdf };
      const response = certification ? await CertificationService.updateCertification(certification._id, payload) : await CertificationService.createCertification(payload);
      if (response.status === 200 || response.status === 201) { router.push("/admin/dashboard/certificates"); router.refresh(); }
      else setError("Sertifika kaydedilemedi.");
    } catch { setError("Sertifika kaydedilemedi. Lütfen yeniden deneyin."); }
    finally { setSaving(false); }
  }
  const fields = [{ name: "name", label: "Sertifika adı", type: "text", required: true }, { name: "issuingOrganization", label: "Veren kurum", type: "text", required: true }, { name: "nameEn", label: "İngilizce sertifika adı (boşsa Türkçe gösterilir)", type: "text", required: false }, { name: "issuingOrganizationEn", label: "İngilizce kurum adı (isteğe bağlı)", type: "text", required: false }, { name: "issueDate", label: "Veriliş tarihi", type: "date", required: true }, { name: "certificateLink", label: "Sertifika bağlantısı", type: "url", required: false }, { name: "certificatePdf", label: "PDF adresi (isteğe bağlı)", type: "url", required: false }] as const;
  return <section className="mx-auto max-w-2xl"><Link className="button-secondary mb-6" href="/admin/dashboard/certificates">Sertifikalara dön</Link><AdminPageHeading className="mb-6 text-3xl font-bold">{certification ? "Sertifikayı düzenle" : "Sertifika ekle"}</AdminPageHeading><form className="surface-card grid gap-5 p-5 sm:p-8" onSubmit={submit} aria-busy={saving}><fieldset disabled={saving} className="grid min-w-0 gap-5"><legend className="sr-only">Sertifika bilgileri</legend><div><label className="mb-2 block font-semibold" htmlFor="cert-file">Sertifika PDF dosyası</label><input id="cert-file" className="form-field" type="file" accept="application/pdf,.pdf" onChange={event => setFile(event.target.files?.[0] ?? null)} /><p className="mt-2 text-sm text-quiet">En fazla 5 MB. Dosya Kaydet düğmesiyle yüklenir.</p></div>{fields.map(field => <div key={field.name}><label className="mb-2 block font-semibold" htmlFor={`cert-${field.name}`}>{field.label}</label><input id={`cert-${field.name}`} className="form-field" type={field.type} value={data[field.name] ?? ""} required={field.required} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} /></div>)}<div><label className="mb-2 block font-semibold" htmlFor="cert-type">Alan</label><select id="cert-type" className="form-field" value={data.type} onChange={event => setData(previous => ({ ...previous, type: event.target.value }))} required>{[["web", "Web"], ["mobile", "Mobil"], ["ai", "Yapay zekâ"], ["database", "Veritabanı"], ["security", "Güvenlik"]].map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div><CertificatePdf url={data.certificatePdf ?? ""} name={data.name} /></fieldset>{error && <p role="alert" className="text-danger">{error}</p>}<button className="button-primary" disabled={saving} type="submit">{saving ? "Kaydediliyor…" : "Kaydet"}</button></form></section>;
}

