"use client";

import React from "react";
// import aos
import AOS from "aos";
import "aos/dist/aos.css";
import { pdfLinks } from "../models/certificates";
import { FaMedal } from "react-icons/fa";
import SeeMore from "../components/SeeMore";

interface CertificatesSizeProps {
  size?: number;
}

const Certificas: React.FC<CertificatesSizeProps> = ({ size }) => {
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="container mx-auto p-4">
       <div className="flex items-center justify-center text-4xl text-gray-800 mb-3">
             <div className="grid grid-flow-col space-x-14">
               <h1 className=" font-rubik text-indigo-500"> Certificates </h1>
               <FaMedal className="text-indigo-400" />
             </div>
           </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfLinks.slice(0, size ? size : pdfLinks.length).map((link, index) => (
          <div
            data-aos={`${index % 2 == 0 ? "fade-up" : "fade-down"}`}
            key={index}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <iframe
              className="transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-black"
              src={link}
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
              title={`Sertifika ${index + 1}`}
            ></iframe>
            <a
              href={link.replace("/preview", "")}
              download
              className="block text-center bg-blue-500 text-white py-2 mt-2 rounded hover:bg-blue-600"
            >
              Inspect
            </a>
          </div>
        ))}
      </div>
      {size && (
        <SeeMore path="certificates"/>
      )}
    </div>
  );
};

export default Certificas;
