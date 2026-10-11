import type { PublicProject } from "../api/projectPayload";
import { isSafeHttpUrl } from "../api/urlSafety";
import ProjectGallery from "./ProjectGallery";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import type { Locale } from "../i18n/config";

export default function ProjectDetailContent({ project, locale = "tr" }: { project: PublicProject; locale?: Locale }) {
  const en = locale === "en";
  const title = en && project.titleEn ? project.titleEn : project.title;
  const description = en && project.descriptionEn ? project.descriptionEn : project.description;
  const type = project.type === "web" ? (en ? "Web application" : "Web uygulaması") : project.type === "mobile" ? (en ? "Mobile application" : "Mobil uygulama") : (en ? "Software project" : "Yazılım projesi");
  return <article className="grid gap-8">
    <header className="surface-card overflow-hidden p-6 sm:p-10">
      <p className="text-sm font-bold uppercase tracking-widest text-brand">{type}</p>
      <h1 className="mt-3 break-words text-3xl font-bold text-ink sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-3xl whitespace-pre-line break-words text-lg leading-relaxed text-quiet">{description || (en ? "No description has been added yet." : "Bu projenin açıklaması henüz eklenmedi.")}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        {isSafeHttpUrl(project.liveDemoLink) && <a className="button-primary" href={project.liveDemoLink} target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt aria-hidden="true" /> {en ? "Open live project" : "Canlı projeyi aç"}</a>}
        {isSafeHttpUrl(project.repoLink) && <a className="button-secondary" href={project.repoLink} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" /> {en ? "Explore source code" : "Kaynak kodunu incele"}</a>}
      </div>
    </header>
    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <section className="min-w-0" aria-labelledby="project-gallery-title">
        <h2 id="project-gallery-title" className="mb-4 text-xl font-bold text-ink">{en ? "Project images" : "Proje görselleri"}</h2>
        <ProjectGallery key={project._id} images={project.images} title={title} />
      </section>
      <aside className="surface-card p-6" aria-labelledby="project-tech-title">
        <h2 id="project-tech-title" className="text-xl font-bold text-ink">{en ? "Technologies" : "Teknolojiler"}</h2>
        {project.technologies.length ? <ul className="mt-4 flex flex-wrap gap-2">{project.technologies.map(technology => <li key={technology} className="content-tag">{technology}</li>)}</ul> : <p className="mt-3 text-sm text-quiet">{en ? "No technologies have been added yet." : "Teknoloji bilgisi henüz eklenmedi."}</p>}
        <dl className="mt-6 border-t border-line pt-4 text-sm"><dt className="text-quiet">{en ? "Project type" : "Proje türü"}</dt><dd className="mt-1 font-semibold text-ink">{type}</dd><dt className="mt-4 text-quiet">{en ? "Gallery" : "Galeri"}</dt><dd className="mt-1 font-semibold text-ink">{project.images.length} {en ? "images" : "görsel"}</dd></dl>
      </aside>
    </div>
  </article>;
}
