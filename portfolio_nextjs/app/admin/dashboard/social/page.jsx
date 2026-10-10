"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SocialService } from "../../service/socialService";
import Loading from "../../components/Loading";
import { isSafeHttpUrl } from "../../../api/urlSafety";
import { DynamicIcon } from "../../../components/DynamicIcon";

export default function AdminSocialLinks() {
  const [records, setRecords] = useState(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    SocialService.getSocials().then(response => {
      if (!active) return;
      const valid = Array.isArray(response?.data);
      setFailed(!valid);
      setRecords(valid ? response.data.filter(item => typeof item._id === "string" && typeof item.name === "string") : []);
    }).catch(() => { if (active) { setFailed(true); setRecords([]); } });
    return () => { active = false; };
  }, [attempt]);
  async function remove(item) {
    if (deleting || !window.confirm(`${item.name} bağlantısı silinsin mi?`)) return;
    setDeleting(item._id); setError("");
    try {
      const response = await SocialService.deleteSocial(item._id);
      if (response?.status >= 200 && response.status < 300) setRecords(previous => previous.filter(record => record._id !== item._id));
      else setError("Bağlantı silinemedi. Lütfen yeniden deneyin.");
    } catch { setError("Bağlantı silinemedi. Lütfen yeniden deneyin."); }
    finally { setDeleting(null); }
  }
  return <section><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-bold">Sosyal bağlantılar</h1><Link href="/admin/dashboard/social/add" className="button-primary">Bağlantı ekle</Link></div>{error && <p className="mb-4 text-danger" role="alert">{error}</p>}{records === null ? <Loading /> : failed ? <div className="surface-card p-6" role="status"><p>Sosyal bağlantılar yüklenemedi.</p><button className="button-secondary mt-4" onClick={() => { setRecords(null); setAttempt(value => value + 1); }}>Yeniden dene</button></div> : records.length === 0 ? <p className="surface-card p-6 text-quiet" role="status">Henüz bağlantı eklenmemiş.</p> : <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{records.map(item => <article key={item._id} className="surface-card min-w-0 p-5"><div className="flex items-center gap-3"><span className="text-2xl" aria-hidden="true"><DynamicIcon iconName={typeof item.icon === "string" ? item.icon : ""} /></span><h2 className="break-words text-xl font-bold">{item.name}</h2></div>{isSafeHttpUrl(item.url) ? <a className="mt-4 inline-block break-all text-brand" href={item.url} target="_blank" rel="noopener noreferrer">Profili aç ↗</a> : <p className="mt-4 text-quiet">Bağlantı adresini düzenleyin.</p>}<div className="mt-5 flex flex-wrap gap-3"><Link className="button-secondary" href={`/admin/dashboard/social/edit/${encodeURIComponent(item._id)}`} aria-label={`${item.name} düzenle`}>Düzenle</Link><button className="button-secondary" disabled={deleting !== null} onClick={() => remove(item)} aria-label={`${item.name} sil`}>{deleting === item._id ? "Siliniyor…" : "Sil"}</button></div></article>)}</div>}</section>;
}
