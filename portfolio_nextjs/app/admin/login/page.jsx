"use client";
import AdminPageHeading from "../components/AdminPageHeading";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminAuth } from "../auth";
import ThemeToggle from "../../components/ThemeToggle";

export default function Login() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function submit(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true); setError("");
    try {
      const response = await AdminAuth.login(username.trim(), password);
      if (response?.status === 200) { router.replace("/admin/dashboard"); router.refresh(); }
      else setError("Giriş yapılamadı. Kullanıcı adı, şifre ve API bağlantısını kontrol edin.");
    } catch { setError("Giriş yapılamadı. Lütfen yeniden deneyin."); }
    finally { setLoading(false); }
  }
  return <main className="surface-page flex min-h-screen items-center justify-center px-4 py-10"><section className="surface-card w-full max-w-md p-6 sm:p-8"><div className="mb-6 flex items-center justify-between gap-3"><AdminPageHeading className="text-2xl font-bold">Yönetim girişi</AdminPageHeading><ThemeToggle /></div><form onSubmit={submit} className="grid gap-5" aria-busy={loading}><fieldset className="grid min-w-0 gap-5" disabled={loading}><legend className="sr-only">Giriş bilgileri</legend><div><label htmlFor="admin-username" className="mb-2 block font-semibold">Kullanıcı adı</label><input id="admin-username" name="username" className="form-field" autoComplete="username" value={username} onChange={event => setUsername(event.target.value)} required maxLength={100} /></div><div><label htmlFor="admin-password" className="mb-2 block font-semibold">Şifre</label><div className="flex gap-2"><input id="admin-password" name="password" className="form-field min-w-0 flex-1" type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required /><button className="button-secondary" type="button" aria-pressed={show} aria-controls="admin-password" onClick={() => setShow(value => !value)}>{show ? "Gizle" : "Göster"}</button></div></div></fieldset>{error && <p role="alert" className="text-danger">{error}</p>}<button className="button-primary" type="submit" disabled={loading}>{loading ? "Giriş yapılıyor…" : "Giriş yap"}</button></form><div className="mt-6 flex flex-wrap justify-between gap-3"><Link href="/admin/passwordReset" className="text-brand">Şifre değiştir</Link><Link href="/" className="text-brand">Siteye dön</Link></div></section></main>;
}
