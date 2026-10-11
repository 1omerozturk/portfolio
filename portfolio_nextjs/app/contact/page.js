import { getLocale } from "../i18n/server";
import ContactForm from "../components/ContactForm";
import SocialBanner from "../components/SocialBanner";
import { createLocalizedPageMetadata } from "../i18n/metadata";
import { getPublicProfile } from "../api/personalInfo";

export async function generateMetadata() { return createLocalizedPageMetadata(
  "İletişim",
  "Ömer Öztürk ile yazılım projeleri ve iş birliği fırsatları için iletişime geçin.",
  "/contact",
); }

export default async function Contact() {
  const en = (await getLocale()) === "en";
  const profile = await getPublicProfile();
  return (
    <main className="surface-page px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="surface-card flex flex-col items-center justify-center p-7 text-center sm:p-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-brand">{en ? "Let us talk" : "İletişime geçelim"}</p>
          <h1 className="mb-3 text-3xl font-bold text-ink">{en ? "Contact" : "İletişim"}</h1>
          <p className="mb-6 max-w-sm text-quiet">
            {en ? "Have a project or collaboration in mind? Send a message or reach me through my social profiles." : "Bir proje veya iş birliği fikriniz mi var? Mesaj gönderebilir ya da sosyal medya hesaplarımdan ulaşabilirsiniz."}
          </p>
          {(profile.email || profile.phone) && <address className="mb-6 grid gap-3 not-italic">
            {profile.email && <a className="break-all text-brand underline" href={`mailto:${profile.email}`}>{profile.email}</a>}
            {profile.phone && <a className="text-brand underline" href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}>{profile.phone}</a>}
          </address>}
          <SocialBanner />
        </section>
        <ContactForm />
      </div>
    </main>
  );
}
