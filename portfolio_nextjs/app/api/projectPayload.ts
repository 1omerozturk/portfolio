import { normalizeApiRecord } from "./payload";
import { normalizeImageSource } from "./urlSafety";

export type PublicProject = {
  _id: string;
  title: string;
  titleEn?: string;
  descriptionEn?: string;
  description: string;
  type: string;
  technologies: string[];
  images: string[];
  repoLink: string;
  liveDemoLink: string;
  isShowcasing: boolean;
};

export function normalizeProject(value: unknown): PublicProject | null {
  const record = normalizeApiRecord(value);
  if (
    !record ||
    typeof record._id !== "string" ||
    !record._id.trim() ||
    typeof record.title !== "string" ||
    !record.title.trim()
  )
    return null;
  const text = (field: string) =>
    typeof record[field] === "string" ? (record[field] as string) : "";
  const list = (field: string) =>
    Array.isArray(record[field])
      ? record[field]
          .filter(
            (item): item is string =>
              typeof item === "string" && Boolean(item.trim()),
          )
          .map((item) => item.trim())
      : [];
  return {
    _id: record._id,
    title: text("title").trim(),
    titleEn: text("titleEn").trim() || undefined,
    descriptionEn: text("descriptionEn").trim() || undefined,
    description: text("description"),
    type: text("type"),
    technologies: [...new Set(list("technologies"))],
    images: [
      ...new Set(
        list("images")
          .flatMap((value) => value.split(/,\s*(?=https?:\/\/|\/(?!\/))/))
          .map((value) => normalizeImageSource(value.trim()))
          .filter((value): value is string => value !== null),
      ),
    ],
    repoLink: text("repoLink"),
    liveDemoLink: text("liveDemoLink"),
    isShowcasing:
      record.isShowcasing == null ||
      record.isShowcasing === true ||
      record.isShowcasing === "true",
  };
}
