"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";
import { CertificationService } from "../../../../service/certificationsService";
import AddCertification from "../../add/page";
import Loading from "../../../../components/Loading";

const EditCertification = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await CertificationService.getCertification(id);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>{data ? <AddCertification certification={data} /> : <Loading />}</div>
  );
};

export default EditCertification;
