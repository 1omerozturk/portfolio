const localApiUrl = "http://localhost:5040/api";

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
const defaultApiUrl = process.env.NODE_ENV === "development" ? localApiUrl :configuredApiUrl;

export const API_BASE_URL = (configuredApiUrl || defaultApiUrl).replace(/\/+$/, "");

export const PUBLIC_API_TIMEOUT_MS = 15_000;

export const PUBLIC_FETCH_OPTIONS = process.env.NODE_ENV === "development"
  ? { cache: "no-store" as const }
  : { next: { revalidate: 300 } };
