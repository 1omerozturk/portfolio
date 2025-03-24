"use client";

import React from "react";
// import aos
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { pdfLinks } from "../models/certificates";

interface CertificatesSizeProps {
  size?: number;
}

const Certificas: React.FC<CertificatesSizeProps> = ({ size }) => {
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Certificates</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfLinks.slice(0, size ? size : pdfLinks.length).map((link, index) => (
          <div
            data-aos={"fade-up"}
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
        {size && (
          <Link
            href="/certificates"
            style={{}}
            className="text-center hover:drop-shadow-xl hover:font-semibold text-indigo-700"
          >
            See More
          </Link>
        )}
      </div>
    </div>
  );
};

export default Certificas;
