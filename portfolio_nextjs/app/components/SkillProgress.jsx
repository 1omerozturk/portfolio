"use client";
import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const CircularProgressBar = ({ value }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

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
        <circle
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          stroke={getColor(value)}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="circular-progress"
        />
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dy=".3em"
          fontSize="20"
          fontWeight="bold"
        >
          {`${value} `}
        </text>
      </svg>
    </div>
  );
};

const SkillProgress = ({ skills }) => {
  const [progress, setProgress] = useState(
    skills.map((skill) => ({ name: skill.name, value: 0 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress.map((p, index) => {
          const targetPercentage = skills[index].percentage;
          if (p.value < targetPercentage) {
            return { ...p, value: Math.min(p.value + 1, targetPercentage) };
          }
          return p; // Eğer hedef değere ulaşılmışsa olduğu gibi bırak
        })
      );
    }, 50); // Hızını ayarlamak için burayı değiştirebilirsiniz
    return () => clearInterval(interval); // Cleanup
  }, [skills]);

  const DynamicIcon = ({ iconName }) => {
    if (!iconName) return null;

    const [lib, icon] = iconName.match(/[A-Z][a-z]+|[0-9]+/g);
    const iconLib = lib === "Fa" ? FaIcons : SiIcons;
    const IconComponent = iconLib[iconName];

    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gradient-to-t from-indigo-400 to-white p-4 rounded-lg shadow-md space-y-6"
            style={{ margin: 0, padding: "1rem" }}
          >
            <div className="md:text-2xl text-sm sm:text-xl flex items-center justify-between my-2 gap-x-3 font-semibold">
              {skill.name.split(" ")[0]}
              <div
                className="bg-gradient-to-b from-white to-slate-500 flex items-center justify-center text-3xl rounded-full h-10 w-10"
                style={{ color: skill.color }}
              >
                <DynamicIcon iconName={skill.icon} />
              </div>
            </div>
            <CircularProgressBar value={progress[index]?.value} />
          </div>
        ))}
      </div>
    </>
  );
};
const getColor = (percentage) => {
  if (percentage >= 85) return "#4caf50"; // Green
  if (percentage >= 70) return "#8bc34a"; // Light green
  if (percentage >= 55) return "#ff9800"; // Orange
  if (percentage >= 40) return "#ffeb3b"; // Yellow
  return "#f44336"; // Red
};

export default SkillProgress;
