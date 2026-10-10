import type { MetadataRoute } from "next";
import { API_BASE_URL, PUBLIC_API_TIMEOUT_MS, PUBLIC_FETCH_OPTIONS } from "./api/config";
import { normalizeApiRecords } from "./api/payload";
import { fetchPublicBlogPage } from "./api/publicData";

import { siteConfig } from "./siteConfig";
const siteUrl = siteConfig.url;
const publicRoutes = [
  "",
  "/about",
  "/skills",
  "/projects",
  "/educations",
  "/experiences",
  "/certificates",
  "/blog",
  "/contents",
  "/contact",
];

const apiUrl = API_BASE_URL;

async function getPublishedBlogs() {
  const first = await fetchPublicBlogPage(1, 100);
  if (first.status !== "ok") return [];
  const blogs = [...first.blogs];
  for (let page = 2; page <= first.totalPages; page++) {
    const next = await fetchPublicBlogPage(page, 100);
    if (next.status !== "ok") break;
    blogs.push(...next.blogs);
  }
  return blogs.filter(blog => blog.isPublished !== false);
}

async function getPublicEntries(endpoint: string, collectionKey: string) {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      ...PUBLIC_FETCH_OPTIONS,
      signal: AbortSignal.timeout(PUBLIC_API_TIMEOUT_MS),
    });
    if (!response.ok) return [];

    let payload: unknown = await response.json();
    for (let depth = 0; depth < 3; depth += 1) {
      if (Array.isArray(payload)) return normalizeApiRecords(payload);
      if (typeof payload !== "object" || payload === null) return [];
      if (collectionKey in payload && Array.isArray(payload[collectionKey])) {
        return normalizeApiRecords(payload[collectionKey]);
      }
      if ("data" in payload) {
        payload = payload.data;
        continue;
      }
      return [];
    }
  } catch {
    return [];
  }

  return [];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, blogs] = await Promise.all([
    getPublicEntries("/user/projects", "projects"),
    getPublishedBlogs(),
  ]);

  const detailRoutes = [
    ...projects,
    ...blogs.filter(
      (blog: unknown) =>
        typeof blog === "object" && blog !== null &&
        (!("isPublished" in blog) || blog.isPublished === true),
    ),
  ].flatMap((record: unknown) => {
    if (typeof record !== "object" || record === null || !("_id" in record)) {
      return [];
    }
    if (typeof record._id !== "string" || !record._id.trim()) return [];
    const id = encodeURIComponent(record._id);
    const isBlog = (blogs as unknown[]).includes(record);
    const updatedAt = "updatedAt" in record ? new Date(String(record.updatedAt)) : undefined;
    return [{
      url: `${siteUrl}/${isBlog ? "blog" : "projects"}/${id}`,
      ...(updatedAt && !Number.isNaN(updatedAt.valueOf()) ? { lastModified: updatedAt } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }];
  });

  const seenUrls = new Set<string>();
  return [
    ...publicRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.6,
    })),
    ...detailRoutes.filter(route => {
      if (seenUrls.has(route.url)) return false;
      seenUrls.add(route.url);
      return true;
    }),
  ];
}
