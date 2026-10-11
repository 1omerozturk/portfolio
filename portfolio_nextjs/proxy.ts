import { NextResponse, type NextRequest } from "next/server";
import { localizedPath, localeFromPath, preferredLocale } from "./app/i18n/config";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const choice = url.searchParams.get("lang");
  if (choice === "tr" || choice === "en") {
    url.searchParams.delete("lang");
    url.pathname = localizedPath(url.pathname, choice);
    const response = NextResponse.redirect(url);
    response.cookies.set("portfolio-locale", choice, { path: "/", sameSite: "lax", maxAge: 31536000 });
    return response;
  }
  const locale = localeFromPath(url.pathname);
  if (url.pathname === "/" && request.cookies.get("portfolio-locale")?.value !== "tr" &&
      (request.cookies.get("portfolio-locale")?.value === "en" || preferredLocale(request.headers.get("accept-language")) === "en")) {
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }
  const headers = new Headers(request.headers);
  headers.set("x-portfolio-locale", locale);
  if (locale === "en") {
    url.pathname = localizedPath(url.pathname, "tr");
    if (url.pathname === "/admin" || url.pathname.startsWith("/admin/")) return NextResponse.redirect(url);
    return NextResponse.rewrite(url, { request: { headers } });
  }
  return NextResponse.next({ request: { headers } });
}
export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
