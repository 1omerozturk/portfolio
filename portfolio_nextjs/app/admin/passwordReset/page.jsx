"use client";
import AdminPageHeading from "../components/AdminPageHeading";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminAuth } from "../auth";
import ThemeToggle from "../../components/ThemeToggle";

export default function PasswordResetPage() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", rePassword: "", confirmation: "" });
  async function submit(event) {
    event.preventDefault();
    if (saving) return;
    if (form.rePassword !== form.confirmation) { setError("Yeni şifreler eşleşmiyor."); return; }
    if (form.rePassword.length < 8) { setError("Yeni şifre en az 8 karakter olmalıdır."); return; }
    setSaving(true); setError("");
    try {
      const response = await AdminAuth.resetPassword(form.username.trim(), form.password, form.rePassword);
      if (response?.status === 200) { setDone(true); setForm({ username: "", password: "", rePassword: "", confirmation: "" }); }
      else setError("Şifre değiştirilemedi. Mevcut şifrenizi ve API bağlantısını kontrol edin.");
    } catch { setError("Şifre değiştirilemedi. Lütfen yeniden deneyin."); }
    finally { setSaving(false); }
  }
  return <main className="surface-page px-4 py-10"><section className="surface-card mx-auto max-w-lg p-6 sm:p-8"><div className="mb-4 flex items-center justify-between gap-3"><AdminPageHeading className="text-2xl font-bold">Şifre değiştir</AdminPageHeading><ThemeToggle /></div>{done ? <div role="status"><p className="my-5">Şifreniz güncellendi. Yeni şifrenizle tekrar giriş yapın.</p><button className="button-primary" onClick={() => { router.replace("/admin/login"); router.refresh(); }}>Girişe dön</button></div> : <><p className="mb-6 text-quiet">Mevcut şifrenizi doğrulayın. Şifre değiştiğinde açık oturumlar sonlandırılır.</p><form className="grid gap-5" onSubmit={submit} aria-busy={saving}><fieldset disabled={saving} className="grid min-w-0 gap-5"><legend className="sr-only">Şifre bilgileri</legend>{[{ name: "username", label: "Kullanıcı adı", autoComplete: "username" }, { name: "password", label: "Mevcut şifre", autoComplete: "current-password" }, { name: "rePassword", label: "Yeni şifre", autoComplete: "new-password" }, { name: "confirmation", label: "Yeni şifre tekrar", autoComplete: "new-password" }].map(field => <div key={field.name}><label htmlFor={`password-${field.name}`} className="mb-2 block font-semibold">{field.label}</label><input id={`password-${field.name}`} className="form-field" name={field.name} type={field.name === "username" || show ? "text" : "password"} autoComplete={field.autoComplete} value={form[field.name]} onChange={event => setForm(previous => ({ ...previous, [field.name]: event.target.value }))} minLength={field.autoComplete === "new-password" ? 8 : undefined} required /></div>)}<button type="button" className="button-secondary" aria-pressed={show} onClick={() => setShow(value => !value)}>{show ? "Şifreleri gizle" : "Şifreleri göster"}</button></fieldset>{error && <p role="alert" className="text-danger">{error}</p>}<button type="submit" className="button-primary" disabled={saving}>{saving ? "Güncelleniyor…" : "Şifreyi güncelle"}</button></form></>}<Link href="/admin/login" className="mt-6 inline-block text-brand">Giriş sayfası</Link></section></main>;
}
