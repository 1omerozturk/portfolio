"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <navbar className="navbar navbar- h-20 p-2 pb-3 bg-slate-300 border-b-2 border-black ">
      <Link href="/" className="navbar-brand flex justify-between items-center">
        <img 
        className=" h-12 w-12 rounded-full" src="00.jpg"
        />
        Ömer Öztürk
        </Link>
      <Link  href="/projects" className={`navbar-item ${pathname=="/projects" ? "active" : ""}`}>Projects</Link>
      <Link href="/skills" className={`navbar-item ${pathname=="/skills" ? "active" : ""}`}>Skills</Link>
      <Link href="/contents" className={`navbar-item ${pathname=="/contents" ? "active" : ""}`}>Contents</Link>
      <Link href="/admin" className={`navbar-item  ${pathname=="/admin" ? "active" : ""}`}>
       Admin</Link>
    </navbar>
  );
};

export default Navbar;