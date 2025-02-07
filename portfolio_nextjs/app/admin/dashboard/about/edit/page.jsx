"use client"
import React, { useState } from "react";
import { Manage } from "../../../manage";

const PersonalInfoUpdate = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    address: "",
    about: "",
    profilePicture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Manage.addPersonalInfo(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-md bg-[#151956]"
    >
      <h2 className="text-2xl text-white font-bold mb-4 text-center">Update Personal Info</h2>
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2">Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2">Job Title:</label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2">Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2">Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2">About:</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded min-h-[100px]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 font-bold mb-2">
          Profile Picture:
        </label>
        <input
          type="text"
          name="profilePicture"
          value={formData.profilePicture}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded"
        />
      </div>
      <div className="flex justify-center">

      <button
        type="submit"
        className="px-4 py-2 bg-indigo-500 text-white font-bold rounded hover:bg-indigo-700"
        >
        Save
      </button>
          </div>
    </form>
  );
};

export default PersonalInfoUpdate;
