"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaHome,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaShareAlt,
  FaCode,
  FaAward,
  FaSpaceShuttle,
  FaMediumM,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";

const AdminSideBar = ({ onLogout }) => {
  const [active, setActive] = useState("Dashboard");
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome className="text-white" />, },
    { name: "About", path: "/admin/dashboard/about", icon: <FaUser className="text-gray-500" />, },
    {
      name: "Social",
      path: "/admin/dashboard/social",
      icon: <FaShareAlt className="text-violet-500" />,
    },
    {
      name: "Educations",
      path: "/admin/dashboard/educations",
      icon: <FaGraduationCap className="text-red-500" />,
    },
    {
      name: "Experiences",
      path: "/admin/dashboard/experiences",
      icon: <FaBriefcase className="text-teal-500" />,
    },
    {
      name: "Projects",
      path: "/admin/dashboard/projects",
      icon:<FaSpaceShuttle className="text-sky-500" />,
    },
    {
      name: "Skills",
      path: "/admin/dashboard/skills",
      icon: <FaCode className="text-lime-500" />,
    },
    {
      name: "Contents",
      path: "/admin/dashboard/contents",
      icon: <FaMediumM className="text-slate-300" />,
    },
    {
      name: "Certificates",
      path: "/admin/dashboard/certificates",
      icon: <FaAward className="text-yellow-500" />,
    },
    {
      name: "Contacts",
      path: "/admin/dashboard/contacts",
      icon: <MdMessage className="text-orange-500"/>,
    }
  ];

  return (
    <div
      className={`h-auto bg-gray-900 pr-3  text-white transition-all duration-300 
       ${open ? "w-36" : "w-16"}
        md:${open ? "w-40" : "w-16"}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <h6 className="text-center font-bold mt-2">Admin</h6>
      <img
      src="/omer ozturk.webp"
      className="bg-cover h-16 w-16 rounded-full mx-auto"
      />
      <nav className="mt-5">
        {links.map((link, index) => (
          <Link
            rel="noopener noreferrer"
            key={index}
            href={link.path}
            className={`flex items-center py-2 px-3 my-2 rounded-md hover:bg-gray-700 transition ${
              active === link.name ? "bg-gray-700" : ""
            }`}
            onClick={() => setActive(link.name)}
          >
            <span className="mr-2 text-lg">{link.icon}</span>
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {link.name}
            </span>
          </Link>
        ))}
      </nav>
      <div className="flex items-center justify-center">
        <button
          title="Logout"
          onClick={onLogout}
          className="mt-5 w-full mx-auto bg-red-500 hover:bg-red-700 py-2 rounded-md transition "
        >
          <i className="pi pi-sign-out"></i>
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
