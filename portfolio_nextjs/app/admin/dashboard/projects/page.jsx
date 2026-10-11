"use client";
import AdminPageHeading from "../../components/AdminPageHeading";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectComponent from "../../components/ProjectComponent";
import Loading from "../../components/Loading";
import { AdminProjectService } from "../../service/projectService";
import { normalizeProject } from "../../../api/projectPayload";

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    AdminProjectService.getProjects().then(response => {
      if (!active) return;
      const valid = Array.isArray(response?.data);
      setFailed(!valid);
      setProjects(valid ? response.data.map(normalizeProject).filter(Boolean) : []);
    }).catch(() => { if (active) { setFailed(true); setProjects([]); } });
    return () => { active = false; };
  }, [attempt]);
  return <section><div className="mb-6 flex flex-wrap items-center justify-between gap-4"><AdminPageHeading className="text-3xl font-bold">Projeler</AdminPageHeading><Link className="button-primary" href="/admin/dashboard/projects/add">Proje ekle</Link></div>{projects === null ? <Loading /> : failed ? <div className="surface-card p-6" role="status"><p>Projeler yüklenemedi.</p><button className="button-secondary mt-4" onClick={() => { setProjects(null); setAttempt(value => value + 1); }}>Yeniden dene</button></div> : projects.length ? <ProjectComponent projects={projects} setProjects={setProjects} /> : <p className="surface-card p-6 text-quiet" role="status">Henüz proje eklenmemiş.</p>}</section>;
}
