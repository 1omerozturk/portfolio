import type { BlogCategory } from "../blogConstants";

export interface Blog {
  _id?: string;
  title: string;
  titleEn?: string;
  content: string;
  contentEn?: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  excerpt: string;
  excerptEn?: string;
  views: number;
  isPublished: boolean;
  featuredImage?: string;
  readingTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface BlogResponse {
  blogs: Blog[];
  total: number;
  pages: number;
  currentPage: number;
}
