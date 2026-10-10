import ContactForm from "../components/ContactForm";
import SocialBanner from "../components/SocialBanner";
import { createPageMetadata } from "../seo";

export const metadata = createPageMetadata(
  "İletişim",
  "Ömer Öztürk ile yazılım projeleri ve iş birliği fırsatları için iletişime geçin.",
  "/contact",
);

export default function Contact() {
  return (
    <main className="surface-page px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="surface-card flex flex-col items-center justify-center p-7 text-center sm:p-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-brand">İletişime geçelim</p>
          <h1 className="mb-3 text-3xl font-bold text-ink">İletişim</h1>
          <p className="mb-6 max-w-sm text-quiet">
            Bir proje veya iş birliği fikriniz mi var? Mesaj gönderebilir ya da sosyal medya hesaplarımdan ulaşabilirsiniz.
          </p>
          <SocialBanner />
        </section>
        <ContactForm />
      </div>
    </main>
  );
}
