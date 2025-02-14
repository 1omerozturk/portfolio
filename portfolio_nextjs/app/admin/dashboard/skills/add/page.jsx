"use client";
import React, { useState } from "react";
import { SkillService } from "../../../service/skillService";
import { useRouter } from "next/navigation";
import Message from "../../../../components/Message";

const SkillAdd = ({ skill }) => {
  const navigate = useRouter();
  const [data, setData] = useState(
    skill
      ? skill
      : {
          name: "",
          level: "",
          percentage: 0,
          icon: "",
          color: "",
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
    if (skill) {
      await SkillService.updateSkill(skill._id, data).then((res) => {
        if (Number(res.status) == 200) {
          Message.ToastMessage(
            "success",
            data.name + " başarıyla güncellendi."
          );
          navigate.back();
        } else {
          Message.ToastMessage("error", "Bir hata oluştu");
          navigate.refresh();
        }
      });
    } else {
      await SkillService.addSkill(data).then((res) => {
        if (Number(res) === 201) {
          navigate.back();
        } else {
          navigate.push("/error");
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 p-6 bg-gray-900 text-white rounded-lg shadow-md"
    >
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-300">Name:</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          required
          className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-300">Level:</label>
        <select
          name="level"
          value={data.level}
          onChange={handleChange}
          required
          className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Expert">Expert</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-300">
          Percentage:
        </label>
        <input
          type="number"
          name="percentage"
          value={data.percentage}
          onChange={handleChange}
          className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-300">Icon:</label>
        <input
          type="text"
          name="icon"
          value={data.icon}
          onChange={handleChange}
          className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-sm font-medium text-gray-300">Color:</label>
        <input
          type="text"
          name="color"
          value={data.color}
          onChange={handleChange}
          className="p-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded text-white font-bold"
      >
        {skill ? "Update Skill" : "Add Skill"}
      </button>
    </form>
  );
};

export default SkillAdd;
