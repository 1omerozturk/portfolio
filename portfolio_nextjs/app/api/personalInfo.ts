import { cache } from "react";
import { API_BASE_URL, PUBLIC_FETCH_OPTIONS } from "./config";
import { normalizeApiRecords, unwrapApiData } from "./payload";
import { isSafeImageSource } from "./urlSafety";
import { siteConfig } from "../siteConfig";
import { getLocale } from "../i18n/server";

export const getPublicProfile = cache(async () => {
  const en = (await getLocale()) === "en";
  const fallback = {
    fullName: siteConfig.name as string,
    jobTitle: siteConfig.jobTitle as string,
    about: siteConfig.biography as string,
    profilePicture: siteConfig.defaultImage as string,
    email: "",
    phone: "",
    address: "",
  };
  try {
    const response = await fetch(`${API_BASE_URL}/user/personal-info`, {
      ...PUBLIC_FETCH_OPTIONS,
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return fallback;
    const payload = unwrapApiData(await response.json());
    if (!Array.isArray(payload)) return fallback;
    const record = normalizeApiRecords(payload).find(
      (item) => typeof item.fullName === "string" && item.fullName.trim(),
    );
    if (!record) return fallback;
    const text = (field: string, defaultValue = "") => {
      const value =
        typeof record[field] === "string" ? record[field].trim() : "";
      return value && !/^(?:\.{2,}|…+|[-_]{2,})$/.test(value)
        ? value
        : defaultValue;
    };
    const email = text("email");
    const phone = text("phone");
    return {
      fullName: text("fullName", fallback.fullName),
      jobTitle:
        (en ? text("jobTitleEn") : "") || text("jobTitle", fallback.jobTitle),
      about: (en ? text("aboutEn") : "") || text("about", fallback.about),
      profilePicture: isSafeImageSource(record.profilePicture)
        ? record.profilePicture
        : fallback.profilePicture,
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "",
      phone: /^\+?[\d\s().-]{10,40}$/.test(phone) ? phone : "",
      address: text("address"),
    };
  } catch {
    return fallback;
  }
});
