"use client";
import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
const SkillProgress = React.lazy(() => import("./SkillProgress"));
import Link from "next/link";
import { SkillService } from "../service/skillService";
import { defaultSkillsData } from "../models/skills";
import Loading from "./Loading";

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
        <FaCode className="text-4xl mx-auto mb-3 text-slate-700" />
        <div className="space-y-2 gap-4">
          <React.Suspense fallback={<Loading color={"lime"} />}>
            {isLoading ? (
              <Loading color={"lime"} />
            ) : (
              <SkillProgress skills={displayedSkills} />
            )}
          </React.Suspense>
          {size && (
            <div className="flex justify-center mt-3">
              <Link
                href="/skills"
                style={{ textDecoration: "none" }}
                className="bg-slate-200 w-fit mx-auto text-indigo-600 font-bold py-2 px-6 rounded-full shadow-md hover:bg-slate-500  hover:text-black transition-all duration-300 transform hover:translate-y-1"
              >
                View More Skills
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillsBanner;
