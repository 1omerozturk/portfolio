"use client";
import AdminPageHeading from "../../../../components/AdminPageHeading";
import { useEffect, useState } from "react";
import { AdminProjectService } from "../../../../service/projectService";
import Loading from "../../../../components/Loading";
import ProjectAdd from "../../add/page";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProjectEdit() {
  const { id } = useParams<{ id: string }>();
  const [result, setResult] = useState<{ id: string; data: Record<string, unknown> | null } | null>(null);
  useEffect(() => {
    let active = true;
    AdminProjectService.getProject(id).then(response => {
      if (active) setResult({ id, data: response?.data ?? null });
    });
    return () => { active = false; };
  }, [id]);

  if (!result || result.id !== id) return <Loading />;
  if (!result.data) return <section className="surface-card p-6" role="status">
    <AdminPageHeading className="text-xl font-bold">Proje yüklenemedi</AdminPageHeading>
    <p className="mt-2">Bağlantınızı kontrol edip yeniden deneyin.</p>
    <Link href="/admin/dashboard/projects" className="button-secondary mt-4">Projelere dön</Link>
  </section>;
  return <ProjectAdd project={result.data} />;
}
