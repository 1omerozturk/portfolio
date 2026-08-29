"use client";

import React from "react";
import Image from "next/image";
import { ReactTyped } from "react-typed";
import "aos/dist/aos.css";
import AOS from "aos";
import SocialBanner from "../components/SocialBanner";

const AboutMe = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: false });
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    const fileName='omer_ozturk_en.pdf'
    link.href = `/CV/${fileName}`
    link.download = fileName
    link.rel = 'noopener noreferrer' // For security and SEO
    link.click()
  };

  return (
    <div>
      <section className="py-10 flex items-center justify-center">
        <div
          className="w-4/5 lg:w-3/5 rounded-lg p-10"
          data-aos="fade-up"
        >
          <div className="text-3xl font-bold text-black mb-6 text-center">
            <Image
              src="/ozturkomer.webp"
              alt="Ömer Öztürk"
              width={200}
              height={200}
              quality={70}
              className="object-cover rounded-lg mx-auto sm:size-40 md:size-54 lg:size-72"
            />
          </div>
          <h1 className="sm:text-4xl font-bold font-serif text-center mb-5">
            <span className="text-indigo-600">Hi!</span>
          </h1>
          <h1 className="sm:text-4xl text-3xl font-bold font-serif text-center text-indigo-700 mb-5 -my-10">
            I'm
          </h1>
          <h1 className="sm:text-4xl -my-10 text-3xl font-bold font-serif text-center text-indigo-800 mb-5">
            Ömer Öztürk
          </h1>
          <ReactTyped
            strings={[
              "Software Enginner 🌐",
              "Full Stack Developer 💻",
              "Mobil Developer 📱",
            ]}
            typeSpeed={50}
            backSpeed={30}
            loop
            className="block text-xl font-semibold text-center text-slate-700"
          />
          <p
            className="text-lg mt-5 text-slate-600 leading-relaxed text-justify"
            data-aos="fade-right"
          >
            I have a growing passion for technology and am constantly Full Stack
            and Mobile Application development I specialise in projects, where
            my goal is to use my interest in technology to inspire more people
            by sharing.
          </p>
          <div className="mt-8 flex flex-col space-y-4 items-center justify-center">
            <button
              data-aos="fade-right"
              onClick={() => handleDownload()}
              className="px-3 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300"
            >
              Download CV ⬇️
            </button>
            <div data-aos="fade-left" className="flex lg:block ">
              <SocialBanner />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutMe;
