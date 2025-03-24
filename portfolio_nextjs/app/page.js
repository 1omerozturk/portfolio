'use client'
import React, { Suspense,useEffect } from 'react'
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
  useEffect(() => {
    const originalTitle = document.title

    // Sekmeden çıkıldığında "Lütfen geri dön" mesajını göster
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = 'Software is here 🧑‍💻'
      } else {
        document.title = originalTitle
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup işlemi
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.title = originalTitle
    }
  }, [])

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
            aria-label="Download CV"
            onClick={handleDownload}
            className=" bg-slate-950 hover:bg-slate-500   text-slate-100 hover:text-slate-950 transition-all hover:duration-500 hover:shadow-2xl shadow-black font-extrabold py-2 p-2 rounded my-3"
          >
            Download CV <i className="pi pi-download text-xl ml-2 "></i>
          </button>
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
