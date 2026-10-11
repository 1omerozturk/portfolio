import { BLOG_CATEGORIES } from "./blogConstants";

export const BLOG_SEARCH_MAX_LENGTH = 200;
const MAX_PAGE = 100_000;

export function normalizeBlogQuery(params: { page?: string | string[]; category?: string | string[]; search?: string | string[] }) {
  const first = (value?: string | string[]) => Array.isArray(value) ? value[0] : value;
  const rawPage = first(params.page) || "1";
  const number = /^\d+$/.test(rawPage) ? Number(rawPage) : 1;
  const page = Number.isSafeInteger(number) && number >= 1 && number <= MAX_PAGE ? number : 1;
  const rawCategory = first(params.category) || "";
  const category = BLOG_CATEGORIES.includes(rawCategory) ? rawCategory : "";
  const rawSearch = (first(params.search) || "").trim().slice(0, BLOG_SEARCH_MAX_LENGTH);
  return { page, category, search: rawSearch.length >= 2 ? rawSearch : "" };
}
