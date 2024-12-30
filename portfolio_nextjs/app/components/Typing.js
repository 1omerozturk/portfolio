import React from 'react'
import { ReactTyped } from "react-typed";
const Typing = () => {
  return (
    <h1 className='font-mono text-4xl font-bold bg-clip-text bg-gradient-to-l text-transparent from-black  to-indigo-500 mt-5'>
     <ReactTyped
      strings={[
        "Hi👋",
        "I am Ömer Öztürk",
        "I am a Software Developer",
        "I am a Full Stack Developer",
      ]}
      typeSpeed={40}
      backSpeed={50}
      loop
    >
    </ReactTyped>
    </h1>
  )
}

export default Typing
