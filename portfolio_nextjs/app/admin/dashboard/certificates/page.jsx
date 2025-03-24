"use client";
import React, { useState, useEffect } from "react";
import { CertificationService } from "../../service/certificationsService";
import Loading from "../../components/Loading";
import { useRouter } from "next/navigation";
import { FaEdit, FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useRouter();

  const onEdit = (id) => () => {
    navigate.push(`certificates/edit/${id}`);
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
    navigate.push("certificates/add");
  };

  const fetchCertificates = async () => {
    try {
      const response = await CertificationService.getCertifications();
      setCertificates(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
          {certificates.map((certificate, index) => (
            <div key={index} className="bg-white p-1 rounded-lg shadow-md">
               <iframe
              className="transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-black"
              src={certificate}
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
              title={`Certifica ${index + 1}`}
            ></iframe>
              <div className="flex justify-between mt-4">
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
