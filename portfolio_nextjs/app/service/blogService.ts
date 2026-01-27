import { getBlogs, getBlogById, getBlogsByCategory, searchBlogs } from "../api/api";
import Message from "../components/Message";
import { Blog, BlogResponse } from "../models/blogs";

export class BlogService {
  static async getBlogs(page: number = 1, limit: number = 6, category?: string, search?: string) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (category) params.append("category", category);
      if (search) params.append("search", search);

      const response = await getBlogs(params.toString());
      if (response?.data) {
        return response.data as BlogResponse;
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Get Blogs Error:", error);
      Message.ToastMessage("error", error?.response?.data?.message || "Bloglar yüklenemedi");
      return null;
    }
  }

  static async getBlog(id: string) {
    try {
      const response = await getBlogById(id);
      if (response?.data) {
        return response.data as Blog;
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Get Blog Error:", error);
      Message.ToastMessage("error", error?.response?.data?.message || "Blog yüklenemedi");
      return null;
    }
  }

  static async getBlogsByCategory(category: string, page: number = 1, limit: number = 6) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await getBlogsByCategory(category, params.toString());
      if (response?.data) {
        return response.data as BlogResponse;
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Get Blogs By Category Error:", error);
      Message.ToastMessage("error", error?.response?.data?.message || "Kategoriye göre bloglar yüklenemedi");
      return null;
    }
  }

  static async searchBlogs(query: string) {
    try {
      const response = await searchBlogs(query);
      if (response?.data) {
        return response.data as Blog[];
      } else {
        return [];
      }
    } catch (error: any) {
      console.error("Search Blogs Error:", error);
      Message.ToastMessage("error", error?.response?.data?.message || "Arama yapılamadı");
      return [];
    }
  }
}
