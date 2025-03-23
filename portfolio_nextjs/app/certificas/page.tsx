"use client";

import React from "react";
// import aos
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

interface CertificatesSizeProps {
  size?: number;
}

const Certificas: React.FC<CertificatesSizeProps> = ({ size }) => {

  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const pdfLinks = [
    "https://drive.google.com/file/d/1zAdK3RoerH2se-rRHjY5yHub1LuVS5JM/preview",
    "https://drive.google.com/file/d/1tX4_qfQVJPTxqm6_mOjecJXi_tTedl6r/preview",
    "https://drive.google.com/file/d/1GNd0dyO1CGQAwEF-Y9cTqVP_wlqSx3EL/preview",
    "https://drive.google.com/file/d/1zAdK3RoerH2se-rRHjY5yHub1LuVS5JM/preview",
    "https://drive.google.com/file/d/101W6SCvSTUWjCKWkTbTzsyFQybs2X1E3/preview",
    "https://drive.google.com/file/d/10J0C7SVA2rHqRXDkfc7FmtPTlB9tz3Y-/preview",
    "https://drive.google.com/file/d/1Hv4guLJR136qaBKjpa0MKGvxL4rBmiuq/preview",
    "https://drive.google.com/file/d/1mB-AFyIPKnGvwVRK_0N5as_jhrf4OJDH/preview",
    "https://drive.google.com/file/d/1qdSHpN6uDGDBhj8tE2L20hCskKlOamKv/preview",
    "https://drive.google.com/file/d/1ZzTgZWU-em2g5Iew6ZJZvdchu2t0noGk/preview",
    "https://drive.google.com/file/d/16S4CCKy_3rxtYPSR53Eo019EA4XCaoAz/preview",
    "https://drive.google.com/file/d/1EJnkinJ3X1HBqMabc49ihVQWw2Pwno5i/preview",
    "https://drive.google.com/file/d/13Q4-NP_DdTK4yw5_QVhZ_VBH0EoR0DDQ/preview",
    "https://drive.google.com/file/d/16Gxn0zSWGYhVBr--M25WgCTKaZBnInQc/preview",
    "https://drive.google.com/file/d/1vAKT5ljR9wKvhCV4zDj_URA-zPI2eMeQ/preview",
    "https://drive.google.com/file/d/1omdj6TAuYEtNGaxnJFcc4iHYYfAH_eYu/preview",
    "https://drive.google.com/file/d/1XlT_iaJeWY0278Tk68R0GXh9TShMir9X/preview",
    "https://drive.google.com/file/d/1yNdDxDTHQP0vFSTTzamAaZy6SBQVDz2Y/preview",
    "https://drive.google.com/file/d/1gDfaaQ_FAKMItjcy4BPdQsPjzi8aaOOQ/preview",
    "https://drive.google.com/file/d/1gjgYbWOyEvwbiXPKUXAvKBRnYA0N7si6/preview",
  ];

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
          <Link href="/certificates" style={{}} className="text-center hover:drop-shadow-xl hover:font-semibold text-indigo-700">
            See More
          </Link>
        )}
      </div>
    </div>
  );
};

export default Certificas;
