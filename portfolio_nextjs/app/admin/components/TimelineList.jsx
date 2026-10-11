"use client";
import AdminPageHeading from "./AdminPageHeading";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loading from "./Loading";
import AdminContentIcon from "./AdminContentIcon";

function dateLabel(value) {
  if (typeof value !== "string" || !Number.isFinite(Date.parse(value)))
    return "";
  return new Date(value).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "short",
    timeZone: "Europe/Istanbul",
  });
}
export default function TimelineList({
  title,
  path,
  titleField,
  subtitleField,
  load,
  remove,
}) {
  const [records, setRecords] = useState(null);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [deleting, setDeleting] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    load()
      .then((response) => {
        if (!active) return;
        const valid = Array.isArray(response?.data);
        setFailed(!valid);
        setRecords(
          valid
            ? response.data
                .filter(
                  (item) =>
                    typeof item._id === "string" &&
                    typeof item[titleField] === "string",
                )
                .sort(
                  (a, b) =>
                    (Date.parse(b.startDate) || 0) -
                    (Date.parse(a.startDate) || 0),
                )
            : [],
        );
      })
      .catch(() => {
        if (active) {
          setFailed(true);
          setRecords([]);
        }
      });
    return () => {
      active = false;
    };
  }, [load, titleField, attempt]);
  async function deleteRecord(item) {
    if (deleting || !window.confirm(`${item[titleField]} kaydı silinsin mi?`))
      return;
    setDeleting(item._id);
    setError("");
    try {
      const response = await remove(item._id);
      if (response?.status >= 200 && response.status < 300)
        setRecords((previous) =>
          previous.filter((record) => record._id !== item._id),
        );
      else setError("Kayıt silinemedi. Lütfen yeniden deneyin.");
    } catch {
      setError("Kayıt silinemedi. Lütfen yeniden deneyin.");
    } finally {
      setDeleting(null);
    }
  }
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <AdminPageHeading className="text-3xl font-bold">{title}</AdminPageHeading>
        <Link className="button-primary" href={`${path}/add`}>
          Kayıt ekle
        </Link>
      </div>
      {error && (
        <p className="mb-4 text-danger" role="alert">
          {error}
        </p>
      )}
      {records === null ? (
        <Loading />
      ) : failed ? (
        <div className="surface-card p-6" role="status">
          <p>Kayıtlar yüklenemedi.</p>
          <button
            className="button-secondary mt-4"
            onClick={() => {
              setRecords(null);
              setAttempt((value) => value + 1);
            }}
          >
            Yeniden dene
          </button>
        </div>
      ) : records.length === 0 ? (
        <p className="surface-card p-6 text-quiet" role="status">
          Henüz kayıt eklenmemiş.
        </p>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {records.map((item) => (
            <article key={item._id} className="surface-card min-w-0 p-6">
              <div className="mb-3"><AdminContentIcon kind={path.endsWith("educations") ? "educations" : "experiences"} image={item.institutionLogo || item.companyLogo} /></div>
              <h2 className="break-words text-xl font-bold">
                {item[titleField]}
              </h2>
              {typeof item[subtitleField] === "string" && (
                <p className="mt-2 break-words text-quiet">
                  {item[subtitleField]}
                </p>
              )}
              <p className="mt-3 text-sm text-quiet">
                {dateLabel(item.startDate)}
                {dateLabel(item.startDate) && " — "}
                {item.endDate ? dateLabel(item.endDate) : "Devam ediyor"}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  className="button-secondary"
                  href={`${path}/edit/${encodeURIComponent(item._id)}`}
                  aria-label={`${item[titleField]} düzenle`}
                >
                  Düzenle
                </Link>
                <button
                  className="button-secondary"
                  disabled={deleting !== null}
                  onClick={() => deleteRecord(item)}
                  aria-label={`${item[titleField]} sil`}
                >
                  {deleting === item._id ? "Siliniyor…" : "Sil"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
