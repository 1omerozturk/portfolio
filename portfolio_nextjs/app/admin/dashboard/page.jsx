"use client";
import AdminPageHeading from "../components/AdminPageHeading";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SkillService } from "../service/skillService";
import { AdminProjectService } from "../service/projectService";
import { ContentService } from "../service/contentService";
import { MessageService } from "../service/messageService";
import { CertificationService } from "../service/certificationsService";
import { getHobbies, getLanguages } from "../../api/api";
import { normalizeApiRecords, unwrapApiData } from "../../api/payload";
import AdminContentIcon from "../components/AdminContentIcon";
async function loadCollection(load) {
  const response = await load();
  const records = unwrapApiData(response.data);
  if (!Array.isArray(records)) throw new Error("Invalid collection");
  return normalizeApiRecords(records);
}

const sections = [
  {
    name: "Projeler",
    path: "projects",
    load: () => AdminProjectService.getProjects(),
  },
  { name: "Yetenekler", path: "skills", load: () => SkillService.getSkills() },
  {
    name: "İçerikler",
    path: "contents",
    load: () => ContentService.getContents(),
  },
  {
    name: "Sertifikalar",
    path: "certificates",
    load: () => CertificationService.getCertifications(),
  },
  {
    name: "Mesajlar",
    path: "contacts",
    load: () => MessageService.getMessages(),
  },
  { name: "Hobiler", path: "hobbies", load: () => loadCollection(getHobbies) },
  {
    name: "Diller",
    path: "languages",
    load: () => loadCollection(getLanguages),
  },
];
export default function Dashboard() {
  const [results, setResults] = useState(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let active = true;
    Promise.allSettled(
      sections.map((section) => Promise.resolve().then(() => section.load())),
    ).then((values) => {
      if (active)
        setResults(
          values.map((result) => {
            const value = result.status === "fulfilled" ? result.value : null;
            const records = Array.isArray(value) ? value : value?.data;
            return Array.isArray(records) ? records.length : null;
          }),
        );
    });
    return () => {
      active = false;
    };
  }, [attempt]);
  return (
    <section>
      <AdminPageHeading className="text-3xl font-bold">Genel bakış</AdminPageHeading>
      <p className="mb-8 mt-3 text-quiet">
        İçeriklerinizi ve gelen mesajları yönetin.
      </p>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((section, index) => (
          <article key={section.path} className="surface-card p-6">
            <div className="mb-3"><AdminContentIcon kind={section.path} /></div>
            <h2 className="text-xl font-bold">{section.name}</h2>
            <p className="my-5 text-3xl font-bold text-brand" role="status">
              {results === null
                ? "Yükleniyor…"
                : results[index] === null
                  ? "Yüklenemedi"
                  : results[index]}
            </p>
            <Link
              href={`/admin/dashboard/${section.path}`}
              className="button-secondary"
            >
              {section.name} yönet
            </Link>
          </article>
        ))}
      </div>
      {results?.some((value) => value === null) && (
        <div className="mt-6" role="status">
          <p className="mb-3 text-quiet">Bazı bölümlere erişilemedi.</p>
          <button
            className="button-primary"
            onClick={() => {
              setResults(null);
              setAttempt((value) => value + 1);
            }}
          >
            Yeniden dene
          </button>
        </div>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="button-secondary" href="/admin/dashboard/blogs">
          Blog yazıları
        </Link>
        <Link className="button-secondary" href="/admin/passwordReset">
          Şifre değiştir
        </Link>
      </div>
    </section>
  );
}
