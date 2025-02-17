"use client";

import React, { useState, useEffect } from "react";
import SocialAdd from "../../add/page";
import { useParams } from "next/navigation";
import { SocialService } from "../../../../service/socialService";
import Loading from "../../../../components/Loading";

const Edit = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);


  useEffect(()=>{
    fetchSocialLink()
  },[])

  const fetchSocialLink = async () => {
    try {
      const response = await SocialService.getSocial(id).then((res) => {
        return res.data;
      });
      setData(response);
    } catch (error) {
      console.error("Error fetching social link", error);
    }
  };

  return (
    <div>
      {data ? (
        <div>
          <h3 className="text-center">{data.name} Update</h3>
          <SocialAdd social={data} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Edit;
