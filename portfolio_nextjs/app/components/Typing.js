'use client'
import React from 'react'
import { ReactTyped } from 'react-typed'
const Typing = () => {

  return (
    <div
      className="block font-serif lg:text-5xl md:text-4xl sm:text-3xl text-xl font-bold text-center bg-clip-text bg-gradient-to-l text-transparent from-black to-indigo-500 mt-5 drop-shadow-2xl"
    >
      <ReactTyped
        strings={[
          "<strong className='text-blue-500 md:underline '>Hi👋</strong>",
          "<strong className='text-blue-600 md:underline '>I'm Ömer Öztürk 🧑‍💻</strong>",
          "<strong className='text-indigo-600 md:underline '>I'm a Software Engineer 🌐</strong>",
          "<strong className='text-indigo-700 md:underline '>I'm a Full Stack Developer 💻</strong>",
          "<strong className='text-indigo-800 md:underline '>I'm a Mobile Developer 📱</strong>",
        ]}
        typeSpeed={50}
        backSpeed={50}
        loop
      ></ReactTyped>
    </div>
  )
}

export default Typing
