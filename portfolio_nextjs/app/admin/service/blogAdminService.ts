import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAdminBlogs,
  getAdminBlogById,
} from "../../api/api";
import Message from "../../components/Message";
import { Blog, BlogResponse } from "../../models/blogs";

export class BlogAdminService {
  static async createBlog(data: Partial<Blog>) {
    try {
      const response = await createBlog(data);
      if (response?.data) {
        Message.ToastMessage("success", "Blog başarıyla oluşturuldu");
        return response.data as Blog;
      }
    } catch (error: any) {
      console.error("Create Blog Error:", error);
      Message.ToastMessage("error", error?.response?.data?.message || "Blog oluşturulamadı");
      return null;
    }
  }

  static async updateBlog(id: string, data: Partial<Blog>) {
    try {
      const response = await updateBlog(id, data);
      if (response?.data) {
        Message.ToastMessage("success", "Blog başarıyla güncellendi");
        return response.data as Blog;
      }
    } catch (error: any) {
      console.error("Update Blog Error:", error);
      Message.ToastMessage("error", error?.response?.data?.message || "Blog güncellenemedi");
      return null;
    }
  }

  static async deleteBlog(id: string) {
    try {
      await deleteBlog(id);
      Message.ToastMessage("success", "Blog başarıyla silindi");
      return true;
    } catch (error: any) {
      console.error("Delete Blog Error:", error);
      Message.ToastMessage("error", error?.response?.data?.message || "Blog silinemedi");
      return false;
    }
  }

  static async getBlogs(page: number = 1, limit: number = 10, category?: string, search?: string, status?: string) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (category) params.append("category", category);
      if (search) params.append("search", search);
      if (status) params.append("status", status);

      const response = await getAdminBlogs(params.toString());
      if (response?.data) {
        return response.data as BlogResponse;
      }
    } catch (error: any) {
      console.error("Get Admin Blogs Error:", error);
      Message.ToastMessage("error", error?.response?.data?.message || "Bloglar yüklenemedi");
      return null;
    }
  }

  static async getBlog(id: string) {
    try {
      const response = await getAdminBlogById(id);
      if (response?.data) {
        return response.data as Blog;
      }
    } catch (error: any) {
      console.error("Get Blog Error:", error);
      Message.ToastMessage("error", error?.response?.data?.message || "Blog yüklenemedi");
      return null;
    }
  }
}
