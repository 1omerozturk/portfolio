'use client'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Typing from './components/Typing'
import SkillsBanner from './components/SkillsBanner'
import ContentsBanner from './components/ContentsBanner'
import Footer from './components/Footer'
import SocialBanner from './components/SocialBanner'
import Projects from './projects/page'
import EducationsBanner from './components/EducationsBanner'
import ExperiencesBanner from './components/ExperiencesBanner'

export default function Home() {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = 'cv.pdf' // PDF dosyanızın yolu
    link.download = 'omer_ozturk.pdf'
    link.click()
  }

  return (
    <div className="min-h-dvh bg-gradient-to-tl from-slate-600 to-slate-200">
      <div className="w-full flex flex-row items-center shadow-sm shadow-indigo-400 rounded-xl pb-5">
        <div className="w-full">
          <button
            title="Download CV"
            name="Download CV"
            onClick={handleDownload}
            className=" bg-indigo-500 hover:bg-indigo-700 hover:text-lime-600  text-white  font-extrabold py-
            2 p-2  rounded my-3"
          >
            Download CV <i className="pi pi-download text-xl  ml-2 "></i>
          </button>
          <Typing />
          <hr className="border-none h-1 md:w-2/3 w-4/5 mx-auto mb-5 bg-black rounded-full" />
          <SocialBanner />
        </div>
      </div>
      <EducationsBanner />
      <ExperiencesBanner size={2} />
      <SkillsBanner size={4} />
      <Projects size={4} />
      <ContentsBanner size={4} />
      <Footer />
    </div>
  )
}
