export function isSafeHttpUrl(value: unknown): boolean {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function isSafeImageSource(value: unknown): value is string {
  if (typeof value !== "string" || /[\\\u0000-\u0020]/.test(value)) return false;
  return isSafeHttpUrl(value) || (value.startsWith("/") && !value.startsWith("//"));
}
