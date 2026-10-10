"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { normalizeApiDate } from "../../api/payload";
import { isSafeImageSource } from "../../api/urlSafety";

export type TimelineField = { name: string; label: string; type?: "text" | "date" | "textarea"; required?: boolean; image?: boolean };
type Values = Record<string, string>;
type Props = {
  title: string;
  returnPath: string;
  fields: TimelineField[];
  record?: Record<string, unknown>;
  listName: string;
  listLabel: string;
  save: (values: Values, entries: string[]) => Promise<{ status: number } | null | undefined>;
};

export default function TimelineForm({ title, returnPath, fields, record, listName, listLabel, save }: Props) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(() => Object.fromEntries(fields.map(field => {
    const value = record?.[field.name];
    return [field.name, field.type === "date" ? normalizeApiDate(value)?.slice(0, 10) ?? "" : typeof value === "string" ? value : ""];
  })));
  const [entries, setEntries] = useState(() => {
    const value = record?.[listName];
    return Array.isArray(value) ? value.filter(item => typeof item === "string").join("\n") : "";
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const payload = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
    if (fields.some(field => (field.required && !payload[field.name]) || (field.image && payload[field.name] && !isSafeImageSource(payload[field.name])))) {
      setError("Zorunlu alanları ve görsel adresini kontrol edin."); return;
    }
    if (payload.endDate && payload.startDate && payload.endDate < payload.startDate) {
      setError("Bitiş tarihi başlangıç tarihinden önce olamaz."); return;
    }
    setSaving(true); setError("");
    try {
      const response = await save(payload, entries.split("\n").map(value => value.trim()).filter(Boolean));
      if (response && response.status >= 200 && response.status < 300) { router.push(returnPath); router.refresh(); }
      else setError("Kayıt kaydedilemedi. Lütfen yeniden deneyin.");
    } catch { setError("Kayıt kaydedilemedi. Lütfen yeniden deneyin."); }
    finally { setSaving(false); }
  }
  return <section className="mx-auto max-w-2xl"><Link className="button-secondary mb-6" href={returnPath}>Listeye dön</Link><h1 className="mb-6 text-3xl font-bold">{title}</h1><form onSubmit={submit} className="surface-card grid gap-5 p-5 sm:p-8" aria-busy={saving}><fieldset disabled={saving} className="grid min-w-0 gap-5"><legend className="sr-only">Kayıt bilgileri</legend>{fields.map(field => <div key={field.name}><label htmlFor={`timeline-${field.name}`} className="mb-2 block font-semibold">{field.label}</label>{field.type === "textarea" ? <textarea id={`timeline-${field.name}`} className="form-field" rows={4} value={values[field.name]} onChange={event => setValues(previous => ({ ...previous, [field.name]: event.target.value }))} /> : <input id={`timeline-${field.name}`} className="form-field" type={field.type ?? "text"} value={values[field.name]} required={field.required} onChange={event => setValues(previous => ({ ...previous, [field.name]: event.target.value }))} />}{field.name === "endDate" && <p className="mt-2 text-sm text-quiet">Devam ediyorsa boş bırakın.</p>}</div>)}<div><label className="mb-2 block font-semibold" htmlFor="timeline-list">{listLabel}</label><textarea id="timeline-list" className="form-field" rows={4} value={entries} onChange={event => setEntries(event.target.value)} aria-describedby="timeline-list-help" /><p id="timeline-list-help" className="mt-2 text-sm text-quiet">Her maddeyi ayrı satıra yazın.</p></div></fieldset>{error && <p role="alert" className="text-danger">{error}</p>}<button className="button-primary" type="submit" disabled={saving}>{saving ? "Kaydediliyor…" : "Kaydet"}</button></form></section>;
}
