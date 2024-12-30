'use client'
import React from 'react'
import Typing from './components/Typing'
export default function Home() {
  const goAbout = () => {
    window.location.href = '/about'
  }

  return (
    <div className="min-h-dvh bg-gradient-to-tl from-slate-600 to-slate-200">
      <div className="flex flex-row justify-evenly pt-5">
        <div className="shadow-sm shadow-indigo-400 w-full rounded-xl">
          
          <div className="text-center">
            <button
              className=" bg-indigo-500 hover:bg-indigo-700  text-white  font-extrabold py-
            2 px-4 py-2 rounded my-5"
              onClick={goAbout}
            >
              Download CV <i class="pi pi-download"></i>
            </button>
            <Typing/>

          </div>
        </div>

        <img
          className="ring-4 drop-shadow-2xl max-w-[300px] max-h-[300px] animate-bounce-2 bg-red-500 rounded-full mt-16"
          src="00.jpg"
        ></img>
      </div>
    </div>
  )
}
