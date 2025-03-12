"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ExperienceService } from "../service/experienceService";
import { motion } from "framer-motion";
import { FaBuilding, FaCalendarAlt, FaGraduationCap, FaUserTie } from "react-icons/fa";
import Loading from "./Loading";

const ExperiencesBanner = ({ size }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();

  useEffect(() => {
    fetchData();
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
    <div className=" p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center">
        <FaBuilding className="text-green-500 text-black mx-auto" />
      </h2>
      {loading ? (
        <Loading color={"red"} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedExperiences.map((exp) => (
            <motion.div
              key={exp._id}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
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
        <div className="text-center mt-6">
          <button
          aria-label="seeAll"
            onClick={() => navigate.push("/experiences")}
            className="bg-white text-blue-500 font-bold py-2 px-6 rounded-full shadow-md hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            Tümünü Gör
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperiencesBanner;
