import React from 'react'
import { ReactTyped } from "react-typed";
const Typing = () => {
  return (
    <h1 className='font-mono lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold bg-clip-text bg-gradient-to-l text-transparent from-black  to-indigo-500 mt-5'>
     <ReactTyped
      strings={[
        "Hi👋",
        "I am Ömer Öztürk 🧑‍💻",
        "I'm a Software Engineer 💻",
        "I am a Full Stack Developer 💻",
        "I am a Mobile Developer 📱",
      ]}
      typeSpeed={80}
      backSpeed={40}
      loop
    >
    </ReactTyped>
    </h1>
  )
}

export default Typing
