const categoryNames = ["yazı", "düşünce", "özlü söz", "teknik", "diğer"] as const;
export type BlogCategory = typeof categoryNames[number];
export const BLOG_CATEGORIES: readonly string[] = categoryNames;
export const BLOG_CATEGORY_STYLES: Record<string, string> = {
  yazı: "blog-category--blue",
  düşünce: "blog-category--violet",
  "özlü söz": "blog-category--rose",
  teknik: "blog-category--green",
  diğer: "blog-category--gray",
};
