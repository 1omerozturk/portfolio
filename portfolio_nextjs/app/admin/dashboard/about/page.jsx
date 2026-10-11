"use client";
import AdminPageHeading from "../../components/AdminPageHeading";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getPersonalInfo } from "../../../api/api";
import { normalizeApiRecords, unwrapApiData } from "../../../api/payload";
import AdminContentIcon from "../../components/AdminContentIcon";

export default function AboutDashboard() {
  const [result, setResult] = useState(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    getPersonalInfo().then(response => {
      const payload = unwrapApiData(response.data);
      if (!Array.isArray(payload)) throw new Error("Invalid profile");
      if (active) setResult({ attempt, records: normalizeApiRecords(payload) });
    }).catch(() => { if (active) setResult({ attempt, records: null }); });
    return () => { active = false; };
  }, [attempt]);
  const text = value => typeof value === "string" ? value : "";
  return <section><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><AdminPageHeading className="text-3xl font-bold">Kişisel bilgiler</AdminPageHeading><Link className="button-primary" href="/admin/dashboard/about/edit">Bilgileri düzenle</Link></div>
    {!result || result.attempt !== attempt ? <p role="status">Bilgiler yükleniyor…</p> : !result.records ? <div className="surface-card p-6" role="alert"><p>Bilgiler yüklenemedi.</p><button className="button-secondary mt-4" onClick={() => setAttempt(value => value + 1)}>Yeniden dene</button></div> : !result.records.length ? <p className="surface-card p-6">Henüz kişisel bilgi kaydı yok. Düzenle ekranından ekleyebilirsiniz.</p> : <div className="grid gap-5">{result.records.map(record => <article key={record._id} className="surface-card p-6"><div className="mb-3"><AdminContentIcon kind="about" image={record.profilePicture} /></div><h2 className="text-2xl font-bold">{text(record.fullName)}</h2><p className="mt-2 text-quiet">{text(record.jobTitle)}</p><p className="mt-4 whitespace-pre-wrap">{text(record.about)}</p><p className="mt-4 break-words">{text(record.email)} · {text(record.phone)}</p><p className="text-quiet">{text(record.address)}</p><Link className="button-secondary mt-4" href={"/admin/dashboard/about/edit?id=" + encodeURIComponent(record._id)}>Bu kaydı düzenle</Link></article>)}</div>}
  </section>;
}


