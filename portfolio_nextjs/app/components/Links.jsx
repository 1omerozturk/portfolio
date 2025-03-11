import Link from 'next/link'
import React from 'react'
import { FaLink } from 'react-icons/fa'

const Links = () => {
  return (
    <div className='grid grid-flow-row w-full space-y-4'>
        <div className='w-fit h-fit p-2 rounded-full bg-slate-300'>
        <FaLink className='mx-auto text-3xl text-lime-500'/>
        </div>
        <Link className="link" href="/about" passHref>
        About
        </Link>
        <Link className="link" href="/skills">
        Skills
        </Link>
        <Link className="link" href="/projects">
        Projects
        </Link>
        <Link className="link" href="/experiences">
        Experiences
        </Link>
        <Link className="link" href="/certificas">
        Certificas
        </Link>
        <Link className="link" href="/contact">
        Contact
        </Link>
    </div>

  )
}

export default Links