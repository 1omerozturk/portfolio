"use client";
import AdminPageHeading from "../../components/AdminPageHeading";
import AdminContentIcon from "../../components/AdminContentIcon";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CertificationService } from "../../service/certificationsService";
import Loading from "../../components/Loading";
import { isSafeHttpUrl } from "../../../api/urlSafety";
import CertificatePdf from "../../../components/CertificatePdf";

export default function Certificates() {
  const [records, setRecords] = useState(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    CertificationService.getCertifications().then(items => { if (active) { setRecords(items.filter(item => typeof item._id === "string")); setFailed(false); } }).catch(() => { if (active) { setRecords([]); setFailed(true); } });
    return () => { active = false; };
  }, [attempt]);
  async function remove(item) {
    if (deleting || !window.confirm(`${item.name || "Sertifika"} silinsin mi?`)) return;
    setDeleting(item._id); setError("");
    try {
      const response = await CertificationService.deleteCertification(item._id);
      if (response.status >= 200 && response.status < 300) setRecords(previous => previous.filter(record => record._id !== item._id));
      else setError("Sertifika silinemedi.");
    } catch { setError("Sertifika silinemedi. Lütfen yeniden deneyin."); }
    finally { setDeleting(null); }
  }
  return <section><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><AdminPageHeading className="text-3xl font-bold">Sertifikalar</AdminPageHeading><Link className="button-primary" href="/admin/dashboard/certificates/add">Sertifika ekle</Link></div>{error && <p className="mb-4 text-danger" role="alert">{error}</p>}{records === null ? <Loading /> : failed ? <div className="surface-card p-6" role="status"><p>Sertifikalar yüklenemedi.</p><button className="button-secondary mt-4" onClick={() => { setRecords(null); setAttempt(value => value + 1); }}>Yeniden dene</button></div> : records.length === 0 ? <p className="surface-card p-6 text-quiet" role="status">Henüz sertifika eklenmemiş.</p> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{records.map(item => <article key={item._id} className="surface-card min-w-0 p-5"><div className="mb-3"><AdminContentIcon kind="certificates" /></div><h2 className="break-words text-xl font-bold">{typeof item.name === "string" ? item.name : "Sertifika"}</h2>{typeof item.issuingOrganization === "string" && <p className="mt-2 break-words text-quiet">{item.issuingOrganization}</p>}<CertificatePdf url={typeof item.certificatePdf === "string" ? item.certificatePdf : ""} name={typeof item.name === "string" ? item.name : "Sertifika"} />{isSafeHttpUrl(item.certificateLink) && <a href={item.certificateLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-brand">Sertifikayı aç ↗</a>}<div className="mt-5 flex flex-wrap gap-3"><Link className="button-secondary" href={`/admin/dashboard/certificates/edit/${encodeURIComponent(item._id)}`} aria-label={`${item.name || "Sertifika"} düzenle`}>Düzenle</Link><button className="button-secondary" disabled={deleting !== null} onClick={() => remove(item)} aria-label={`${item.name || "Sertifika"} sil`}>{deleting === item._id ? "Siliniyor…" : "Sil"}</button></div></article>)}</div>}</section>;
}



