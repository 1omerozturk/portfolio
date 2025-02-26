"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaEdit, FaPlusCircle, FaTrash } from "react-icons/fa";
import Loading from "../../../components/Loading";
import { ExperienceService } from "../../service/experienceService";
import { FormatDate } from "../../components/FormatDate";

const Experiences = () => {
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
          console.log(res);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = (id) => {
    navigate.push(`experiences/edit/${id}`);
  };

  const onDelete = async (id) => {
    try {
      const response = await ExperienceService.deleteExperience(id).then(
        (res) => {
          return res;
        }
      );
      if (Number(response.status) === 200) {
        const updatedData = experiences.filter(
          (experience) => id !== experience._id
        );
        setExperiences(updatedData);
        Message.ToastMessage(
          "success",
          response.data.name + " is deleting successfully."
        );
      } else {
        Message.ToastMessage("error", response.data.name + " is not deleting.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto px-4 py-8 w-full md:w-2/3">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row md:flex-row justify-between items-center mb-6">
            <div className="md:text-3xl text-xl font-bold mb-4 md:mb-0">Experiences</div>
            <button
              onClick={() => navigate.push("experiences/add")}
              className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            >
              <FaPlusCircle className="mr-2" />
              Add
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            {experiences.map((experience) => (
              <div
                key={experience._id}
                className="flex flex-col md:flex-row justify-between items-center md:items-center border-b py-4"
              >
                <div>
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="text-2xl font-semibold">
                      {experience.company}
                    </h3>
                    <Image
                    className="object-cover"
                      src={experience.companyLogo}
                      alt={experience.company}
                      width={80}
                      height={80}
                    />
                  </div>
                  <h6 className="text-md font-semibold">
                    {experience.position}
                  </h6>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:col-start-auto gap-2 my-2">
                    {experience.responsibilities.map((tech, index) => (
                      <div
                        key={index}
                        className="text-sm border-2 p-1 w-fit rounded-md border-gray-200"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-200">
                    {FormatDate(experience.startDate)} -{" "}
                    {FormatDate(experience.endDate || "Devam ediyor")}
                  </p>
                </div>
                <div className="flex items-center justify-around space-x-4 w-full md:w-1/3 md:flex-col md:items-end md:space-x-0 md:space-y-8">
                  <button
                    onClick={() => onEdit(experience._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit  className="text-2xl" />
                  </button>
                  <button
                    onClick={() => onDelete(experience._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Experiences;
