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
  if (typeof value !== "string" || /[\\\u0000-\u0020]/.test(value))
    return false;
  return (
    isSafeHttpUrl(value) || (value.startsWith("/") && !value.startsWith("//"))
  );
}

export function normalizeImageSource(value: unknown): string | null {
  if (!isSafeImageSource(value)) return null;
  if (value.startsWith("/")) return value;
  const url = new URL(value);
  if (url.hostname === "github.com" || url.hostname === "www.github.com") {
    const match = /^\/([^/]+)\/([^/]+)\/(?:blob|raw)\/(.+)$/.exec(url.pathname);
    if (match)
      return `https://raw.githubusercontent.com/${match[1]}/${match[2]}/${match[3]}`;
  }
  return value;
}
