"use client"
import React from "react";
import { FaTwitter,FaFacebook,FaInstagram,FaYoutube,FaGithub,FaLinkedin } from "react-icons/fa";

const SocialBanner = () => {
  const socials = [
    {
      name: "Facebook",
      icon: <FaFacebook color="blue" />,
      link: "https://www.facebook.com",
    },
    { name: "Twitter", icon: <FaTwitter color="skyblue" />, link: "https://www.twitter.com" },
    {
      name: "Instagram",
      icon: <FaInstagram color="red" />,
      link: "https://www.instagram.com",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin color="blue" />,
      link: "https://www.linkedin.com",
    },
    { name: "GitHub", icon: <FaGithub color="gray" />, link: "https://www.github.com" },
    { name: "YouTube", icon: <FaYoutube color="red" />, link: "https://www.youtube.com" },
  ];

  return (
    <div className="grid grid-flow-col text-center auto-cols-auto space-x-1 ">
      {socials.map((social, index) => (
        <div className="" key={index}>
          <button className="animate-colorChange font-bold text-2xl border-2 border-indigo-500 hover:bg-black p-2 rounded-xl hover:drop-shadow-lg hover:shadow-white">
            {social.icon}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SocialBanner;
