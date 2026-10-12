"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "./ThemeProvider";
import Navbar from "./Navbar";
import ScrollToTopButton from "./ScrollToTopButton";
import dynamic from "next/dynamic";
import { localeFromPath } from "../i18n/config";
import { getDictionary } from "../i18n/dictionaries";
import InteractiveBackdrop from "./InteractiveBackdrop";

const WebVitalsReporter = dynamic(() => import("./WebVitalsReporter"), { ssr: false });

export default function AppProviders({
  children,
  publicFooter,
}: Readonly<{ children: ReactNode; publicFooter: ReactNode }>) {
  const pathname = usePathname();
  const dictionary = getDictionary(localeFromPath(pathname));
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <ThemeProvider>
      {!isAdminRoute && process.env.NEXT_PUBLIC_REPORT_WEB_VITALS === "1" && <WebVitalsReporter />}
      {!isAdminRoute && <a className="skip-link" href="#page-content">{dictionary.common.skip}</a>}
      {!isAdminRoute && <Navbar />}
      {isAdminRoute ? children : <div id="page-content" tabIndex={-1}>{children}</div>}
      {!isAdminRoute && publicFooter}
      {!isAdminRoute && <ScrollToTopButton />}
      {!isAdminRoute && <InteractiveBackdrop />}
    </ThemeProvider>
  );
}
