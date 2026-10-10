import axios from "axios";
import { API_BASE_URL, PUBLIC_API_TIMEOUT_MS } from "../api/config";
import { normalizeApiRecords, unwrapApiData } from "../api/payload";
import type { BlogResponse } from "../models/blogs";

export class BlogService {
  static async getBlogs(page = 1, limit = 6, category?: string, search?: string, signal?: AbortSignal): Promise<BlogResponse | null> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (category) params.set("category", category);
    if (search) params.set("search", search);

    try {
      const response = await axios.get(`${API_BASE_URL}/user/blogs?${params.toString()}`, { timeout: PUBLIC_API_TIMEOUT_MS, signal });
      const payload = unwrapApiData(response?.data);

      if (Array.isArray(payload)) {
        return { blogs: normalizeApiRecords(payload) as unknown as BlogResponse["blogs"], total: payload.length, pages: 1, currentPage: page };
      }
      if (typeof payload !== "object" || payload === null || !("blogs" in payload) || !Array.isArray(payload.blogs)) {
        return null;
      }

      const result = payload as Partial<BlogResponse>;
      const blogs = normalizeApiRecords(result.blogs ?? []) as unknown as BlogResponse["blogs"];
      const pages = Number(result.pages);
      return {
        blogs,
        total: Number.isFinite(Number(result.total)) ? Number(result.total) : blogs.length,
        pages: Number.isFinite(pages) ? Math.max(1, Math.floor(pages)) : 1,
        currentPage: Number.isFinite(Number(result.currentPage)) ? Number(result.currentPage) : page,
      };
    } catch {
      return null;
    }
  }
}
