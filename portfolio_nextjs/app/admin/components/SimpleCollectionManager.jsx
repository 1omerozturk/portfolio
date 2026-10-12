"use client";
import AdminPageHeading from "./AdminPageHeading";
import { useEffect, useState } from "react";
import AdminContentIcon from "./AdminContentIcon";
import { normalizeApiRecords, unwrapApiData } from "../../api/payload";

export default function SimpleCollectionManager({
  title,
  fields,
  load,
  create,
  update,
  remove,
}) {
  const empty = Object.fromEntries(fields.map((field) => [field.name, ""]));
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);
  const [editing, setEditing] = useState("");
  const [data, setData] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    load()
      .then((response) => {
        const payload = unwrapApiData(response.data);
        if (!Array.isArray(payload)) throw new Error("Invalid collection");
        if (active)
          setResult({ attempt, records: normalizeApiRecords(payload) });
      })
      .catch(() => {
        if (active) setResult({ attempt, records: null });
      });
    return () => {
      active = false;
    };
  }, [attempt, load]);
  async function submit(event) {
    event.preventDefault();
    if (busy) return;
    const payload = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value.trim()]),
    );
    if (!payload.name) {
      setError("Ad alanı zorunludur.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = editing
        ? await update(editing, payload)
        : await create(payload);
      if (response.status < 200 || response.status >= 300)
        throw new Error("Failed");
      setEditing("");
      setData(empty);
      setAttempt((value) => value + 1);
    } catch {
      setError("Kayıt kaydedilemedi. Lütfen yeniden deneyin.");
    } finally {
      setBusy(false);
    }
  }
  async function deleteRecord(id) {
    if (busy || !confirm("Bu kaydı silmek istediğinize emin misiniz?")) return;
    setBusy(true);
    setError("");
    try {
      const response = await remove(id);
      if (response.status < 200 || response.status >= 300)
        throw new Error("Failed");
      if (id === editing) {
        setEditing("");
        setData(empty);
      }
      setAttempt((value) => value + 1);
    } catch {
      setError("Kayıt silinemedi.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <section>
      <AdminPageHeading className="mb-6 text-3xl font-bold">{title}</AdminPageHeading>
      <div className="grid items-start gap-6 xl:grid-cols-2">
        <form
          onSubmit={submit}
          className="surface-card grid gap-5 p-5"
          aria-busy={busy}
        >
          <h2 className="text-xl font-bold">
            {editing ? "Kaydı düzenle" : "Kayıt ekle"}
          </h2>
          <fieldset disabled={busy} className="grid min-w-0 gap-5">
            <legend className="sr-only">Kayıt bilgileri</legend>
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  className="mb-2 block font-semibold"
                  htmlFor={"record-" + field.name}
                >
                  {field.label}
                </label>
                {field.multiline ? (
                  <textarea
                    id={"record-" + field.name}
                    className="form-field"
                    rows={4}
                    maxLength={2000}
                    value={data[field.name]}
                    onChange={(event) =>
                      setData((previous) => ({
                        ...previous,
                        [field.name]: event.target.value,
                      }))
                    }
                  />
                ) : (
                  <input
                    id={"record-" + field.name}
                    className="form-field"
                    required={field.name === "name"}
                    maxLength={200}
                    value={data[field.name]}
                    onChange={(event) =>
                      setData((previous) => ({
                        ...previous,
                        [field.name]: event.target.value,
                      }))
                    }
                  />
                )}
              </div>
            ))}
          </fieldset>
          <button className="button-primary" disabled={busy}>
            {busy ? "İşlem sürüyor…" : "Kaydet"}
          </button>
          {editing && (
            <button
              type="button"
              className="button-secondary"
              disabled={busy}
              onClick={() => {
                setEditing("");
                setData(empty);
              }}
            >
              Düzenlemeyi iptal et
            </button>
          )}
        </form>
        <div className="grid gap-4">
          {error && (
            <p role="alert" className="text-danger">
              {error}
            </p>
          )}
          {!result || result.attempt !== attempt ? (
            <p role="status">Kayıtlar yükleniyor…</p>
          ) : !result.records ? (
            <div className="surface-card p-5" role="alert">
              <p>Kayıtlar yüklenemedi.</p>
              <button
                className="button-secondary mt-4"
                onClick={() => setAttempt((value) => value + 1)}
              >
                Yeniden dene
              </button>
            </div>
          ) : !result.records.length ? (
            <p className="surface-card p-5">Henüz kayıt yok.</p>
          ) : (
            result.records.map((record) => (
              <article key={record._id} className="surface-card p-5">
                <div className="mb-3"><AdminContentIcon kind={title === "Diller" ? "languages" : "hobbies"} iconName={record.icon} /></div>
                <h2 className="text-xl font-bold">
                  {typeof record.name === "string"
                    ? record.name
                    : "İsimsiz kayıt"}
                </h2>
                {fields
                  .filter((field) => field.name !== "name")
                  .map((field) => (
                    <p
                      key={field.name}
                      className="mt-2 whitespace-pre-wrap text-quiet"
                    >
                      {typeof record[field.name] === "string"
                        ? record[field.name]
                        : ""}
                    </p>
                  ))}
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    className="button-secondary"
                    disabled={busy}
                    onClick={() => {
                      setEditing(record._id);
                      setData(
                        Object.fromEntries(
                          fields.map((field) => [
                            field.name,
                            typeof record[field.name] === "string"
                              ? record[field.name]
                              : "",
                          ]),
                        ),
                      );
                    }}
                  >
                    Düzenle
                  </button>
                  <button
                    className="button-secondary"
                    disabled={busy}
                    onClick={() => deleteRecord(record._id)}
                  >
                    Sil
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

