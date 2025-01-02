import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathName=usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-bl min-h-16 to-black from-indigo-600 px-3 py-2">
      <div className="mx-auto nav-items flex justify-between items-center">
        <a className={`flex items-center justify-center ${pathName=="/"?'active':''}`} href="/">
          <img src="00.jpg" className="h-10 w-10 object-cover rounded-full mr-2" alt="" />
          Ömer Öztürk
        </a>
        <div className="hidden nav-items  md:flex space-x-10">
          <a className={`${pathName=="/skills"?'active':''}`} href="/skills">Skills <i className="ml-2 pi pi-code text-lime-500"></i></a>
          <a className={`${pathName=="/projects"?'active':''}`} href="/projects">Projects
              <i className="ml-2 pi pi-folder-open text-orange-400"></i>          
          </a>
          <a className={`${pathName=="/about"?'active':''}`} href="/about">About
            <i className="ml-2 pi pi-user text-stone-500"></i>
          </a>
          <a className={`${pathName=="/contact"?'active':''}`} href="/contact">Contact
            <i className="ml-2 pi pi-envelope text-sky-400"></i>
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden space-y-6 mt-5 nav-items">
          <a className={`block ${pathName=="/skills"?'active':''}`}  href="/skills">
            Skills <i className="ml-2 pi pi-code"></i>
          </a>
          <a className={`block ${pathName=="/projects"?'active':''}`}  href="/projects">
            Projects <i className="ml-2 pi pi-folder-open"></i>
          </a>
          <a className={`block ${pathName=="/about"?'active':''}`}  href="/about">
            About <i className="ml-2 pi pi-user"></i>
          </a>
          <a className={`block ${pathName=="/contact"?'active':''}`}  href="/contact">
            Contact <i className="ml-2 pi pi-envelope"></i>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
