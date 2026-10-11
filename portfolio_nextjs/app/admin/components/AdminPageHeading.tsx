"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import AdminContentIcon from "./AdminContentIcon";

const kinds = ["social", "certificates", "educations", "experiences", "skills", "blogs", "projects", "languages", "hobbies", "contents", "contacts", "about"] as const;
export default function AdminPageHeading({ children, className = "" }: { children: ReactNode; className?: string }) {
  const pathname = usePathname();
  const kind = kinds.find(value => pathname.split("/").includes(value)) || (pathname === "/admin/dashboard" ? "overview" : "about");
  return <div className={`flex items-center gap-3 ${className}`}><AdminContentIcon kind={kind} /><h1 className="min-w-0 break-words">{children}</h1></div>;
}
