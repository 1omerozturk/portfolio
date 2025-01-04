"use client"
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Takvim stillendirmesi için gerekli
import { FaCalendar, FaCalendarDay } from "react-icons/fa";
import { MdOutlineContactPhone } from "react-icons/md";

const Footer = () => {
  const [value, onChange] = useState(new Date());

  return (
    <footer className="grid md:grid-cols-2 grid-rows-2 h-fit  items-center space-x-3 justify-center p-6 bg-gray-500">
      <div className="text-center">
        <div className="bg-indigo-500 rounded-full w-fit h-fit p-2 flex items-center justify-center mx-auto mb-3">
          <FaCalendarDay className="text-black text-3xl" />
        </div>
        <Calendar
          value={value}
          locale="en-US"
          className="border shadow-md w-full text-slate-500 border-gray-300 rounded-lg mx-auto"
          onChange={onChange}
          calendarType="iso8601"
          tileClassName={({ date, view }) =>
            date.getDay() === 0 || date.getDay() === 6 ? "bg-red-100" : ""
          }
        />
      </div>
        <div className="grid grid-rows-2 text-center space-y-4">
          <div className="text-center mt-1">

        <div className="bg-indigo-500 rounded-full w-fit h-fit p-2 flex items-center justify-center mx-auto ">
          <MdOutlineContactPhone className="text-black text-3xl" />
          </div>
        </div>
            <ul>
              <li className="mb-1">
                <a href="#link1" className="text-blue-600 hover:text-blue-800">
                  Link 1
                </a>
              </li>
              <li className="mb-1">
                <a href="#link2" className="text-blue-600 hover:text-blue-800">
                  Link 2
                </a>
              </li>
              <li className="mb-1">
                <a href="#link3" className="text-blue-600 hover:text-blue-800">
                  Link 3
                </a>
              </li>
            </ul>
     
            <h4 className="text-lg font-semibold mb-2">İletişim Bilgileri</h4>
            <address className="not-italic">
              <p>
                Email:{" "}
                <a
                  href="mailto:info@example.com"
                  className="text-blue-600 hover:text-blue-800"
                >
                  info@example.com
                </a>
              </p>
              <p>
                Telefon:{" "}
                <a
                  href="tel:+123456789"
                  className="text-blue-600 hover:text-blue-800"
                >
                  +123456789
                </a>
              </p>
            </address>
          </div>
    </footer>
  );
};

export default Footer;
