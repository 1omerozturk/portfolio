import { getLocale } from "../../i18n/server";
import { localizedPath } from "../../i18n/config";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import JsonLd from "../../components/JsonLd";
import ProjectDetailContent from "../../components/ProjectDetailContent";
import { fetchPublicProjectRecord } from "../../api/publicData";
import { isSafeImageSource } from "../../api/urlSafety";

type RouteProps = { params: Promise<{ id: string }> };
import { siteConfig } from "../../siteConfig";
const siteUrl = siteConfig.url;

export default async function ProjectDetail({ params }: RouteProps) {
  const { id } = await params;
  const locale = await getLocale();
  const result = await fetchPublicProjectRecord(id);
  if (result.status === "not-found") notFound();

  if (result.status === "unavailable" || typeof result.data.title !== "string") {
    return (
      <main className="surface-page flex min-h-[70vh] items-center justify-center px-4 py-10">
        <section className="surface-card max-w-xl p-8 text-center" role="status">
          <h1 className="text-2xl font-bold text-ink">{locale === "en" ? "Project could not be loaded" : "Proje şu anda yüklenemiyor"}</h1>
          <p className="mt-3 text-quiet">{locale === "en" ? "Please try again later or explore other projects." : "Biraz sonra yeniden deneyebilir veya diğer projelere göz atabilirsiniz."}</p>
          <Link href={localizedPath("/projects", locale)} className="button-primary mt-6">{locale === "en" ? "All projects" : "Tüm projelere dön"}</Link>
        </section>
      </main>
    );
  }

  const project = result.data;
  const title = locale === "en" && project.titleEn ? project.titleEn : project.title;
  const projectUrl = `${siteUrl}${localizedPath(`/projects/${encodeURIComponent(id)}`, locale)}`;
  const images = Array.isArray(project.images)
    ? project.images
        .filter((image): image is string => typeof image === "string")
        .map((image) => image.trim())
        .filter(isSafeImageSource)
    : [];
  const technologies = Array.isArray(project.technologies)
    ? project.technologies.filter((technology): technology is string => typeof technology === "string" && Boolean(technology.trim()))
    : [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: (locale === "en" && project.descriptionEn ? project.descriptionEn : project.description) || undefined,
    url: projectUrl,
    image: images.length ? images : undefined,
    creator: { "@type": "Person", name: "Ömer Öztürk", url: siteUrl },
    keywords: technologies.length ? technologies.join(", ") : undefined,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "en" ? "Home" : "Ana Sayfa", item: `${siteUrl}${localizedPath("/", locale)}` },
      { "@type": "ListItem", position: 2, name: locale === "en" ? "Projects" : "Projeler", item: `${siteUrl}${localizedPath("/projects", locale)}` },
      { "@type": "ListItem", position: 3, name: title, item: projectUrl },
    ],
  };

  return (
    <main className="surface-page min-h-[70vh] px-4 py-10 sm:px-6 lg:py-14">
      <JsonLd value={schema} />
      <JsonLd value={breadcrumb} />
      <div className="mx-auto max-w-6xl">
        <Link href={localizedPath("/projects", locale)} className="mb-6 inline-flex items-center gap-2 font-semibold text-brand hover:underline">
          <FaArrowLeft aria-hidden="true" /> {locale === "en" ? "All projects" : "Tüm projeler"}
        </Link>

        <ProjectDetailContent project={project} locale={locale} />
      </div>
    </main>
  );
}

