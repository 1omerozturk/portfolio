export function unwrapApiData(payload: unknown): unknown {
  let current = payload;
  for (let depth = 0; depth < 3; depth += 1) {
    if (typeof current !== "object" || current === null || !("data" in current)) break;
    current = current.data;
  }
  return current;
}

export function normalizeApiRecord(payload: unknown): Record<string, unknown> | null {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) return null;
  const record = payload as Record<string, unknown>;
  const id = typeof record.id === "string" && record.id.trim()
    ? record.id
    : typeof record._id === "string" && record._id.trim() ? record._id : undefined;

  const normalized = id ? { ...record, id, _id: id } : { ...record };
  for (const field of ["createdAt", "updatedAt", "startDate", "endDate", "issueDate"]) {
    if (field in normalized) normalized[field] = normalizeApiDate(normalized[field]);
  }
  return normalized;
}

export function normalizeApiDate(value: unknown): string | undefined {
  let milliseconds: number;
  if (typeof value === "string") {
    if (!value.trim()) return undefined;
    milliseconds = Date.parse(value);
  } else if (typeof value === "object" && value !== null) {
    const timestamp = value as Record<string, unknown>;
    const seconds = timestamp._seconds ?? timestamp.seconds;
    const nanoseconds = timestamp._nanoseconds ?? timestamp.nanoseconds ?? 0;
    if (typeof seconds !== "number" || !Number.isFinite(seconds) || typeof nanoseconds !== "number" || !Number.isFinite(nanoseconds) || nanoseconds < 0 || nanoseconds >= 1e9) return undefined;
    milliseconds = seconds * 1000 + nanoseconds / 1e6;
  } else return undefined;
  const date = new Date(milliseconds);
  return Number.isNaN(date.valueOf()) ? undefined : date.toISOString();
}

export function normalizeApiRecords(records: unknown[]): Record<string, unknown>[] {
  return records.map(normalizeApiRecord).filter((record): record is Record<string, unknown> => record !== null);
}
