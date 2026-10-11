"use client";
import AdminPageHeading from "../../../components/AdminPageHeading";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminProjectService } from "../../../service/projectService";
import { normalizeProject } from "../../../../api/projectPayload";
import ProjectDetailContent from "../../../../components/ProjectDetailContent";
import Loading from "../../../components/Loading";

export default function ProjectDetail() {
  const { id } = useParams();
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  const requestKey = String(id) + ":" + attempt;
  useEffect(() => {
    let active = true;
    AdminProjectService.getProject(String(id)).then(response => {
      if (active) setResult({ key: requestKey, project: normalizeProject(response?.data) });
    });
    return () => { active = false; };
  }, [id, requestKey]);
  if (!result || result.key !== requestKey) return <Loading />;
  if (!result.project) return <section className="surface-card p-6" role="status">
    <AdminPageHeading className="text-2xl font-bold text-ink">Proje yüklenemedi</AdminPageHeading>
    <p className="mt-3 text-quiet">Kayıt kaldırılmış olabilir veya API bağlantısı kurulamıyor.</p>
    <div className="mt-5 flex flex-wrap gap-3"><button className="button-primary" onClick={() => setAttempt(value => value + 1)}>Yeniden dene</button><Link className="button-secondary" href="/admin/dashboard/projects">Projelere dön</Link></div>
  </section>;
  const project = result.project;
  return <div className="mx-auto max-w-6xl py-4">
    <nav aria-label="Proje yönetimi" className="mb-6 flex flex-wrap gap-3">
      <Link className="button-secondary" href="/admin/dashboard/projects">Tüm projeler</Link>
      <Link className="button-primary" href={"/admin/dashboard/projects/edit/" + encodeURIComponent(project._id)}>Projeyi düzenle</Link>
      <Link className="button-secondary" href={"/projects/" + encodeURIComponent(project._id)} target="_blank" rel="noopener noreferrer">Ziyaretçi görünümünü aç</Link>
    </nav>
    <p className="mb-5 text-sm font-semibold text-quiet">{project.isShowcasing ? "Ana sayfada gösteriliyor" : "Ana sayfa vitrini kapalı"}</p>
    <ProjectDetailContent project={project} />
  </div>;
}
