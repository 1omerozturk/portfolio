"use client";
import React, { useState } from "react";
import { EducationService } from "../../../service/educationService";
import { useRouter } from "next/navigation";
import Message from "../../../../components/Message";
import BackIcon from "../../../components/BackIcon";
import { FormatNumericDate } from "../../../components/FormatDate";

interface EducationAddProps {
  education?: any;
}

const EducationAdd: React.FC<EducationAddProps> = ({ education }) => {
  const navigate = useRouter();
  const [data, setData] = useState(
    education
      ? education
      : {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: new Date(),
          endDate: new Date(),
          grade: "",
          activities: [""],
          description: "",
          institutionLogo: "",
        }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (education) {
      await EducationService.updateEducation(education._id, data).then(
        (res) => {
          if (Number(res) === 200) {
            Message.ToastMessage(
              "success",
              data.institution + " başarıyla güncellendi."
            );
            navigate.back();
          } else {
            Message.ToastMessage("error", "Bir hata oluştu");
            navigate.refresh();
          }
        }
      );
    } else {
      await EducationService.addEducation(data).then((res) => {
        if (Number(res) === 201) {
          navigate.back();
        } else {
          navigate.refresh();
        }
      });
    }
  };

  return (
    <>
      <BackIcon />
      <div className="container mx-auto md:w-1/2 p-4">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 p-6 md:w-1/2 mx-auto bg-gray-900 text-white rounded-lg shadow-md"
        >
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Institution:
            </label>
            <input
              type="text"
              name="institution"
              value={data.institution}
              onChange={handleChange}
              required
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Degree:
            </label>
            <input
              type="text"
              name="degree"
              value={data.degree}
              onChange={handleChange}
              required
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Field of Study:
            </label>
            <input
              type="text"
              name="fieldOfStudy"
              value={data.fieldOfStudy}
              onChange={handleChange}
              required
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Start Date:
            </label>
            <input
              type="date"
              name="startDate"
              value={FormatNumericDate(data.startDate)}
              onChange={handleChange}
              required
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              End Date:
            </label>
            <input
              type="date"
              name="endDate"
              value={FormatNumericDate(data.endDate)}
              onChange={handleChange}
              required
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500 text-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Grade:
            </label>
            <input
              type="text"
              name="grade"
              value={data.grade}
              onChange={handleChange}
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Activities:
            </label>
            <input
              type="text"
              name="activities"
              value={data.activities.join(", ")}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "activities",
                    value: e.target.value.split(", "),
                  },
                })
              }
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Description:
            </label>
            <textarea
              name="description"
              value={data.description}
              onChange={handleChange}
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 text-sm font-medium text-gray-300">
              Institution Logo:
            </label>
            <input
              type="text"
              name="institutionLogo"
              value={data.institutionLogo}
              onChange={handleChange}
              className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-bold"
          >
            {education ? "Update Education" : "Add Education"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EducationAdd;
