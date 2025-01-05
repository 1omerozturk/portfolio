'use client'
import React from 'react'
import Typing from './components/Typing'
import SkillsBanner from './components/SkillsBanner'
import AboutBanner from './components/AboutBanner'
import ContentsBanner from './components/ContentsBanner'
import Footer from './components/Footer'
import SocialBanner from './components/SocialBanner'
import Projects from './projects/page'

export default function Home() {
  return (
    <div className="min-h-dvh bg-gradient-to-tl from-slate-600 to-slate-200">
       <div className="w-full flex flex-row items-center shadow-sm shadow-indigo-400 rounded-xl pb-5">
          <div className="w-full">
            <button
              className=" bg-indigo-500 hover:bg-indigo-700  text-white  font-extrabold py-
            2 p-2  rounded my-3"
            >
              Download CV{' '}
              <i className="pi pi-download hover:text-white text-2xl text-black ml-2 "></i>
            </button>
            <Typing />
            <hr className='border-none h-1 bg-black mx-5 rounded-full'/>
            <SocialBanner />
          </div>
          <img
          className="ring-4 drop-shadow-2xl w-24 h-24 md:w-40 md:h-40 animate-bounce-2 bg-red-500 rounded-full mt-16"
          src="00.jpg"
        ></img>
        </div>
      <SkillsBanner size={5} />
      <Projects size={4} />
      <ContentsBanner size={4} />
      <AboutBanner />
      <Footer/>
    </div>
  )
}
