"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaAddressCard } from "react-icons/fa";
import AOS from "aos";

const ContactBanner = () => {
  const [links, setLinks] = useState([]);
  const data = [
    {
      href: "mailto:omer.ozturk.or.ok@gmail.com",
      text: "omer.ozturk.or.ok@gmail.com",
    },
    {
      href: "tel:05011551065",
      text: "05011551065",
    },
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
    <div className="grid grid-flow-row text-center space-y-4">
      <div className="w-fit h-fit p-2 mx-auto rounded-full bg-slate-300">
        <FaAddressCard className="text-3xl text-orange-500" />
      </div>
      {links.map((link, index) => (
        <Link
          key={index}
          className="link2"
          href={link.href}
          data-aos="fade-left"
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
};

export default ContactBanner;
