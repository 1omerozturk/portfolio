"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import AOS from "aos";

const Links = () => {
  const [links, setLinks] = useState([]);
  const data = [
    { href: "/about", label: "About" },
    { href: "/skills", label: "Skills" },
    { href: "/projects", label: "Projects" },
    { href: "/experiences", label: "Experiences" },
    { href: "/certificates", label: "Certificates" },
    { href: "/contact", label: "Contact" },
  ];

  const fetchData = async () => {
    await setLinks(data);
  };

  useEffect(() => {
    fetchData().then(() => {
      AOS.init({ duration: 1000, once: false });
    });
  }, []);

  return (
    <div className="grid grid-flow-row w-full space-y-4">
      <div className="w-fit h-fit p-2 rounded-full bg-slate-300">
        <FaLink className="mx-auto text-3xl text-lime-500" />
      </div>
      {links?.map((link, index) => (
        <Link
          key={index}
          className="link"
          href={link.href}
          data-aos={"fade-right"}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Links;
