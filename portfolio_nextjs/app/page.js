'use client'
import React from 'react'
import Typing from './components/Typing'
import ProjectsBanner from './components/ProjectsBanner'
import SkillsBanner from './components/SkillsBanner'
import AboutBanner from './components/AboutBanner'

export default function Home() {
  return (
    <div className="min-h-dvh bg-gradient-to-tl from-slate-600 to-slate-200">
      <div className="flex flex-row justify-between   pt-5">
        <div className="w-full shadow-sm shadow-indigo-400 rounded-xl">
          <div className=" text-center">
            <button
              className=" bg-indigo-500 hover:bg-indigo-700  text-white  font-extrabold py-
            2 p-2  rounded my-3"
            >
              Download CV{' '}
              <i className="pi pi-download hover:text-white text-2xl text-black ml-2 ">
                
              </i>
            </button>
            <Typing />
          </div>
        </div>

        <img
          className="ring-4 drop-shadow-2xl w-40 h-40 md:w-auto md:h-auto  max-w-[300px] max-h-[300px] animate-bounce-2 bg-red-500 rounded-full mt-16"
          src="00.jpg"
        ></img>
      </div>
      <ProjectsBanner />
      <SkillsBanner />
      <AboutBanner />
    </div>
  )
}
