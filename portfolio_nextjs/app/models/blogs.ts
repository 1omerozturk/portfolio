export interface Blog {
  _id?: string;
  title: string;
  content: string;
  author: string;
  category: 'yazı' | 'düşünce' | 'özlü söz' | 'teknik' | 'diğer';
  tags: string[];
  excerpt: string;
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
