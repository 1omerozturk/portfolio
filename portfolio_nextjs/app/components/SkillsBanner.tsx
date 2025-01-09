"use client";
import React from "react";
import {
  FaHtml5,
  FaNodeJs,
  FaCss3Alt,
  FaReact,
  FaPython,
  FaFigma,
  FaCode,
} from "react-icons/fa";
import { SiDotnet, SiKotlin, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import SkillProgress from "./SkillProgress";
import Link from "next/link";

interface PageProps{
  size?:number;
}

const SkillsBanner:React.FC<PageProps>= ({ size }) => {

  const skills = [
    {
      name: "HTML",
      level: "Intermediate",
      percentage: 60,
      icon: <FaHtml5 />,
      color: "#E34F26",
    },
    {
      name: "Node.js",
      level: "Expert",
      percentage: 90,
      icon: <FaNodeJs />,
      color: "#339933",
    },
    {
      name: "CSS",
      level: "Intermediate",
      percentage: 60,
      icon: <FaCss3Alt />,
      color: "#1572B6",
    },
    {
      name: "Next.js",
      level: "Basic",
      percentage: 50,
      icon: <SiNextdotjs />,
      color: "#000000",
    },
    {
      name: "React",
      level: "Expert",
      percentage: 90,
      icon: <FaReact />,
      color: "#61DAFB",
    },
    {
      name: "Python",
      level: "Advanced",
      percentage: 80,
      icon: <FaPython />,
      color: "#3776AB",
    },
    {
      name: "Figma",
      level: "Advanced",
      percentage: 70,
      icon: <FaFigma />,
      color: "#F24E1E",
    },
    {
      name: ".NET",
      level: "Intermadiate",
      percentage: 30,
      icon: <SiDotnet />,
      color: "#512BD4",
    },
    {
      name: "Tailwind CSS",
      level: "Advanced",
      percentage: 80,
      icon: <SiTailwindcss />,
      color: "#38B2AC",
    },
    {
      name: "Kotlin",
      level: "Intermediate",
      percentage: 20,
      icon: <SiKotlin />,
      color: "#7F52FF",
    },
  ];

  return (
    <div id="skillsBanner" className="skills-banner">
      <div className="px-5 bg-slate-300 mx-auto p-4">
        <FaCode className="text-4xl mx-auto mb-3 text-slate-700" />
        <div className="space-y-2 gap-4">
          <SkillProgress skills={size ? skills.slice(0, 4) : skills} />
          {size && (
            <div className="flex justify-center mt-3">
              <Link
                href="/skills"
                style={{ textDecoration: "none" }}
                className="bg-gradient-to-r from-white to-slate-500 p-1 border-blue-500 border-2 rounded-lg hover:bg-black hover:text-white"
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
