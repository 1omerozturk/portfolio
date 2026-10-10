"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "./ThemeProvider";
import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTopButton";

export default function AppProviders({
  children,
  publicFooter,
}: Readonly<{ children: ReactNode; publicFooter: ReactNode }>) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <ThemeProvider>
      {!isAdminRoute && <a className="skip-link" href="#page-content">Ana içeriğe geç</a>}
      {!isAdminRoute && <Navbar />}
      {isAdminRoute ? children : <div id="page-content" tabIndex={-1}>{children}</div>}
      {!isAdminRoute && publicFooter}
      {!isAdminRoute && <ScrollToTopButton />}
    </ThemeProvider>
  );
}
