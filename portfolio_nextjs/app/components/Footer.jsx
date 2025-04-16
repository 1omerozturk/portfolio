"use client";
import React, { useEffect, useState } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCalendarDay } from "react-icons/fa";
import Links from "./Links";
import ContactBanner from "./Contact";
import SocialBanner from "./SocialBanner";

const Footer = () => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(Date.now());
  }, []);

  return (
    <footer className="space-x-3 p-6 bg-gray-500 md:grid">
      <div
        className="grid grid-flow-row border-b-2 border-b-black md:border-b-0 py-5"
      >
        <div className="bg-slate-300 rounded-full w-fit h-fit mx-auto p-2 mb-3">
          <FaCalendarDay className="text-indigo-500 text-3xl" />
        </div>
        <div className="flex w-[280px] sm:w-auto mx-auto">
          <Calendar
            value={value}
            locale="en-US"
            className="border shadow-md text-slate-500 mx-auto border-gray-300 rounded-lg"
            onChange={setValue}
            calendarType="iso8601"
            tileClassName={({ date }) =>
              date?.getDay() === 0 || date?.getDay() === 6 ? "bg-red-100" : ""
            }
          />
        </div>
      </div>
      <div className="grid grid-flow-col items-start justify-around pt-5 pb-5">
        <Links />
        <ContactBanner />
      </div>
      <div className="col-span-2 place-self-center">
        <div className="bg-slate-300 rounded-full w-fit h-fit mx-auto p-2 mb-3">
          <IoShareSocialSharp className="text-3xl text-fuchsia-500" />
        </div>
        <SocialBanner />
      </div>
    </footer>
  );
};

export default Footer;
