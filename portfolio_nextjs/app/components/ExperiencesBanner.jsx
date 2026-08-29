"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ExperienceService } from "../service/experienceService";
import { motion } from "framer-motion";
import { FaBuilding, FaCalendarAlt, FaUserTie } from "react-icons/fa";
import Loading from "./Loading";
import AOS from "aos";
import SeeMore from "./SeeMore";

const ExperiencesBanner = ({ size }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();

  useEffect(() => {
    fetchData().then(() => {
      AOS.init({ duration: 1000, once: true });
    });
  }, []);

  const fetchData = async () => {
    try {
      await ExperienceService.getExperiences()
        .then((res) => {
          setExperiences(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const displayedExperiences = size ? experiences.slice(0, size) : experiences;

  return (
    <div className="mx-auto px-4 py-8">
      <div className="flex items-center justify-center text-4xl text-gray-800 mb-3">
            <div className="grid grid-flow-col space-x-14">
              <h1 className=" font-rubik text-indigo-500"> Experiences </h1>
              <FaBuilding className="text-indigo-400" />
            </div>
          </div>
      {loading ? (
        <Loading color={"red"} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedExperiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              data-aos={`${index % 2 == 0 ? "fade-left" : "fade-right"}`}
            >
              <div className="flex items-center mb-2">
                <FaBuilding className="text-blue-500 text-xl mr-2" />
                <h3 className="text-xl font-semibold">{exp.company}</h3>
              </div>
              <div className="flex items-center mb-2">
                <FaUserTie className="text-green-500 text-xl mr-2" />
                {exp.position}
              </div>
              <div className="flex items-center mb-4">
                <FaCalendarAlt className="text-purple-500 text-xl mr-2" />
                {new Date(exp.startDate).toLocaleDateString()} -{" "}
                {exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString()
                  : "still working"}
              </div>
              <ul className="list-disc list-inside text-gray-700">
                {exp.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      )}
      {size && experiences.length > size && (
       <SeeMore path="experiences"/>
      )}
    </div>
  );
};

export default ExperiencesBanner;
