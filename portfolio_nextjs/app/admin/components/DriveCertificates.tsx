"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getDriveCertificates, selectDriveCertificate } from "../../api/api";
import AdminPageHeading from "./AdminPageHeading";
import AdminContentIcon from "./AdminContentIcon";
import CertificatePdf from "../../components/CertificatePdf";

type DriveFile = { id: string; name: string; url: string; isVisible: boolean; certificateId: string | null };
export default function DriveCertificates() {
  const [files, setFiles] = useState<DriveFile[] | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState("");
  useEffect(() => {
    let active = true;
    getDriveCertificates().then(response => {
      if (!Array.isArray(response.data.files)) throw new Error("Invalid files");
      if (active) setFiles(response.data.files);
    }).catch(() => { if (active) { setFiles([]); setError("Drive listesi yüklenemedi. Drive API’yi etkinleştirin ve klasörü backend servis hesabına Görüntüleyici olarak paylaşın."); } });
    return () => { active = false; };
  }, [attempt]);
  async function select(file: DriveFile, visible: boolean) {
    if (busy) return;
    setBusy(file.id); setError("");
    try {
      const response = await selectDriveCertificate(file.id, visible);
      setFiles(previous => previous?.map(item => item.id === file.id ? { ...item, isVisible: visible, certificateId: response.data.id || item.certificateId } : item) || []);
    } catch { setError("Görünürlük kaydedilemedi. Seçim değiştirilmedi; yeniden deneyin."); }
    finally { setBusy(""); }
  }
  return <section>
    <Link href="/admin/dashboard/certificates" className="button-secondary mb-6">Sertifikalara dön</Link>
    <AdminPageHeading className="mb-4 text-3xl font-bold">Drive sertifikaları</AdminPageHeading>
    <p className="mb-6 text-quiet">Klasördeki PDF’ler otomatik listelenir. İşaretlediğiniz sertifikalar sitede gösterilir. Dosyalar Drive’da kalır.</p>
    <button type="button" className="button-secondary mb-6" disabled={Boolean(busy)} onClick={() => { setFiles(null); setError(""); setAttempt(value => value + 1); }}>Listeyi yenile</button>
    {error && <p role="alert" className="mb-5 text-danger">{error}</p>}
    {files === null ? <p role="status">Drive dosyaları yükleniyor…</p> : !files.length ? <p className="surface-card p-6">{error ? "Klasör ayarlarını kontrol ederek yeniden deneyin." : "Bu klasörde PDF bulunamadı."}</p> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{files.map(file => <article key={file.id} className="surface-card min-w-0 p-5">
      <div className="mb-3"><AdminContentIcon kind="certificates" /></div><h2 className="break-words text-lg font-bold">{file.name}</h2>
      <label className="mt-5 flex cursor-pointer items-center gap-3"><input type="checkbox" checked={file.isVisible} disabled={Boolean(busy)} onChange={event => select(file, event.target.checked)} />Sitede göster</label>
      {busy === file.id && <p role="status" className="mt-2 text-sm text-quiet">Kaydediliyor…</p>}
      <CertificatePdf url={file.url} name={file.name} />
      {file.certificateId && <Link className="button-secondary mt-4" href={`/admin/dashboard/certificates/edit/${encodeURIComponent(file.certificateId)}`}>Bilgileri düzenle</Link>}
    </article>)}</div>}
  </section>;
}
