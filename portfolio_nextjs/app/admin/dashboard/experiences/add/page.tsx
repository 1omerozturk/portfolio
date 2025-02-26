"use client";

import React, { useState } from "react";
import Message from "../../../../components/Message";
import { useRouter } from "next/navigation";
import { ExperienceService } from "../../../service/experienceService";
import { FaMinusCircle, FaPlus, FaPlusCircle } from "react-icons/fa";

interface AddExperienceProps {
  experience?: any;
}
const AddExperience: React.FC<AddExperienceProps> = ({ experience }) => {
  const router = useRouter();
  const [data, setData] = useState(
    experience
      ? experience
      : {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          responsibilities: [""],
          companyLogo: "",
        }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResponsibilityChange = (index, value) => {
    const newResponsibilities = [...data.responsibilities];
    newResponsibilities[index] = value;
    setData((prevData) => ({
      ...prevData,
      responsibilities: newResponsibilities,
    }));
  };

  const addResponsibility = () => {
    setData((prevData) => ({
      ...prevData,
      responsibilities: [...prevData.responsibilities, ""],
    }));
  };

  const removeResponsibility = (index) => {
    const newResponsibilities = data.responsibilities.filter(
      (res, i) => i !== index
    );
    setData((prevData) => ({
      ...prevData,
      responsibilities: newResponsibilities,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (experience) {
      try {
        await ExperienceService.updateExperience(experience._id, data).then(
          (res) => {
            console.log(res);
            if (res.status == 200) {
              Message.ToastMessage(
                "success",
                data.company + " başarıyla güncellendi."
              );
              router.back();
            } else {
              Message.ToastMessage(
                "error",
                data.company + " güncellenirken bir hata oluştu. Tekrar deneyin."
              );
              router.refresh();
            }
          }
        );
      } catch (error) {
        Message.ToastMessage(
          "error",
          data.company + " güncellenirken bir hata oluştu. Tekrar deneyin."
        );
        console.error(error.message);
      }
    } else {
      try {
        await ExperienceService.addExperience(data).then((res) => {
          console.log(res);
          if (res.status == 201) {
            Message.ToastMessage(
              "success",
              data.company + " başarıyla eklendi."
            );
            router.back();
          } else {
            Message.ToastMessage(
              "error",
              data.company + " eklenirken bir hata oluştu. Tekrar deneyin."
            );
            router.refresh();
          }
        });
      } catch (error) {
        Message.ToastMessage(
          "error",
          data.company + " eklenirken bir hata oluştu. Tekrar deneyin."
        );
        console.error(error.message);
      }
    }
  };

  return (
<div className="mx-auto px-4 py-8 bg-gradient-to-t from-slate-900 to-slate-800 rounded-lg shadow-lg w-full md:w-2/3">
  <h2 className="text-2xl font-bold mb-6 text-center">
    {experience ? "Update Experience" : "Add New Experience"}
  </h2>
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-slate-100 font-bold mb-2">
        Company:
      </label>
      <input
        type="text"
        name="company"
        value={data.company}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Company Name"
      />
    </div>
    <div className="mb-4">
      <label className="block text-slate-100 font-bold mb-2">
        Position:
      </label>
      <input
        type="text"
        name="position"
        value={data.position}
        onChange={handleChange}
        required
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Position"
      />
    </div>
    <div className="flex flex-col md:flex md:flex-row items-center justify-between mb-4">
      <div className="w-full md:w-1/2 md:mr-2">
        <label className="block text-slate-100 font-bold mb-2">
          Start Date:
        </label>
        <input
          type="date"
          name="startDate"
          value={data.startDate}
          onChange={handleChange}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="w-full md:w-1/2 md:pl-2">
        <label className="block text-slate-100 font-bold mb-2">
          End Date:
        </label>
        <input
          type="date"
          name="endDate"
          value={data.endDate}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
    <div className="mb-4">
      <label className="block text-slate-100 font-bold mb-2">
        Company Logo URL:
      </label>
      <input
        type="text"
        name="companyLogo"
        value={data.companyLogo}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
        placeholder="http://"
      />
    </div>
    <div className="mb-4">
      <label className="block text-slate-100 font-bold mb-2">
        Responsibilities:
      </label>
      {data.responsibilities.map((res, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={res}
            onChange={(e) =>
              handleResponsibilityChange(index, e.target.value)
            }
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            placeholder={`Sorumluluk ${index + 1}`}
          />
          <button
            type="button"
            onClick={() => removeResponsibility(index)}
            className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold p-2 px-3 rounded focus:outline-none focus:shadow-outline"
          >
            <FaMinusCircle className="block" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addResponsibility}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 px-3 rounded focus:outline-none focus:shadow-outline"
      >
        <FaPlusCircle className="block" />
      </button>
    </div>
    <button
      type="submit"
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      {experience ? "Güncelle" : "Ekle"}
    </button>
  </form>
</div>

  );
};

export default AddExperience;
