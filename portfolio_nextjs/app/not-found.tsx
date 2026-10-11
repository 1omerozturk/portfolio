import Link from "next/link";
import { getLocale } from "./i18n/server";
import { localizedPath } from "./i18n/config";

export default async function NotFound() {
  const locale = await getLocale();
  const en = locale === "en";
  return <main className="surface-page flex min-h-[65vh] items-center justify-center px-4 py-12">
    <section className="surface-card w-full max-w-lg p-8 text-center sm:p-12">
      <p className="mb-3 text-sm font-bold tracking-widest text-brand">404</p>
      <h1 className="text-3xl font-bold text-ink">{en ? "Page not found" : "Sayfa bulunamadı"}</h1>
      <p className="mt-4 text-quiet">{en ? "This page may have moved or no longer exists." : "Bu sayfa taşınmış veya kaldırılmış olabilir."}</p>
      <Link href={localizedPath("/", locale)} className="button-primary mt-6">{en ? "Back to home" : "Ana sayfaya dön"}</Link>
    </section>
  </main>;
}
