import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import JsonLd from "../../components/JsonLd";
import PublicImage from "../../components/PublicImage";
import { fetchPublicProjectRecord } from "../../api/publicData";
import { isSafeHttpUrl, isSafeImageSource } from "../../api/urlSafety";

type RouteProps = { params: Promise<{ id: string }> };
import { siteConfig } from "../../siteConfig";
const siteUrl = siteConfig.url;

export default async function ProjectDetail({ params }: RouteProps) {
  const { id } = await params;
  const result = await fetchPublicProjectRecord(id);
  if (result.status === "not-found") notFound();

  if (result.status === "unavailable" || typeof result.data.title !== "string") {
    return (
      <main className="surface-page flex min-h-[70vh] items-center justify-center px-4 py-10">
        <section className="surface-card max-w-xl p-8 text-center" role="status">
          <h1 className="text-2xl font-bold text-ink">Proje şu anda yüklenemiyor</h1>
          <p className="mt-3 text-quiet">Biraz sonra yeniden deneyebilir veya diğer projelere göz atabilirsiniz.</p>
          <Link href="/projects" className="button-primary mt-6">Tüm projelere dön</Link>
        </section>
      </main>
    );
  }

  const project = result.data;
  const title = project.title;
  const projectUrl = `${siteUrl}/projects/${encodeURIComponent(id)}`;
  const images = Array.isArray(project.images)
    ? project.images
        .filter((image): image is string => typeof image === "string")
        .map((image) => image.split(",")[0]?.trim())
        .filter(isSafeImageSource)
    : [];
  const technologies = Array.isArray(project.technologies)
    ? project.technologies.filter((technology): technology is string => typeof technology === "string" && Boolean(technology.trim()))
    : [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: project.description || undefined,
    url: projectUrl,
    image: images.length ? images : undefined,
    creator: { "@type": "Person", name: "Ömer Öztürk", url: siteUrl },
    keywords: technologies.length ? technologies.join(", ") : undefined,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Projeler", item: `${siteUrl}/projects` },
      { "@type": "ListItem", position: 3, name: title, item: projectUrl },
    ],
  };

  return (
    <main className="surface-page min-h-[70vh] px-4 py-10 sm:px-6 lg:py-14">
      <JsonLd value={schema} />
      <JsonLd value={breadcrumb} />
      <div className="mx-auto max-w-5xl">
        <Link href="/projects" className="mb-6 inline-flex items-center gap-2 font-semibold text-brand hover:underline">
          <FaArrowLeft aria-hidden="true" /> Tüm projeler
        </Link>

        <article className="surface-card p-6 sm:p-9">
          <header className="mb-7">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-brand">{project.type || "Proje"}</p>
            <h1 className="break-words text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
            {typeof project.description === "string" && project.description && <p className="mt-4 max-w-3xl break-words text-lg leading-relaxed text-quiet">{project.description}</p>}
          </header>

          {technologies.length > 0 && (
            <section className="mb-7" aria-labelledby="project-technologies">
              <h2 id="project-technologies" className="mb-3 text-lg font-bold text-ink">Kullanılan teknolojiler</h2>
              <ul className="flex flex-wrap gap-2">
                {technologies.map((technology, index) => <li className="content-tag" key={`${technology}-${index}`}>{technology}</li>)}
              </ul>
            </section>
          )}

          <div className="mb-8 flex flex-wrap gap-3">
            {isSafeHttpUrl(project.repoLink) && (
              <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="button-secondary">
                <FaGithub aria-hidden="true" /> Kaynak kodu
              </a>
            )}
            {isSafeHttpUrl(project.liveDemoLink) && (
              <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="button-primary">
                <FaExternalLinkAlt aria-hidden="true" /> Canlı demo
              </a>
            )}
          </div>

          {images.length > 0 && (
            <section aria-labelledby="project-gallery">
              <h2 id="project-gallery" className="mb-4 text-lg font-bold text-ink">Proje görselleri</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {images.map((image, index) => (
                  <a className="project-gallery__item" key={`${image}-${index}`} href={image} target="_blank" rel="noopener noreferrer" aria-label={`${title} görselini yeni sekmede aç`}>
                    <PublicImage src={image} alt={`${title} ekran görüntüsü ${index + 1}`} width={1200} height={800} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 480px" className="project-gallery__image" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </main>
  );
}
