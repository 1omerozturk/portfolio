"use client";
import React, { useState } from "react";
import { CertificationService } from "../../../service/certificationsService";
import Message from "../../../../components/Message";
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
      ? certification
      : {
          name: "",
          issuingOrganization: "",
          issueDate: "",
          certificateLink: "",
          certificateImage: "",
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
    if (certification) {
      await CertificationService.updateCertification(
        certification._id,
        data
      ).then((res) => {
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
      });
    } else {
      await CertificationService.createCertification(data).then((res) => {
        if (Number(res) === 201) {
          navigate.back();
        } else {
          navigate.refresh();
        }
      });
    }
  };

  return (
    <div>
      <BackIcon />
      <div className="md:w-1/2 w-2/3 mx-auto p-4 bg-gradient-to-br from-gray-900 to-gray-600 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issuingOrganization" className="form-label">
              Organization
            </label>
            <input
              type="text"
              name="issuingOrganization"
              className="form-control"
              value={data.issuingOrganization}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="issueDate" className="form-label">
              Issue Date
            </label>
            <input
              type="date"
              name="issueDate"
              className="form-control"
              value={data.issueDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="certificateLink" className="form-label">
              URL
            </label>
            <input
              type="url"
              name="certificateLink"
              className="form-control"
              value={data.certificateLink}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="certificateImage" className="form-label">
            Image
            </label>
            <input
              type="text"
              name="certificateImage"
              className="form-control"
              value={data.certificateImage}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="btn btn-outline-light">
              {certification ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCertification;
