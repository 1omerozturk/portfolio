import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <navbar className="navbar navbar- h-20 p-2 pb-3 bg-slate-300 border-b-2 border-black ">
      <Link href="/" className="navbar-brand flex justify-between items-center">
        <img 
        className=" h-12 w-12 rounded-full" src="00.jpg"
        />
        Ömer Öztürk
        </Link>
      <Link href="/projects" className="navbar-item">Projects</Link>
      <Link href="/about" className="navbar-item">About</Link>
      <Link href="/admin" className="navbar-item">
       Admin</Link>
    </navbar>
  );
};

export default Navbar;
