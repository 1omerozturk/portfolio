"use client";

import React, { useState, useEffect } from "react";
import DefaultData from "../models/socialLinks.json";
import { SocialService } from "../service/SocialService";
import { DynamicIcon } from "./DynamicIcon";

const SocialBanner = () => {
  const [socialLinks, setSocialLinks] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setSocialLinks(DefaultData);
    } else {
      fetchSocialLinks();
    }
  }, []);

  const fetchSocialLinks = async () => {
    try {
      setLoading(true);
      const response = await SocialService.getSocials()
        .then((res) => {
          console.log(res.data);
          return res.data;
        })
        .finally(() => {
          setLoading(false);
        });
      setSocialLinks(response);
    } catch (error) {
      console.error("Error fetching social links", error);
      setLoading(false);
    }
  };

  return (
    <div
      className={`grid grid-flow-col w-fit sm:space-x-4 space-x-1 text-center mx-auto`}
    >
      {socialLinks?.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-200 transition duration-100 ease-in-out transform hover:scale-95 hover:text-black"
        >
          <div className="p-2 w-fit rounded-full bg-indigo-200 hover:bg-indigo-700 shadow-md hover:shadow-lg transition duration-100 ease-in-out transform hover:scale-95">
            <DynamicIcon iconName={social.icon} />
          </div>
        </a>
      ))}
    </div>
  );
};

export default SocialBanner;
