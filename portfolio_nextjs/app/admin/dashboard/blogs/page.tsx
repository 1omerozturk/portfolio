"use client";

import React, { useEffect, useState } from "react";
import { Blog, BlogResponse } from "../../../models/blogs";
import Link from "next/link";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";
import { BlogAdminService } from "../../service/blogAdminService";

const BlogDashboard = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const categories = ["yazı", "düşünce", "özlü söz", "teknik", "diğer"];

  useEffect(() => {
    fetchBlogs();
  }, [page, search, category, status]);

  const fetchBlogs = async () => {
    setLoading(true);
    const result = await BlogAdminService.getBlogs(page, 10, category || undefined, search || undefined, status || undefined);
    if (result) {
      setBlogs(result.blogs);
      setTotalPages(result.pages);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu blogu silmek istediğinize emin misiniz?")) {
      const success = await BlogAdminService.deleteBlog(id);
      if (success) {
        fetchBlogs();
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Blog Yönetimi</h1>
        <Link
          href="/admin/dashboard/blogs/create"
          className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition"
        >
          <MdAdd size={20} />
          Yeni Blog
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Blog ara..."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-indigo-600 text-white"
        />
        <select
          value={category}
          onChange={handleCategoryFilter}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-indigo-600 text-white"
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={handleStatusFilter}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 bg-indigo-600 text-white"
        >
          <option value="">Tüm Durumlar</option>
          <option value="published">Yayınlanmış</option>
          <option value="draft">Taslak</option>
        </select>
        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            setStatus("");
            setPage(1);
          }}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition"
        >
          Sıfırla
        </button>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Blog bulunamadı</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Başlık</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kategori</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Yazar</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tarihi</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Görüntüleme</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Durum</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                    <div className="max-w-xs truncate">{blog.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{blog.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(blog.createdAt).toLocaleDateString("tr-TR")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      👁️ {blog.views}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        blog.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {blog.isPublished ? "Yayınlandı" : "Taslak"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        href={`/admin/dashboard/blogs/${blog._id}`}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Düzenle"
                      >
                        <MdEdit size={20} />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id!)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Sil"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Önceki
          </button>
          <span className="text-gray-600 font-medium">
            Sayfa {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDashboard;
