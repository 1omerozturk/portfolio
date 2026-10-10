"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "../../components/Loading";
import { ContentService } from "../../service/contentService";
import { isSafeHttpUrl } from "../../../api/urlSafety";
import PublicImage from "../../../components/PublicImage";

export default function ContentsDashboard() {
  const [contents, setContents] = useState(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    ContentService.getContents().then(response => {
      if (!active) return;
      const valid = Array.isArray(response?.data);
      setFailed(!valid);
      setContents(valid ? response.data.filter(item => typeof item._id === "string" && typeof item.name === "string") : []);
    }).catch(() => { if (active) { setFailed(true); setContents([]); } });
    return () => { active = false; };
  }, [attempt]);
  async function remove(content) {
    if (deleting || !window.confirm(`${content.name} içeriği silinsin mi?`)) return;
    setDeleting(content._id); setError("");
    try {
      const response = await ContentService.deleteContent(content._id);
      if (response?.status === 200) setContents(previous => previous.filter(item => item._id !== content._id));
      else setError("İçerik silinemedi. Lütfen yeniden deneyin.");
    } catch { setError("İçerik silinemedi. Lütfen yeniden deneyin."); }
    finally { setDeleting(null); }
  }
  return <section><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><h1 className="text-3xl font-bold">İçerikler</h1><Link href="/admin/dashboard/contents/add" className="button-primary">İçerik ekle</Link></div>{error && <p role="alert" className="mb-4 text-danger">{error}</p>}{contents === null ? <Loading /> : failed ? <div className="surface-card p-6" role="status"><p>İçerikler yüklenemedi.</p><button className="button-secondary mt-4" onClick={() => { setContents(null); setAttempt(value => value + 1); }}>Yeniden dene</button></div> : contents.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{contents.map(content => <article key={content._id} className="surface-card overflow-hidden"><PublicImage src={content.image} alt="" width={640} height={360} sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw" className="aspect-video w-full object-cover" /><div className="p-5"><h2 className="break-words text-xl font-bold">{content.name}</h2>{isSafeHttpUrl(content.link) && <a className="mt-3 inline-block text-brand" href={content.link} target="_blank" rel="noopener noreferrer">İçeriği aç ↗</a>}<div className="mt-5 flex flex-wrap gap-3"><Link href={`/admin/dashboard/contents/edit/${encodeURIComponent(content._id)}`} className="button-secondary" aria-label={`${content.name} düzenle`}>Düzenle</Link><button className="button-secondary" disabled={deleting !== null} onClick={() => remove(content)} aria-label={`${content.name} sil`}>{deleting === content._id ? "Siliniyor…" : "Sil"}</button></div></div></article>)}</div> : <p className="surface-card p-6 text-quiet" role="status">Henüz içerik eklenmemiş.</p>}</section>;
}
