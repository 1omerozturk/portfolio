export function driveCertificatePreview(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "drive.google.com" || url.username || url.password) return null;
    const id = /^\/file\/d\/([a-zA-Z0-9_-]{10,200})(?:\/|$)/.exec(url.pathname)?.[1] || (url.pathname === "/open" ? url.searchParams.get("id") : null);
    if (!id || !/^[a-zA-Z0-9_-]{10,200}$/.test(id)) return null;
    const preview = new URL(`https://drive.google.com/file/d/${id}/preview`);
    const key = url.searchParams.get("resourcekey");
    if (key && /^[a-zA-Z0-9_-]{1,200}$/.test(key)) preview.searchParams.set("resourcekey", key);
    return preview.href;
  } catch { return null; }
}
