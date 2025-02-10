import React from 'react'
import { ReactTyped } from "react-typed";
const Typing = () => {
  return (
       <div className='block font-serif lg:text-5xl md:text-4xl sm:text-3xl text-lg font-bold md:text-center pl-10 bg-clip-text bg-gradient-to-l text-transparent from-black to-indigo-500 mt-5 drop-shadow-2xl'>
      <ReactTyped
        strings={[
          "<span class='text-blue-400'>Hi👋</span>",
          "<span class='text-blue-500'>I'm Ömer Öztürk 🧑‍💻</span>",
          "<span class='text-blue-600'>I am Software Engineer 🌐</span>",
          "<span class='text-blue-700'>I am Full Stack Developer 💻</span>",
          "<span class='text-blue-800'>I am Mobile Developer 📱</span>",
        ]}
        typeSpeed={80}
        backSpeed={40}
        loop
      >
      </ReactTyped>
    </div>
  )
}

export default Typing
