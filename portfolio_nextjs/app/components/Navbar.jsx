"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-bl to-black from-indigo-600 px-3 py-2">
      <div className="mx-auto nav-items flex justify-between items-center">
        <a
          id="#top"
          className={`flex items-center justify-center ${
            pathName == "/" ? "active" : ""
          }`}
          href="/"
        >
          <Image
            src="/omer ozturk.webp"
            width={40}
            height={40}
            className="object-cover rounded-full mr-2"
          />
          {/* <img src="/omer ozturk.webp" alt="Ömer Öztürk" className="h-10 w-10 object-cover rounded-full mr-2" /> */}
          Ömer Öztürk
        </a>
        <div className="hidden nav-items  md:flex space-x-10">
          <a
            className={`${pathName == "/skills" ? "active" : ""}`}
            href="/skills"
          >
            Skills <i className="ml-2 pi pi-code text-lime-500"></i>
          </a>
          <a
            className={`${pathName == "/projects" ? "active" : ""}`}
            href="/projects"
          >
            Projects
            <i className="ml-2 pi pi-folder-open text-orange-400"></i>
          </a>
          <a
            className={`block ${pathName == "/educations" ? "active" : ""}`}
            href="/educations"
          >
            Educations{" "}
            <i className="ml-2 pi pi-graduation-cap text-slate-100"></i>
          </a>
          <a
            className={`${pathName == "/experiences" ? "active" : ""}`}
            href="/experiences"
          >
            Experiences
            <i className="ml-2 pi pi-slack text-sky-400"></i>
          </a>
          <a
            className={`${pathName == "/certificas" ? "active" : ""}`}
            href="/certificas"
          >
            Certificas
            <i className="ml-2 pi pi-trophy text-indigo-400"></i>
          </a>
          <a
            className={`${pathName == "/about" ? "active" : ""}`}
            href="/about"
          >
            About
            <i className="ml-2 pi pi-user text-slate-400"></i>
          </a>
          <a
            className={`${pathName == "/contact" ? "active" : ""}`}
            href="/contact"
          >
            Contact
            <i className="ml-2 pi pi-envelope text-rose-500"></i>
          </a>
        </div>
        <div className="md:hidden">
          <button
            aria-label="toggle"
            onClick={toggleMenu}
            className="text-gray-300 hover:drop-shadow-2xl hover:shadow-white hover:text-white focus:outline-none"
          >
            {" "}
            <i className={`pi ${isOpen ? "pi-times" : "pi-bars"} text-2xl`}></i>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden space-y-6 mt-5 nav-items">
          <a
            className={`block ${pathName == "/skills" ? "active" : ""}`}
            href="/skills"
          >
            Skills <i className="ml-2 pi pi-code text-lime-400"></i>
          </a>
          <a
            className={`block ${pathName == "/projects" ? "active" : ""}`}
            href="/projects"
          >
            Projects <i className="ml-2 pi pi-microchip text-yellow-400"></i>
          </a>
          <a
            className={`block ${pathName == "/educations" ? "active" : ""}`}
            href="/educations"
          >
            Educations{" "}
            <i className="ml-2 pi pi-graduation-cap text-slate-100"></i>
          </a>
          <a
            className={`block ${pathName == "/experiences" ? "active" : ""}`}
            href="/experiences"
          >
            Experiences
            <i className="ml-2 pi pi-slack text-sky-400"></i>
          </a>
          <a
            className={`block ${pathName == "/certificas" ? "active" : ""}`}
            href="/certificas"
          >
            Certificas
            <i className="ml-2 pi pi-trophy text-indigo-400"></i>
          </a>
          <a
            className={`block ${pathName == "/about" ? "active" : ""}`}
            href="/about"
          >
            About <i className="ml-2 pi pi-user text-slate-400"></i>
          </a>
          <a
            className={`block ${pathName == "/contact" ? "active" : ""}`}
            href="/contact"
          >
            Contact <i className="ml-2 pi pi-envelope text-rose-500"></i>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
