"use client";
import React, { useState } from "react";
import { CertificationService } from "../../../service/certificationsService";
import { useRouter } from "next/navigation";
import BackIcon from "../../../components/BackIcon";

interface AddCertificationProps {
  certification?: any;
}

const AddCertification: React.FC<AddCertificationProps> = ({
  certification,
}) => {
  const navigate = useRouter();
  const [data, setData] = useState(
    certification
      ? {
          ...certification,
          issueDate: certification.issueDate.split("T")[0], // Tarih formatını düzelt
        }
      : {
          name: "",
          issuingOrganization: "",
          issueDate: "",
          certificateLink: "",
          certificateImage: "",
          type: "web",
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
    try {
      if (certification) {
        await CertificationService.updateCertification(certification._id, data);
      } else {
        await CertificationService.createCertification(data);
      }
      setTimeout(() => {
        navigate.back();
      }, 1500); // 1.5 saniye sonra yönlendir
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <BackIcon />
      <div className="max-w-2xl mx-auto bg-black/50 text-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {certification ? "Sertifikayı Güncelle" : "Yeni Sertifika Ekle"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Organization
            </label>
            <input
              type="text"
              name="issuingOrganization"
              value={data.issuingOrganization}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={data.issueDate}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Certificate Link
            </label>
            <input
              type="url"
              name="certificateLink"
              value={data.certificateLink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Certificate Image
            </label>
            <input
              type="url"
              name="certificateImage"
              value={data.certificateImage}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              value={data.type}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black"
              required
            >
              {/* default value */}
              <option value="">Seçiniz</option>
              <option value="web">Web</option>
              <option value="mobile">Mobile</option>
              <option value="ai">AI</option>
              <option value="database">Database</option>
              <option value="security">Security</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {certification ? "Güncelle" : "Ekle"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCertification;
