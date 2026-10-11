import { BLOG_CATEGORIES } from "../blogConstants";
import type { Blog, BlogResponse } from "../models/blogs";
import { normalizeApiRecord, unwrapApiData } from "./payload";

const categories = new Set(BLOG_CATEGORIES);

export function normalizeBlog(payload: unknown): Blog | null {
  const record = normalizeApiRecord(payload);
  if (!record || typeof record._id !== "string" || !record._id.trim() || typeof record.title !== "string" || !record.title.trim()) return null;
  const text = (key: string) => typeof record[key] === "string" ? record[key] as string : "";
  const count = (key: string, fallback: number) => {
    const value = record[key];
    return typeof value === "number" && Number.isFinite(value) ? Math.max(fallback, Math.floor(value)) : fallback;
  };
  const category = text("category");
  return {
    _id: record._id,
    title: text("title").trim(),
    titleEn: text("titleEn").trim(),
    content: text("content"),
    contentEn: text("contentEn"),
    excerpt: text("excerpt"),
    excerptEn: text("excerptEn"),
    author: text("author").trim() || "Ömer Öztürk",
    category: categories.has(category) ? category as Blog["category"] : "diğer",
    tags: Array.isArray(record.tags) ? [...new Set(record.tags.filter((tag): tag is string => typeof tag === "string" && Boolean(tag.trim())).map(tag => tag.trim()))] : [],
    views: count("views", 0),
    readingTime: count("readingTime", 1),
    isPublished: record.isPublished == null || record.isPublished === true || record.isPublished === "true",
    featuredImage: text("featuredImage") || undefined,
    createdAt: text("createdAt"),
    updatedAt: text("updatedAt"),
  };
}

export function normalizeBlogs(records: unknown[]): Blog[] {
  return records.map(normalizeBlog).filter((blog): blog is Blog => blog !== null);
}

export function normalizeBlogPage(value: unknown, requestedPage = 1): BlogResponse | null {
  const payload = unwrapApiData(value);
  if (Array.isArray(payload)) {
    const blogs = normalizeBlogs(payload);
    return { blogs, total: blogs.length, pages: 1, currentPage: requestedPage };
  }
  if (typeof payload !== "object" || payload === null || !("blogs" in payload) || !Array.isArray(payload.blogs)) return null;
  const record = payload as Record<string, unknown>;
  const blogs = normalizeBlogs(record.blogs as unknown[]);
  const integer = (key: string, minimum: number, fallback: number) => {
    const raw = record[key];
    const number = typeof raw === "number" ? raw : typeof raw === "string" && /^\d+$/.test(raw.trim()) ? Number(raw) : NaN;
    return Number.isSafeInteger(number) && number >= minimum ? number : fallback;
  };
  return {
    blogs,
    total: integer("total", 0, blogs.length),
    pages: integer("pages", 1, 1),
    currentPage: integer("currentPage", 1, requestedPage),
  };
}

