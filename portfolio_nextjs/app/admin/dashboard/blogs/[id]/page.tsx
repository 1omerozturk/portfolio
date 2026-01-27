"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Blog } from "../../../../models/blogs";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import { BlogAdminService } from "../../../service/blogAdminService";

const BlogForm = () => {
  const router = useRouter();
  const params = useParams();
  const blogId = params?.id as string;
  const isEdit = !!blogId;

  const [formData, setFormData] = useState<Partial<Blog>>({
    title: "",
    content: "",
    author: "",
    category: "yazı",
    tags: [],
    excerpt: "",
    featuredImage: "",
    isPublished: true,
  });

  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [contentCharCount, setContentCharCount] = useState(0);

  const categories = ["yazı", "düşünce", "özlü söz", "teknik", "diğer"];

  useEffect(() => {
    if (isEdit) {
      loadBlog();
    }
  }, [blogId, isEdit]);

  const loadBlog = async () => {
    setLoading(true);
    const blog = await BlogAdminService.getBlog(blogId);
    if (blog) {
      setFormData(blog);
      setContentCharCount(blog.content.length);
    }
    setLoading(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === "content") {
        setContentCharCount(value.length);
      }
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((t) => t !== tag) || [],
    });
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.title?.trim() || !formData.content?.trim() || !formData.author?.trim()) {
      alert("Başlık, İçerik ve Yazar alanları gereklidir!");
      setLoading(false);
      return;
    }

    let success = false;
    if (isEdit) {
      const result = await BlogAdminService.updateBlog(blogId, formData);
      success = !!result;
    } else {
      const result = await BlogAdminService.createBlog(formData);
      success = !!result;
    }

    setLoading(false);
    if (success) {
      setTimeout(() => {
        router.push("/admin/dashboard/blogs");
      }, 1500);
    }
  };

  if (loading && isEdit) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Link
        href="/admin/dashboard/blogs"
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mb-6"
      >
        <MdArrowBack size={20} />
        Geri Dön
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {isEdit ? "Blogu Düzenle" : "Yeni Blog Oluştur"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Başlık */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Başlık *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleInputChange}
            placeholder="Blog başlığını girin..."
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* Yazar */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Yazar *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author || ""}
            onChange={handleInputChange}
            placeholder="Yazarın adını girin..."
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        {/* Kategori ve Yayın Durumu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kategori
            </label>
            <select
              name="category"
              value={formData.category || "yazı"}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished || false}
                onChange={handleInputChange}
                className="w-5 h-5 accent-pink-500"
              />
              <span className="text-sm font-semibold text-gray-700">Yayınla</span>
            </label>
          </div>
        </div>

        {/* Kapak Resmi */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kapak Resmi URL
          </label>
          <input
            type="url"
            name="featuredImage"
            value={formData.featuredImage || ""}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {formData.featuredImage && (
            <img
              src={formData.featuredImage}
              alt="Preview"
              className="mt-4 max-h-64 rounded-lg object-cover"
            />
          )}
        </div>

        {/* Özet */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kısa Özet
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt || ""}
            onChange={handleInputChange}
            placeholder="Blog hakkında kısa bir özet..."
            rows={2}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
          />
        </div>

        {/* İçerik */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            İçerik * ({contentCharCount} karakter)
          </label>
          <textarea
            name="content"
            value={formData.content || ""}
            onChange={handleInputChange}
            placeholder="Blog içeriğini yazın..."
            rows={10}
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none font-mono"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            Tahmini okuma süresi: {Math.ceil((contentCharCount / 5) / 200)} dakika
          </p>
        </div>

        {/* Etiketler */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Etiketler
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagKeyPress}
              placeholder="Etiket yazıp Enter'e basın..."
              className="flex-1 px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition"
            >
              Ekle
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {formData.tags?.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-pink-700 hover:text-pink-900 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end pt-6 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition"
          >
            İptal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Oluştur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
