'use client'
import './globals.css'
import 'primeicons/primeicons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Navbar  from './components/Navbar'

export default function RootLayout({ children }) {
  const metadata = {
    title: 'Ömer Öztürk',
    description: 'Ömer Öztürk Portfolio',
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body>
        <main className="content">
          <Navbar />

          {children}
        </main>
      </body>
    </html>
  )
}
