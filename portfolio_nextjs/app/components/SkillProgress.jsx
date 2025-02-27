"use client";
import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { motion } from "framer-motion";

const CircularProgressBar = ({ value }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const displayValue = value !== undefined ? value : 0;
  const offset = circumference - (displayValue / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg width="120" height="120" className="circular-progress-bar">
        <circle
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          stroke="#d3d3d3"
          fill="none"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          stroke={getColor(displayValue)}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          className="circular-progress"
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dy=".3em"
          fontSize="20"
          fontWeight="bold"
        >
          {`${displayValue}`}
        </text>
      </svg>
    </div>
  );
};

const SkillProgress = ({ skills }) => {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    setProgress(
      skills?.map((skill) => ({
        name: skill.name,
        value: 0,
      }))
    );
  }, [skills]);

  useEffect(() => {
    skills?.forEach((skill, index) => {
      setTimeout(() => {
        setProgress((prevProgress) => {
          const newProgress = [...prevProgress];
          newProgress[index] = {
            ...newProgress[index],
            value: Number(skill.percentage),
          };
          return newProgress;
        });
      }, index*2 * 500); // Her bir yetenek için animasyon gecikmesi
    });
  }, [skills]);

  const DynamicIcon = ({ iconName }) => {
    if (!iconName) return null;

    const iconLib = iconName.startsWith("Fa") ? FaIcons : SiIcons;
    const IconComponent = iconLib[iconName];

    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          className="bg-gradient-to-t from-indigo-400 to-white p-4 rounded-lg shadow-md space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="md:text-2xl text-sm sm:text-xl flex items-center justify-between my-2 gap-x-3 font-semibold">
            {skill.name.split(" ")[0]}
            <div
              className="bg-gradient-to-b from-white to-slate-500 flex items-center justify-center text-3xl rounded-full p-3"
              style={{ color: skill.color }}
            >
              <DynamicIcon iconName={skill.icon} />
            </div>
          </div>
          <CircularProgressBar
            value={progress[index] ? progress[index].value : 0}
          />
        </motion.div>
      ))}
    </div>
  );
};

const getColor = (percentage) => {
  if (percentage >= 85) return "#4caf50"; // Yeşil
  if (percentage >= 70) return "#8bc34a"; // Açık Yeşil
  if (percentage >= 55) return "#ff9800"; // Turuncu
  if (percentage >= 40) return "#ffeb3b"; // Sarı
  return "#f44336"; // Kırmızı
};

export default SkillProgress;
