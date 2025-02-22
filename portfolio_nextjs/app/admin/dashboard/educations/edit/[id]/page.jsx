"use client";

import { EducationService } from "../../../../service/educationService";
import { useParams } from "next/navigation";
import Loading from "../../../../components/Loading";
import React, { useEffect, useState } from "react";
import AddEducation from "../../add/page";

const EducationEdit = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const getData = async () => {
    const response = await EducationService.getEducation(id).then((res) => {
      return res.data;
    });
    setData(response);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h3 className="text-center">{data.name}</h3>
          <AddEducation education={data} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default EducationEdit;
