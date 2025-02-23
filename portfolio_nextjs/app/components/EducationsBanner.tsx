"use client";
import React, { useEffect, useState } from "react";
import { EducationService } from "../service/educationService";
import { FaDotCircle, FaGraduationCap, FaRegDotCircle } from "react-icons/fa";

interface EducationSizeProps {
  size?: number;
}

const EducationsBanner: React.FC<EducationSizeProps> = ({ size }) => {
  const [educations, setEducations] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEducations = async () => {
    try {
      await EducationService.getEducations()
        .then((res) => {
          console.log(res.data);
          setEducations(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error("Error fetching educations", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  return (
    <div className="mx-auto px-4 py-8 shadow-lg">
      <div className="flex items-center justify-center text-4xl text-gray-800 mb-3">
        <FaGraduationCap />
      </div>
      <div className="space-y-8">
        {educations?.map((education, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row rounded-lg drop-shadow-lg hover:drop-shadow-xl transition-shadow duration-300 p-6"
          >
            {/* Institution Logo */}
            <div className="md:w-1/4 flex items-center justify-center mb-6 md:mb-0">
              <img
                src={education.institutionLogo}
                alt={education.institution}
                className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-full border-4 border-gray-100"
              />
            </div>

            {/* Education Details */}
            <div className="md:w-3/4 md:pl-8 flex items-center justify-center">
              <div className="flex flex-col space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {education.institution}
                </h3>

                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {education.degree}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {education.fieldOfStudy}
                  </span>
                </div>

                <div className="text-gray-500 text-sm font-mono flex items-center space-x-2">
                  <span className="text-green-200 font-medium mr-2">
                    <FaRegDotCircle />
                  </span>
                  {new Date(education.startDate).toLocaleDateString()} -{" "}
                  <span className="text-red-200 font-medium mr-2">
                    <FaDotCircle />{" "}
                  </span>
                  {new Date(education.endDate).toLocaleDateString()}
                </div>

                {education.grade && (
                  <div className="flex items-center">
                    <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                      {education.grade}
                    </span>
                  </div>
                )}

                {education.activities && education.activities.length > 0 && (
                  <div className="mt-2">
                    <div className="flex flex-wrap gap-2">
                      {education.activities.map((activity, i) => (
                        <span
                          key={i}
                          className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {education.description && (
                  <p className="text-gray-600 leading-relaxed mt-2">
                    {education.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationsBanner;
