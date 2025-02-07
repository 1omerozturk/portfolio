import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AdminAuth } from "./auth";

export function middleware(req: NextRequest) {
  const token = AdminAuth.isLoggedIn();
  const { pathname } = req.nextUrl;

  // Eğer kullanıcı giriş yapmamışsa ve giriş ekranında değilse yönlendir
  if (!token && pathname !== "/admin/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // Eğer kullanıcı giriş yapmışsa ve tekrar giriş sayfasına gitmek istiyorsa yönlendir
  if (token && pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
