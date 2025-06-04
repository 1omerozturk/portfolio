"use client";
import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { motion } from "framer-motion";
import AOS from "aos";

const CircularProgressBar = ({ value }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="flex items-center justify-center">
      <svg width="120" height="120">
        {/* Arkaplan Çemberi */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          stroke="#d3d3d3"
          fill="none"
        />
        {/* İlerleme Çemberi */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          stroke={getColor(value)}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (value / 100) * circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: circumference - (value / 100) * circumference,
            transition: { duration: 1, ease: "easeOut" },
          }}
        />
        {/* Yüzde Değeri */}
        <text
          x="60"
          y="60"
          textAnchor="middle"
          dy=".3em"
          fontSize="20"
          fontWeight="bold"
        >
          {`${value}`}
        </text>
      </svg>
    </div>
  );
};

const SkillProgress = ({ skills }) => {
  const [progress, setProgress] = useState(skills.map(() => ({ value: 0 })));

  // 🚀 İlk Yüklemede Animasyonu Başlatan useEffect
  useEffect(() => {
    if (skills) AOS.init({ duration: 1000 });

    skills.forEach((skill, index) => {
      setTimeout(() => {
        startAnimation(index, skill.percentage);
      }, index * 300); // Sıralı yükleme efekti için gecikme
    });
  }, [skills]);

  const startAnimation = (index, targetValue) => {
    let start = 0;
    const duration = 3000;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progressTime = timestamp - start;
      const progressValue = Math.min(
        (progressTime / duration) * targetValue,
        targetValue
      );

      setProgress((prevProgress) => {
        const newProgress = [...prevProgress];
        newProgress[index] = {
          ...newProgress[index],
          value: Math.round(progressValue),
        };
        return newProgress;
      });

      if (progressTime < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const handleMouseEnter = (index, targetValue) => {
    startAnimation(index, targetValue);
  };

  const handleMouseLeave = (index) => {
    setProgress((prevProgress) => {
      const newProgress = [...prevProgress];
      newProgress[index] = {
        ...newProgress[index],
        value: skills[index].percentage,
      };
      return newProgress;
    });
  };

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
          data-aos="fade-down"
          data-aos-delay={index * 200}
          key={index}
          className="bg-gradient-to-t from-indigo-400 to-white p-4 rounded-lg shadow-md space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          onMouseEnter={() => handleMouseEnter(index, skill.percentage)}
          onMouseLeave={() => handleMouseLeave(index)}
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
          <CircularProgressBar value={progress[index].value} />
        </motion.div>
      ))}
    </div>
  );
};

const getColor = (percentage) => {
  if (percentage >= 85) return "#4caf50";
  if (percentage >= 70) return "#8bc34a";
  if (percentage >= 55) return "#ff9800";
  if (percentage >= 40) return "#ffeb3b";
  return "#f44336"; // Kırmızı
};

export default SkillProgress;
