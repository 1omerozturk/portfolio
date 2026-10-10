import {
  createBlog,
  updateBlog,
  deleteBlog,
  getAdminBlogs,
  getAdminBlogById,
} from "../../api/api";
import Message from "../../components/Message";
import { Blog } from "../../models/blogs";
import { normalizeBlog, normalizeBlogPage } from "../../api/blogPayload";
import { unwrapApiData } from "../../api/payload";

export class BlogAdminService {
  static async createBlog(data: Partial<Blog>) {
    try {
      const response = await createBlog(data);
      if (response?.data) {
        Message.ToastMessage("success", "Blog başarıyla oluşturuldu");
        return normalizeBlog(unwrapApiData(response.data));
      }
    } catch {
      Message.ToastMessage("error", "Blog oluşturulamadı");
      return null;
    }
  }

  static async updateBlog(id: string, data: Partial<Blog>) {
    try {
      const response = await updateBlog(id, data);
      if (response?.data) {
        Message.ToastMessage("success", "Blog başarıyla güncellendi");
        return normalizeBlog(unwrapApiData(response.data));
      }
    } catch {
      Message.ToastMessage("error", "Blog güncellenemedi");
      return null;
    }
  }

  static async deleteBlog(id: string) {
    try {
      await deleteBlog(id);
      Message.ToastMessage("success", "Blog başarıyla silindi");
      return true;
    } catch {
      Message.ToastMessage("error", "Blog silinemedi");
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
        return normalizeBlogPage(response.data, page);
      }
    } catch {
      Message.ToastMessage("error", "Bloglar yüklenemedi");
      return null;
    }
  }

  static async getBlog(id: string) {
    try {
      const response = await getAdminBlogById(id);
      if (response?.data) {
        return normalizeBlog(unwrapApiData(response.data));
      }
    } catch {
      Message.ToastMessage("error", "Blog yüklenemedi");
      return null;
    }
  }
}


