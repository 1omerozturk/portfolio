"use client";
import { useState, type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import { AdminProjectService } from "../service/projectService";
import { type PublicProject } from "../../api/projectPayload";
import { isSafeHttpUrl } from "../../api/urlSafety";
import AdminContentIcon from "./AdminContentIcon";

export default function ProjectComponent({ projects, setProjects }: { projects: PublicProject[]; setProjects: Dispatch<SetStateAction<PublicProject[]>> }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [error, setError] = useState("");
  async function remove(project: PublicProject) {
    if (deleting || !window.confirm(`${project.title} projesi silinsin mi?`)) return;
    setDeleting(project._id); setError("");
    try {
      const response = await AdminProjectService.deleteProject(project._id);
      if (response && response.status >= 200 && response.status < 300) setProjects(previous => previous.filter(item => item._id !== project._id));
      else setError("Proje silinemedi. Lütfen yeniden deneyin.");
    } catch { setError("Proje silinemedi. Lütfen yeniden deneyin."); }
    finally { setDeleting(null); }
  }
  return <>{error && <p role="alert" className="mb-4 text-danger">{error}</p>}<div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{projects.map(project => <article className="surface-card overflow-hidden" key={project._id}><div className="p-5"><div className="mb-3"><AdminContentIcon kind="projects" image={project.images[0]} /></div><h2 className="break-words text-xl font-bold">{project.title}</h2><p className="mt-2 text-sm text-quiet">{project.type}{project.isShowcasing ? " · Ana sayfada gösteriliyor" : ""}</p><p className="my-4 line-clamp-3 break-words text-quiet">{project.description}</p><div className="flex flex-wrap gap-3">{isSafeHttpUrl(project.repoLink) && <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="text-brand">Kaynak kod ↗</a>}{isSafeHttpUrl(project.liveDemoLink) && <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="text-brand">Canlı demo ↗</a>}</div><div className="mt-5 flex flex-wrap gap-3"><Link href={"/admin/dashboard/projects/" + encodeURIComponent(project._id)} className="button-secondary" aria-label={project.title + " detayları"}>Detaylar</Link><Link href={`/admin/dashboard/projects/edit/${encodeURIComponent(project._id)}`} className="button-secondary" aria-label={`${project.title} düzenle`}>Düzenle</Link><button className="button-secondary" disabled={deleting !== null} onClick={() => remove(project)} aria-label={`${project.title} sil`}>{deleting === project._id ? "Siliniyor…" : "Sil"}</button></div></div></article>)}</div></>;
}


