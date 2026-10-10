"use client";
import React, { useState, useEffect } from "react";
import { CertificationService } from "../../service/certificationsService";
import Loading from "../../components/Loading";
import { useRouter } from "next/navigation";
import { FaEdit, FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { isSafeHttpUrl } from "../../../api/urlSafety";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();

  const onEdit = (id) => () => {
    navigate.push(`/admin/dashboard/certificates/edit/${id}`);
  };

  const onDelete = async (id) => {
    try {
      await CertificationService.deleteCertification(id);
      fetchCertificates();
    } catch (error) {
      console.log(error);
    }
  };

  const onAdd = () => {
    navigate.push("/admin/dashboard/certificates/add");
  };

  const fetchCertificates = async () => {
    try {
      const response = await CertificationService.getCertifications();
      setCertificates(Array.isArray(response) ? response : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-around items-center mb-6">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <button
          onClick={onAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <FaPlusCircle className="mr-2" />
          Ekle
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {certificates.map((certificate) => (
            <div key={certificate._id} className="surface-card rounded-lg p-5 shadow-md">
              {isSafeHttpUrl(certificate.certificateImage) ? (
                <img src={certificate.certificateImage} alt="" className="h-40 w-full rounded object-contain" loading="lazy" />
              ) : (
                <div className="flex h-40 items-center justify-center text-lg font-semibold">{certificate.name || certificate.issuingOrganization}</div>
              )}
              <p className="mt-3 font-semibold">{certificate.name || "Sertifika"}</p>
              <p className="text-sm text-gray-500">{certificate.issuingOrganization}</p>
              {isSafeHttpUrl(certificate.certificateLink) && <a href={certificate.certificateLink} target="_blank" rel="noopener noreferrer" className="button-secondary mt-3">Sertifikayı aç</a>}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={onEdit(certificate._id)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDelete(certificate._id)}
                  className="text-red-500 hover:text-red-700"
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
