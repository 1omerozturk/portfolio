import type { Blog } from "../models/blogs";
import type { Locale } from "./config";

const categories: Record<string, string> = {
  yazı: "Article", düşünce: "Thoughts", "özlü söz": "Quotes", teknik: "Technical", diğer: "Other",
};

export function blogCategoryLabel(category: string, locale: Locale) {
  return locale === "en" ? categories[category] || category : category;
}

export function localizeBlog(blog: Blog, locale: Locale): Blog {
  if (locale !== "en") return blog;
  const content = blog.contentEn?.trim() || blog.content;
  return {
    ...blog,
    title: blog.titleEn?.trim() || blog.title,
    content,
    excerpt: blog.excerptEn?.trim() || (blog.contentEn?.trim() ? content.slice(0, 150) : blog.excerpt),
    readingTime: blog.contentEn?.trim() ? Math.max(1, Math.ceil(content.split(/\s+/).filter(Boolean).length / 200)) : blog.readingTime,
  };
}
