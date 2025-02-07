"use client";

import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";

const SocialBanner = () => {
  const socials = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-2xl"/>,
      link: "https://www.facebook.com",
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-2xl"/>,
      link: "https://www.twitter.com",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-2xl"/>,
      link: "https://www.instagram.com",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-2xl"/>,
      link: "https://www.linkedin.com",
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-2xl"/>,
      link: "https://www.github.com",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-2xl"/>,
      link: "https://www.youtube.com",
    },
  ];

  return (
    <div className={`grid grid-flow-col w-fit sm:space-x-4 space-x-1 text-center mx-auto`}>
      {socials.map((social, index) => (
        <a 
          key={index} 
          href={social.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-200 transition duration-100 ease-in-out transform hover:-translate-y-1 hover:text-black"
        >
          <div className="p-2 w-fit rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition duration-100 ease-in-out transform hover:-translate-y-1">
            {social.icon}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialBanner;

