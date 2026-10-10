"use client";
import { useEffect, useState } from "react";
import { AdminAuth } from "./auth";
import { usePathname, useRouter } from "next/navigation";
import AdminSideBar from "./components/AdminSideBar";
import Login from "./login/page";
import Loading from "./components/Loading";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  const key = `${pathname}:${attempt}`;
  useEffect(() => {
    let active = true;
    AdminAuth.isLoggedIn().then(auth => { if (active) setResult({ key, status: auth ? "authenticated" : "anonymous" }); }).catch(() => { if (active) setResult({ key, status: "unavailable" }); });
    return () => { active = false; };
  }, [key]);
  async function logout() {
    await AdminAuth.logout();
    setResult({ key, status: "anonymous" });
    router.replace("/admin/login");
  }
  if (result?.key !== key) return <Loading />;
  if (result.status === "unavailable") return <main className="surface-page min-h-screen p-6"><section className="surface-card mx-auto max-w-xl p-6" role="status"><h1 className="text-2xl font-bold">Yönetim bağlantısı kurulamadı</h1><p className="my-4 text-quiet">API erişimini kontrol edip yeniden deneyin.</p><button className="button-primary" onClick={() => setAttempt(value => value + 1)}>Yeniden dene</button></section></main>;
  if (result.status === "anonymous") return pathname === "/admin/passwordReset" ? children : <Login />;
  return <div className="surface-page flex min-h-screen flex-col text-ink md:flex-row"><AdminSideBar onLogout={logout} /><div className="min-w-0 flex-1 p-4 sm:p-6">{children}</div></div>;
}
