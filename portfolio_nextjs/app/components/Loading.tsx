"use client";

import React from "react";
interface LoadingProps {
  color?: string;
}
const Loading: React.FC<LoadingProps> = ({ color }) => {
  return (
    <div
      className={`animate-spin rounded-full md:h-32 md:w-32 w-16 h-16 border-t-2 border-b-2 ${
        color ? " border-" + color + "-500 " : "border-indigo-500"
      } mx-auto`}
    ></div>
  );
};
export default Loading;
