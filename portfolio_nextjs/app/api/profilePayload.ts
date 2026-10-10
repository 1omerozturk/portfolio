import { normalizeApiRecord } from "./payload";
import { isSafeHttpUrl } from "./urlSafety";

function textFields<K extends string>(value: unknown, fields: readonly K[], required: K) {
  const record = normalizeApiRecord(value);
  if (!record || typeof record[required] !== "string" || !record[required].trim()) return null;
  const values = Object.fromEntries(fields.map(field => [field, typeof record[field] === "string" ? record[field] : ""])) as Record<K, string>;
  return { ...values, _id: typeof record._id === "string" ? record._id : undefined };
}

function stringList(value: unknown) {
  return Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === "string" && Boolean(item.trim())).map(item => item.trim()))] : [];
}

export function normalizeEducation(value: unknown) {
  const fields = textFields(value, ["institution", "institutionLogo", "degree", "fieldOfStudy", "startDate", "endDate", "grade", "description"], "institution");
  return fields ? { ...fields, activities: stringList(normalizeApiRecord(value)?.activities) } : null;
}

export function normalizeExperience(value: unknown) {
  const fields = textFields(value, ["company", "position", "startDate", "endDate"], "company");
  return fields ? { ...fields, responsibilities: stringList(normalizeApiRecord(value)?.responsibilities) } : null;
}

export function normalizeSkill(value: unknown) {
  const fields = textFields(value, ["name", "icon", "color"], "name");
  if (!fields) return null;
  const rawPercentage = normalizeApiRecord(value)?.percentage;
  const percentage = typeof rawPercentage === "number"
    ? rawPercentage
    : typeof rawPercentage === "string" && /^\d+(?:\.\d+)?$/.test(rawPercentage.trim())
      ? Number(rawPercentage.trim())
      : 0;
  return { ...fields, percentage: Number.isFinite(percentage) ? Math.min(100, Math.max(0, percentage)) : 0 };
}

export function normalizeContent(value: unknown) {
  const fields = textFields(value, ["name", "link", "image"], "name");
  return fields && isSafeHttpUrl(fields.link) ? fields : null;
}

export function normalizeSocial(value: unknown) {
  const fields = textFields(value, ["name", "url", "icon"], "name");
  return fields && isSafeHttpUrl(fields.url) ? fields : null;
}

export function normalizeCertificate(value: unknown) {
  const record = normalizeApiRecord(value);
  if (!record) return null;
  const name = typeof record.name === "string" && record.name.trim() ? record.name : record.issuingOrganization;
  return textFields({ ...record, name }, ["name", "issuingOrganization", "issueDate", "certificateLink", "certificateImage", "type"], "name");
}
