import Navbar from './components/Navbar';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
  title: 'Ömer Öztürk',
  description: 'Ömer Öztürk Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body>
        <Navbar />
        <main className='content'>{children}</main>

      </body>
    </html>
  )
}