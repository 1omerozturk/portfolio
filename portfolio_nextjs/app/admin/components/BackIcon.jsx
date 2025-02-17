import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const BackIcon = () => {
  const navigate = useRouter();

  const onBack = () => {
    navigate.back();
  };
  return (
    <div onClick={onBack} className="btn btn-outline-light float-left">
      <FaArrowAltCircleLeft className="text-xl" />
    </div>
  );
};

export default BackIcon;
