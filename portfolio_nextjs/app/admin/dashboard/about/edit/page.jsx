"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createPersonalInfo, getPersonalInfo, updatePersonalInfo } from "../../../../api/api";
import { normalizeApiRecords, unwrapApiData } from "../../../../api/payload";
import { isSafeImageSource } from "../../../../api/urlSafety";

const fields = [
  { name: "fullName", label: "Ad soyad", required: true },
  { name: "jobTitle", label: "Meslek / unvan", required: true },
  { name: "email", label: "E-posta", required: true, type: "email" },
  { name: "phone", label: "Telefon", type: "tel" },
  { name: "address", label: "Adres" },
  { name: "about", label: "Hakkında", multiline: true },
  { name: "profilePicture", label: "Profil görseli adresi" },
];
export default function PersonalInfoUpdate() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    const selected = new URLSearchParams(window.location.search).get("id");
    getPersonalInfo().then(response => {
      const payload = unwrapApiData(response.data);
      if (!Array.isArray(payload)) throw new Error("Invalid collection");
      const records = normalizeApiRecords(payload);
      const record = selected ? records.find(item => item._id === selected) : records[0];
      if (selected && !record) throw new Error("Missing record");
      if (active) setLoaded({ attempt, record: record ?? {}, error: false });
    }).catch(() => { if (active) setLoaded({ attempt, record: null, error: true }); });
    return () => { active = false; };
  }, [attempt]);
  if (!loaded || loaded.attempt !== attempt) return <p role="status">Bilgiler yükleniyor…</p>;
  if (loaded.error) return <section className="surface-card p-6"><h1 className="text-2xl font-bold">Bilgiler yüklenemedi</h1><button className="button-secondary mt-4" onClick={() => setAttempt(value => value + 1)}>Yeniden dene</button></section>;
  return <ProfileForm key={loaded.record._id ?? "new"} record={loaded.record} router={router} />;
}
function ProfileForm({ record, router }) {
  const [data, setData] = useState(Object.fromEntries(fields.map(field => [field.name, typeof record[field.name] === "string" ? record[field.name] : ""])));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    if (saving) return;
    const payload = Object.fromEntries(Object.entries(data).map(([field, value]) => [field, value.trim()]));
    if (!payload.fullName || !payload.jobTitle || !/^\S+@\S+\.\S+$/.test(payload.email) || (payload.profilePicture && !isSafeImageSource(payload.profilePicture))) { setError("Zorunlu alanları, e-posta ve görsel adresini kontrol edin."); return; }
    setSaving(true); setError("");
    try {
      const response = record._id ? await updatePersonalInfo(record._id, payload) : await createPersonalInfo(payload);
      if (response.status >= 200 && response.status < 300) { router.push("/admin/dashboard/about"); router.refresh(); }
      else setError("Bilgiler kaydedilemedi.");
    } catch { setError("Bilgiler kaydedilemedi. Lütfen yeniden deneyin."); }
    finally { setSaving(false); }
  }
  return <section className="mx-auto max-w-2xl"><Link className="button-secondary mb-6" href="/admin/dashboard/about">Bilgilere dön</Link><h1 className="mb-6 text-3xl font-bold">{record._id ? "Kişisel bilgileri düzenle" : "Kişisel bilgi ekle"}</h1><form className="surface-card grid gap-5 p-5 sm:p-8" onSubmit={submit} aria-busy={saving}><fieldset disabled={saving} className="grid min-w-0 gap-5"><legend className="sr-only">Kişisel bilgiler</legend>{fields.map(field => <div key={field.name}><label htmlFor={"profile-" + field.name} className="mb-2 block font-semibold">{field.label}</label>{field.multiline ? <textarea id={"profile-" + field.name} className="form-field" rows={6} maxLength={10000} value={data[field.name]} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} /> : <input id={"profile-" + field.name} className="form-field" type={field.type ?? "text"} required={field.required} maxLength={field.name === "profilePicture" ? 2048 : 500} value={data[field.name]} onChange={event => setData(previous => ({ ...previous, [field.name]: event.target.value }))} />}</div>)}</fieldset>{error && <p role="alert" className="text-danger">{error}</p>}<button className="button-primary" type="submit" disabled={saving}>{saving ? "Kaydediliyor…" : "Kaydet"}</button></form></section>;
}
