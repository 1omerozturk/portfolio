import { getLocale } from "../i18n/server";
import { localizedPath } from "../i18n/config";
import { normalizeProject } from "../api/projectPayload";
import Link from "next/link";
import { FaGithub, FaGlobe, FaLightbulb } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";
import { isSafeHttpUrl } from "../api/urlSafety";
import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";
import ContentMark from "./ContentMark";

type Project = {
  _id: string;
  title: string;
  description?: string;
  images?: string[];
  repoLink?: string;
  liveDemoLink?: string;
  isShowcasing?: boolean | string;
};

interface ProjectsProps {
  size?: number;
}

function getCoverImage(project: Project) {
  const source = Array.isArray(project.images) ? project.images.find((image) => typeof image === "string") : undefined;
  const image = source?.trim();
  return isSafeHttpUrl(image) || Boolean(image?.startsWith("/") && !image.startsWith("//")) ? image : "";
}

export default async function ProjectsSection({ size }: ProjectsProps) {
  const locale = await getLocale();
  const en = locale === "en";
  const result = await fetchPublicList("/user/projects", ["projects", "items"]);
  const validProjects = result.status === "ok"
    ? result.items.map(normalizeProject).filter((project) => project !== null)
    : [];
  const featuredProjects = validProjects.filter(
    (project) => project.isShowcasing,
  );
  const displayedProjects = (size ? featuredProjects : validProjects).slice(0, size ?? validProjects.length);
  const CardHeading = size ? "h3" : "h2";

  return (
    <section className="surface-page px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader title={en ? "Projects" : "Projeler"} level={size ? 2 : 1} icon={<FaLightbulb />} />

        {displayedProjects.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayedProjects.map((project) => {
              const coverImage = getCoverImage(project);
              const title = en && project.titleEn ? project.titleEn : project.title;
              const description = en && project.descriptionEn ? project.descriptionEn : project.description;
              return (
                <article className="surface-card group overflow-hidden" key={project._id}>
                  

                  <div className="flex flex-col p-5 sm:p-6"><div className="mb-3"><ContentMark kind="projects" image={coverImage} /></div>
                    <CardHeading className="mb-2 text-xl font-bold text-ink transition-colors group-hover:text-brand"><Link href={localizedPath(`/projects/${encodeURIComponent(project._id)}`, locale)}>{title}</Link></CardHeading>
                    <p className="mb-5 line-clamp-3 flex-1 text-quiet">{description || (en ? "Explore this project in detail." : "Proje ayrıntılarını proje sayfasında inceleyebilirsiniz.")}</p>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
                      <Link href={localizedPath(`/projects/${encodeURIComponent(project._id)}`, locale)} className="button-secondary">
                        {en ? "Project details" : "Proje ayrıntıları"} <span aria-hidden="true">→</span>
                      </Link>
                      <div className="flex items-center gap-3">
                        {isSafeHttpUrl(project.repoLink) && (
                          <a aria-label={en ? `${title} GitHub repository` : `${title} GitHub deposu`} href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-card__icon-link"><FaGithub aria-hidden="true" /></a>
                        )}
                        {isSafeHttpUrl(project.liveDemoLink) && (
                          <a aria-label={en ? `${title} live demo` : `${title} canlı demosu`} href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="project-card__icon-link"><FaGlobe aria-hidden="true" /></a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="surface-card mx-auto max-w-2xl p-8 text-center" role="status">
            <p className="text-lg font-semibold text-ink">
              {result.status === "unavailable" ? (en ? "Projects could not be loaded." : "Projeler şu anda yüklenemiyor.") : (en ? "No projects yet." : "Henüz gösterilecek proje bulunmuyor.")}
            </p>
            {result.status === "unavailable" && <p className="mt-2 text-quiet">{en ? "Please try again later." : "Lütfen biraz sonra yeniden deneyin."}</p>}
          </div>
        )}

        {size && featuredProjects.length > size && <div className="mt-10"><SeeMore path="projects" /></div>}
      </div>
    </section>
  );
}




