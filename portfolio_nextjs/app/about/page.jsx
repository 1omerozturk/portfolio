"use client";

import React from "react";
import { ReactTyped } from "react-typed";
import "aos/dist/aos.css";
import AOS from "aos";
import SocialBanner from "../components/SocialBanner";

const AboutMe = () => {
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "cv.pdf"; // PDF dosyanızın yolu
    link.download = "omer_ozturk.pdf";
    link.click();
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-slate-600 to-slate-200 py-10 flex items-center justify-center">
      <div
        className="w-4/5 lg:w-3/5 bg-gradient-to-l from-slate-100 to-slate-400 shadow-lg shadow-slate-400 rounded-lg p-10"
        data-aos="fade-up"
      >
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
          and Mobile Application development I specialise in projects, where my
          goal is to use my interest in technology to inspire more people by
          sharing.
        </p>
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-center lg:space-x-5 space-y-5 lg:space-y-0">
          <button
            data-aos="fade-right"
            onClick={() => handleDownload()}
            className="px-3 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300"
          >
            CV'yi İndir
          </button>
          <div data-aos="fade-left" className="flex lg:block ">
            <SocialBanner />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
