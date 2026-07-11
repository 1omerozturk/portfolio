"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MdArrowBack,
  MdAccessTime,
  MdVisibility,
  MdCalendarToday,
  MdPerson,
} from "react-icons/md";
import { Blog } from "../../models/blogs";
import { BlogService } from "../../service/blogService";

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const blogId = params?.id as string;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (blogId) {
      loadBlog();
    }
  }, [blogId]);

  const loadBlog = async () => {
    setLoading(true);
    const blog = await BlogService.getBlog(blogId);
    if (blog) {
      setBlog(blog);
      loadRelatedBlogs(blog.category);
    } else {
      router.push("/blog");
    }
    setLoading(false);
  };

  const loadRelatedBlogs = async (category: string) => {
    const result = await BlogService.getBlogsByCategory(category, 1, 3);
    if (result) {
      setRelatedBlogs(result.blogs.filter((b) => b._id !== blogId).slice(0, 3));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">Blog bulunamadı</p>
          <Link
            href="/blog"
            className="text-pink-500 hover:text-pink-700 font-semibold"
          >
            Tüm Bloglara Dön
          </Link>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-white">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-pink-100 hover:text-white mb-4 transition"
          >
            <MdArrowBack size={20} />
            Geri Dön
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Meta Information */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex items-center gap-2">
              <MdPerson className="text-pink-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Yazar</p>
                <p className="font-semibold text-gray-800">{blog.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MdCalendarToday className="text-pink-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Tarih</p>
                <p className="font-semibold text-gray-800">
                  {new Date(blog.createdAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MdAccessTime className="text-pink-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Okuma</p>
                <p className="font-semibold text-gray-800">{blog.readingTime || 1} min</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MdVisibility className="text-pink-500" size={20} />
              <div>
                <p className="text-sm text-gray-600">Görüntüleme</p>
                <p className="font-semibold text-gray-800">{blog.views}</p>
              </div>
            </div>

            <div>
              <span className={`inline-block px-3 py-2 rounded-lg text-sm font-semibold ${getCategoryColor(blog.category)}`}>
                {blog.category}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <article className="prose prose-lg max-w-none mb-8">
          <div className="bg-white rounded-lg p-8 leading-relaxed">
            {blog.content.split("\n").map((paragraph, index) => {
              if (paragraph.trim() === "") return null;
              return (
                <p key={index} className="text-gray-800 mb-4 text-base leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-8 py-6 border-t border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-600 mb-3">Etiketler:</p>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?search=${tag}`}
                  className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm hover:bg-pink-200 transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Social Share Buttons */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <p className="text-sm font-semibold text-gray-700 mb-4">Paylaş:</p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=https://yoursite.com/blog/${blog._id}&text=${blog.title}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=https://yoursite.com/blog/${blog._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition"
            >
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=https://yoursite.com/blog/${blog._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              LinkedIn
            </a>
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Link kopyalandı!");
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
            >
              Kopyala
            </button>
          </div>
        </div>

        {/* Related Blogs */}
        {relatedBlogs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">İlgili Yazılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog._id}
                  href={`/blog/${relatedBlog._id}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
                >
                  {relatedBlog.featuredImage && (
                    <div className="h-40 overflow-hidden bg-gray-200">
                      <img
                        src={relatedBlog.featuredImage}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold mb-2 ${getCategoryColor(relatedBlog.category)}`}>
                      {relatedBlog.category}
                    </span>
                    <h3 className="font-bold text-gray-800 line-clamp-2 group-hover:text-pink-500 transition">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {new Date(relatedBlog.createdAt).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back to All Blogs */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition"
          >
            <MdArrowBack />
            Tüm Yazılara Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
