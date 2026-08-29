"use client";
import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
const SkillProgress = React.lazy(() => import("./SkillProgress"));
import Link from "next/link";
import { SkillService } from "../service/skillService";
import { defaultSkillsData } from "../models/skills";
import Loading from "./Loading";
import SeeMore from "./SeeMore";

interface PageProps {
  size?: number;
}

const SkillsBanner: React.FC<PageProps> = ({ size }) => {
  const [skills, setSkills] = useState(defaultSkillsData);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSkills = async () => {
    try {
      const res = await SkillService.getSkills();
      setSkills(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error?.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills()
  }, []);

  const displayedSkills = size ? skills.slice(0, size) : skills;

  return (
    <div id="skillsBanner" className="skills-banner drop-shadow-lg">
      <div className="px-5 mx-auto p-4">
          <div className="flex items-center justify-center text-4xl text-gray-800 mb-3">
        <div className="grid grid-flow-col space-x-14">
          <h1 className=" font-rubik text-indigo-500"> Skills </h1>
          <FaCode className="text-indigo-400" />
        </div>
      </div>
        <div className="space-y-2 gap-4">
          <React.Suspense fallback={<Loading color={"lime"} />}>
            {isLoading ? (
              <Loading color={"lime"} />
            ) : (
              <SkillProgress skills={displayedSkills} />
            )}
          </React.Suspense>
          {size && (
            <SeeMore path="skills"/>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsBanner;
