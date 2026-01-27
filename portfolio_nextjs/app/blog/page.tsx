"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineSearch } from "react-icons/ai";
import { MdCategory, MdAccessTime } from "react-icons/md";
import { Blog } from "../models/blogs";
import { BlogService } from "../service/blogService";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const categories = ["yazı", "düşünce", "özlü söz", "teknik", "diğer"];

  useEffect(() => {
    fetchBlogs();
  }, [page, search, category]);

  const fetchBlogs = async () => {
    setLoading(true);
    const result = await BlogService.getBlogs(page, 6, category || undefined, search || undefined);
    if (result) {
      setBlogs(result.blogs);
      setTotalPages(result.pages);
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleCategoryClick = (cat: string) => {
    setCategory(category === cat ? "" : cat);
    setPage(1);
  };

  const getCategoryColor = (cat: string) => {
    const colors: { [key: string]: string } = {
      yazı: "bg-blue-100 text-blue-700",
      düşünce: "bg-purple-100 text-purple-700",
      "özlü söz": "bg-rose-100 text-rose-700",
      teknik: "bg-green-100 text-green-700",
      diğer: "bg-gray-100 text-gray-700",
    };
    return colors[cat] || colors.diğer;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16 rounded-tl-full">
        <div className="max-w-6xl mx-auto px-4 ">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-slate-950">B</span>
            <span className="text-slate-800">l</span>
            <span className="text-slate-600">o</span>
            <span className="text-slate-400">g </span>
            & Yazılar</h1>
          <p className="text-lg text-pink-100">
            Yazılar, düşünceler, özlü sözler ve teknik içerikler
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="Blog ara..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 transition"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition flex items-center gap-2"
            >
              <AiOutlineSearch size={20} />
              Ara
            </button>
          </form>

          {/* Categories Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setCategory("");
                setPage(1);
              }}
              className={`px-4 py-2 rounded-full transition ${
                category === ""
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Tümü
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-full transition capitalize ${
                  category === cat
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Blog bulunamadı</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog._id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Featured Image */}
                  {blog.featuredImage && (
                    <div className="h-48 overflow-hidden bg-gray-200">
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="mb-3">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(blog.category)}`}>
                        <MdCategory className="inline mr-1" />
                        {blog.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-indigo-500 transition">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    {/* Meta Information */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium text-gray-700">{blog.author}</p>
                        <p>{new Date(blog.createdAt).toLocaleDateString("tr-TR")}</p>
                      </div>
                      <div className="flex items-center gap-3 text-right">
                        <div className="flex items-center gap-1">
                          <MdAccessTime />
                          {blog.readingTime || 1} min
                        </div>
                        <div className="text-xs">👁️ {blog.views}</div>
                      </div>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
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
          </>
        )}
      </div>
    </div>
  );
};

export default BlogsPage;
