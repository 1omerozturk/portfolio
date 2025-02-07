"use client";

import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaGithub, FaLinkedin } from "react-icons/fa";

const SocialBanner = () => {
  const socials = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-xl"/>,
      link: "https://www.facebook.com",
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-xl"/>,
      link: "https://www.twitter.com",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-xl"/>,
      link: "https://www.instagram.com",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-xl"/>,
      link: "https://www.linkedin.com",
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-xl"/>,
      link: "https://www.github.com",
    },
    {
      name: "YouTube",
      icon: <FaYoutube className="text-xl"/>,
      link: "https://www.youtube.com",
    },
  ];

  return (
    <div className="grid grid-flow-col text-center auto-cols-auto space-x-1 ">
      {socials.map((social, index) => (
        <a 
          key={index} 
          href={social.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-slate-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:text-white"
        >
          <div className="p-3 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition duration-300 ease-in-out transform">
            {social.icon}
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialBanner;

