"use client";

import { ContentService } from "../../../../service/contentService";
import { useParams } from "next/navigation";
import Loading from "../../../../components/Loading";
import React, { useEffect, useState } from "react";
import AddContent from "../../add/page";

const ContentEdit = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  const getData = async () => {
    const response = await ContentService.getContent(id).then((res) => {
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
          <AddContent content={data} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ContentEdit;
