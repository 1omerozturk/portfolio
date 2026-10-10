"use client";
import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SocialService, type SocialInput } from "../../../service/socialService";
import { isSafeHttpUrl } from "../../../../api/urlSafety";

const icons = ["LinkedIn", "GitHub", "YouTube", "Instagram", "Twitter", "Facebook", "HackerRank", "Medium"];
export default function SocialAdd({ social }: { social?: SocialInput & { _id: string } }) {
  const router = useRouter();
  const [data, setData] = useState<SocialInput>({ name: social?.name ?? "", url: social?.url ?? "", icon: social?.icon ?? "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const payload = { name: data.name.trim(), url: data.url.trim(), icon: data.icon?.trim() ?? "" };
    if (!payload.name || !isSafeHttpUrl(payload.url)) { setError("Ad ve geçerli bir HTTP/HTTPS bağlantısı girin."); return; }
    setSaving(true); setError("");
    try {
      const response = social ? await SocialService.updateSocialLink(social._id, payload) : await SocialService.addSocialLink(payload);
      if (response?.status === 200 || response?.status === 201) { router.push("/admin/dashboard/social"); router.refresh(); }
      else setError("Bağlantı kaydedilemedi. Lütfen yeniden deneyin.");
    } catch { setError("Bağlantı kaydedilemedi. Lütfen yeniden deneyin."); }
    finally { setSaving(false); }
  }
  return <section className="mx-auto max-w-2xl"><Link className="button-secondary mb-6" href="/admin/dashboard/social">Sosyal bağlantılara dön</Link><h1 className="mb-6 text-3xl font-bold">{social ? "Sosyal bağlantıyı düzenle" : "Sosyal bağlantı ekle"}</h1><form onSubmit={submit} className="surface-card grid gap-5 p-5 sm:p-8" aria-busy={saving}><fieldset disabled={saving} className="grid min-w-0 gap-5"><legend className="sr-only">Sosyal bağlantı bilgileri</legend><div><label className="mb-2 block font-semibold" htmlFor="social-name">Ad</label><input className="form-field" id="social-name" value={data.name} maxLength={100} required onChange={event => setData(previous => ({ ...previous, name: event.target.value }))} /></div><div><label className="mb-2 block font-semibold" htmlFor="social-url">Profil bağlantısı</label><input className="form-field" id="social-url" type="url" value={data.url} maxLength={2048} required onChange={event => setData(previous => ({ ...previous, url: event.target.value }))} /></div><div><label className="mb-2 block font-semibold" htmlFor="social-icon">İkon</label><input className="form-field" id="social-icon" value={data.icon} list="social-icons" onChange={event => setData(previous => ({ ...previous, icon: event.target.value }))} /><datalist id="social-icons">{icons.map(icon => <option key={icon} value={icon} />)}</datalist></div></fieldset>{error && <p role="alert" className="text-danger">{error}</p>}<button type="submit" disabled={saving} className="button-primary">{saving ? "Kaydediliyor…" : "Kaydet"}</button></form></section>;
}
