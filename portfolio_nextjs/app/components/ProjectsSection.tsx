import Link from "next/link";
import { FaGithub, FaGlobe, FaLightbulb } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";
import { isSafeHttpUrl } from "../api/urlSafety";
import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";

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
  const image = source?.split(",")[0]?.trim();
  return isSafeHttpUrl(image) || Boolean(image?.startsWith("/") && !image.startsWith("//")) ? image : "";
}

export default async function ProjectsSection({ size }: ProjectsProps) {
  const result = await fetchPublicList<Project>("/user/projects", ["projects", "items"]);
  const validProjects = result.status === "ok"
    ? result.items.filter((project) => project && typeof project._id === "string" && project._id.trim() && typeof project.title === "string")
    : [];
  const featuredProjects = validProjects.filter(
    (project) => project.isShowcasing == null || project.isShowcasing === true || project.isShowcasing === "true",
  );
  const displayedProjects = (size ? featuredProjects : validProjects).slice(0, size ?? validProjects.length);
  const CardHeading = size ? "h3" : "h2";

  return (
    <section className="surface-page px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="Projeler" level={size ? 2 : 1} icon={<FaLightbulb />} />

        {displayedProjects.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayedProjects.map((project) => {
              const coverImage = getCoverImage(project);
              return (
                <article className="surface-card group overflow-hidden" key={project._id}>
                  {coverImage ? (
                    <div className="project-card__image-wrap">
                      <img src={coverImage} alt={`${project.title} proje önizlemesi`} width="960" height="540" className="project-card__image" loading="lazy" decoding="async" />
                    </div>
                  ) : (
                    <div className="project-card__image-placeholder" aria-hidden="true"><FaLightbulb /></div>
                  )}

                  <div className="flex h-full flex-col p-5 sm:p-6">
                    <CardHeading className="mb-2 text-xl font-bold text-ink transition-colors group-hover:text-brand">{project.title}</CardHeading>
                    <p className="mb-5 line-clamp-3 flex-1 text-quiet">{project.description || "Proje ayrıntılarını proje sayfasında inceleyebilirsiniz."}</p>
                    <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
                      <Link href={`/projects/${encodeURIComponent(project._id)}`} className="font-semibold text-brand hover:underline">
                        Proje ayrıntıları <span aria-hidden="true">→</span>
                      </Link>
                      <div className="flex items-center gap-3">
                        {isSafeHttpUrl(project.repoLink) && (
                          <a aria-label={`${project.title} GitHub deposu`} href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-card__icon-link"><FaGithub aria-hidden="true" /></a>
                        )}
                        {isSafeHttpUrl(project.liveDemoLink) && (
                          <a aria-label={`${project.title} canlı demosu`} href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="project-card__icon-link"><FaGlobe aria-hidden="true" /></a>
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
              {result.status === "unavailable" ? "Projeler şu anda yüklenemiyor." : "Henüz gösterilecek proje bulunmuyor."}
            </p>
            {result.status === "unavailable" && <p className="mt-2 text-quiet">Lütfen biraz sonra yeniden deneyin.</p>}
          </div>
        )}

        {size && featuredProjects.length > size && <div className="mt-10"><SeeMore path="projects" /></div>}
      </div>
    </section>
  );
}
