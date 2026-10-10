import { API_BASE_URL, PUBLIC_API_TIMEOUT_MS, PUBLIC_FETCH_OPTIONS } from "./config";
import { normalizeApiRecord, normalizeApiRecords, unwrapApiData as unwrapData } from "./payload";
import { normalizeBlog, normalizeBlogPage } from "./blogPayload";
import type { Blog } from "../models/blogs";
import { normalizeProject, type PublicProject } from "./projectPayload";

function fetchPublicResponse(path: string) {
  return fetch(`${API_BASE_URL}${path}`, {
    ...PUBLIC_FETCH_OPTIONS,
    signal: AbortSignal.timeout(PUBLIC_API_TIMEOUT_MS),
  });
}

export type PublicRecordResult<T> =
  | { status: "ok"; data: T }
  | { status: "not-found" }
  | { status: "unavailable" };

export async function fetchPublicRecord<T>(path: string, options: { forbiddenAsNotFound?: boolean } = {}): Promise<PublicRecordResult<T>> {
  try {
    const response = await fetchPublicResponse(path);

    if (response.status === 404 || (response.status === 403 && options.forbiddenAsNotFound)) return { status: "not-found" };
    if (!response.ok) return { status: "unavailable" };

    const data = unwrapData(await response.json());
    if (data == null) return { status: "not-found" };
    const record = normalizeApiRecord(data);
    if (!record) return { status: "unavailable" };

    return { status: "ok", data: record as T };
  } catch {
    return { status: "unavailable" };
  }
}

export async function fetchPublicCollection<T>(path: string): Promise<T[]> {
  try {
    const response = await fetchPublicResponse(path);
    if (!response.ok) return [];

    const data = unwrapData(await response.json());
    if (Array.isArray(data)) return normalizeApiRecords(data) as T[];
    if (typeof data === "object" && data !== null && "blogs" in data && Array.isArray(data.blogs)) {
      return normalizeApiRecords(data.blogs) as T[];
    }
    return [];
  } catch {
    return [];
  }
}

export async function fetchPublicBlogRecord(id: string): Promise<PublicRecordResult<Blog>> {
  const result = await fetchPublicRecord<unknown>(`/user/blogs/${encodeURIComponent(id)}`, { forbiddenAsNotFound: true });
  if (result.status !== "ok") return result;
  const blog = normalizeBlog(result.data);
  return blog ? { status: "ok", data: blog } : { status: "unavailable" };
}

export async function fetchPublicProjectRecord(id: string): Promise<PublicRecordResult<PublicProject>> {
  const result = await fetchPublicRecord<unknown>(`/user/projects/${encodeURIComponent(id)}`);
  if (result.status !== "ok") return result;
  const project = normalizeProject(result.data);
  return project ? { status: "ok", data: project } : { status: "unavailable" };
}

export async function fetchPublicList<T>(path: string, collectionKeys: string[] = []): Promise<{ status: "ok"; items: T[] } | { status: "unavailable" }> {
  try {
    const response = await fetchPublicResponse(path);
    if (!response.ok) return { status: "unavailable" };

    const data = unwrapData(await response.json());
    if (Array.isArray(data)) return { status: "ok", items: normalizeApiRecords(data) as T[] };

    if (typeof data === "object" && data !== null) {
      for (const key of collectionKeys) {
        if (key in data && Array.isArray(data[key])) return { status: "ok", items: normalizeApiRecords(data[key]) as T[] };
      }
    }
    return { status: "unavailable" };
  } catch {
    return { status: "unavailable" };
  }
}

export async function fetchPublicBlogPage(page: number, limit: number, category?: string, search?: string) {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) });
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  try {
    const response = await fetchPublicResponse(`/user/blogs?${params.toString()}`);
    if (!response.ok) return { status: "unavailable" as const, blogs: [], totalPages: 1 };

    const payload = normalizeBlogPage(await response.json(), page);
    if (!payload) {
      return { status: "unavailable" as const, blogs: [], totalPages: 1 };
    }

    return {
      status: "ok" as const,
      blogs: payload.blogs,
      totalPages: payload.pages,
    };
  } catch {
    return { status: "unavailable" as const, blogs: [], totalPages: 1 };
  }
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

