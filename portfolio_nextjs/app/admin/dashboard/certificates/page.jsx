"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { CertificationService } from "../../service/certificationsService";
import Loading from "../../components/Loading";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/navigation";
import { FaEdit, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();

  const onEdit = (id) => () => {
    navigate.push(`certificates/edit/${id}`);
  };

  const onDelete = (id) => async () => {
    try {
      await CertificationService.deleteCertification(id).then(() => {
        fetchCertificates();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = () => {
    navigate.push("certificates/add");
  };

  const fetchCertificates = async () => {
    try {
      const response = await CertificationService.getCertifications().then(
        (res) => {
          return res;
        }
      );
      setCertificates(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-center">Certificates</h1>
        <button
          className="btn btn-outline-light justify-center"
          onClick={onAdd}
        >
          Add
          <FaPlusCircle className="inline-block ml-2" />
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certificates.map((certificate, index) => (
            <div key={index} className="bg-white p-4 shadow rounded-lg">
              <img
                height={200}
                width={200}
                src={certificate.certificateImage || "null"}
              />
              <h3 className="text-lg font-semibold">{certificate.name}</h3>
              <p className="text-gray-600">{certificate.issuingOrganization}</p>
              <p className="text-gray-600">
                {new Date(certificate.issueDate).toLocaleDateString()}
              </p>
              <a
                href={certificate.certificateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Görüntüle
              </a>
              <div className="flex items-center justify-between mt-2">
                <button
                  onClick={onEdit(certificate._id)}
                  className="btn btn-secondary mr-2"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={onDelete(certificate._id)}
                  className="btn btn-danger"
                >
                  <FaMinusCircle />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Certificates;
