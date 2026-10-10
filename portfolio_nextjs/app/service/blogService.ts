import { normalizeBlogPage } from "../api/blogPayload";
import { API_BASE_URL, PUBLIC_API_TIMEOUT_MS } from "../api/config";
import type { BlogResponse } from "../models/blogs";

export class BlogService {
  static async getBlogs(page = 1, limit = 6, category?: string, search?: string, signal?: AbortSignal): Promise<BlogResponse | null> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (category) params.set("category", category);
    if (search) params.set("search", search);

    try {
      const timeoutSignal = AbortSignal.timeout(PUBLIC_API_TIMEOUT_MS);
      const response = await fetch(`${API_BASE_URL}/user/blogs?${params.toString()}`, {
        signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) return null;
      return normalizeBlogPage(await response.json(), page);
    } catch {
      return null;
    }
  }
}

