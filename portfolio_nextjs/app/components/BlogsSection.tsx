'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdArrowForward, MdAccessTime } from "react-icons/md";
import Loading from "./Loading";

const BlogsSection = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { BlogService } = await import("../service/blogService");
        const result = await BlogService.getBlogs(1, 3);
        
        console.log("BlogsSection result:", result);
        
        if (result?.blogs) {
          console.log("BlogsSection blogs:", result.blogs);
          setBlogs(result.blogs);
        } else {
          console.warn("No blogs found in result:", result);
          setBlogs([]);
        }
        setError(null);
      } catch (err: any) {
        console.error("BlogsSection Error:", err);
        setError(err?.message || "Failed to load blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <Loading color="pink" />;
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Recent Blogs</h2>
          <p className="text-gray-600 text-lg">An error occurred while loading blogs: {error}</p>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

    const getCategoryColor = (cat: string) => {
      const colors: { [key: string]: string } = {
        article: "bg-blue-100 text-blue-700",
        thought: "bg-purple-100 text-purple-700",
        quote: "bg-rose-100 text-rose-700",
        technical: "bg-green-100 text-green-700",
        other: "bg-gray-100 text-gray-700",
      };
      return colors[cat] || colors["other"];
    };

    return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Recent Blogs</h2>
          <p className="text-gray-600 text-lg">
            Stay updated with articles, thoughts and technical content
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              href={`/blog/${blog._id}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Featured Image */}
              {blog.featuredImage ? (
                <div className="h-40 overflow-hidden bg-gray-200">
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="h-40 bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white text-4xl">📝</span>
                </div>
              )}

              <div className="p-5">
                {/* Category */}
                <div className="mb-2">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getCategoryColor(blog.category)}`}>
                    {blog.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-500 transition">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                  <span>{blog.author}</span>
                  <div className="flex items-center gap-1">
                    <MdAccessTime />
                    {blog.readingTime || 1} min
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition font-semibold"
          >
            View All Blogs
            <MdArrowForward size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;