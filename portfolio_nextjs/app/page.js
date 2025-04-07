'use client'
import React, { Suspense, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Loading from './components/Loading'

const Typing = React.lazy(() => import('./components/Typing'))
const SkillsBanner = React.lazy(() => import('./components/SkillsBanner'))
const ContentsBanner = React.lazy(() => import('./components/ContentsBanner'))
const Footer = React.lazy(() => import('./components/Footer'))
const SocialBanner = React.lazy(() => import('./components/SocialBanner'))
const Projects = React.lazy(() => import('./projects/page'))
const EducationsBanner = React.lazy(() =>
  import('./components/EducationsBanner'),
)
const ExperiencesBanner = React.lazy(() =>
  import('./components/ExperiencesBanner'),
)
const Certificates = React.lazy(() => import('./certificates/page'))

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const originalTitle = document.title

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'Software is here 🧑‍💻'
      } else {
        document.title = originalTitle
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.title = originalTitle
    }
  }, [])

  const handleDownload = (language) => {
    const fileName = language === 'tr' ? 'omer_ozturk_tr.pdf' : 'omer_ozturk_en.pdf'
    const link = document.createElement('a')
    link.href = `/CV/${fileName}`
    link.download = fileName
    link.rel = 'noopener noreferrer' // For security and SEO
    link.click()
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-dvh bg-gradient-to-tl from-slate-600 to-slate-200">
      <div className="w-full flex flex-row items-center shadow-sm shadow-indigo-400 rounded-xl pb-5">
        <div className="w-full">
          <button
            title="Download CV"
            aria-label="Download CV"
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-950 hover:bg-slate-500 text-slate-100 hover:text-slate-950 transition-all hover:duration-500 hover:shadow-2xl shadow-black font-extrabold py-2 p-2 rounded my-3"
          >
            Download CV <i className="pi pi-download text-xl ml-2"></i>
          </button>

          {/* CV Selection Modal */}
          {isModalOpen && (

            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-6  max-w-md w-full mx-4">
              <button onClick={()=> setIsModalOpen(false)} className='float-right bg-slate-950 hover:drop-shadow-lg hover:shadow-white px-2 py-1 rounded-full text-red-500 hover:text-red-700'>
                <i className='pi pi-times '></i>
              </button>
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                  Select CV Language
                </h2>
                <p className="text-slate-600 mb-6">
                  Choose the language version of the CV you want to download:
                </p>
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => handleDownload('en')}
                    className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    aria-label="Download English CV"
                  >
                    English Version
                  </button>
                  <button
                    onClick={() => handleDownload('tr')}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    aria-label="Download Turkish CV"
                  >
                    Turkish Version
                  </button>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 flex mx-auto bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded-md hover:text-slate-700 font-medium"
                  aria-label="Close CV selection modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="text-center mt-5">
            <h1 className="font-serif text-3xl font-bold text-slate-800">
              Hi! I'm Ömer Öztürk
            </h1>
            <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
              Software Engineer, Full Stack and Mobile App Developer As a
              project manager, I get to develop projects and use technology and
              innovations. I love exploring!
            </p>
          </div>

          <Suspense fallback={<Loading color="blue" />}>
            <Typing />
          </Suspense>
          <hr className="border-none h-1 md:w-2/3 w-4/5 mx-auto mb-5 bg-black rounded-full" />
          <Suspense fallback={<Loading color="fuchsia" />}>
            <SocialBanner />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<Loading color="red" />}>
        <EducationsBanner />
      </Suspense>
      <Suspense fallback={<Loading color="lime" />}>
        <ExperiencesBanner size={2} />
      </Suspense>
      <Suspense fallback={<Loading color="orange" />}>
        <SkillsBanner size={4} />
      </Suspense>
      <Suspense fallback={<Loading color="purple" />}>
        <Projects size={4} />
      </Suspense>
      <Suspense fallback={<Loading color="teal" />}>
        <ContentsBanner size={4} />
      </Suspense>
      <Suspense fallback={<Loading color="yellow" />}>
        <Certificates size={3} />
      </Suspense>
      <Suspense fallback={<Loading color="indigo" />}>
        <Footer />
      </Suspense>
    </div>
  )
}