"use client";
import "./globals.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
export default function RootLayout({ children }) {
  const metadata = {
    title: "Ömer Öztürk",
    description: "Ömer Öztürk Portfolio",
    keywords:
      'Ömer Öztürk, "Ömer", Yazılım" ,"Ömer Yazılım", "Software", portfolio, Software Devleoper, projects',
    author: "Ömer Öztürk",
    ogDescription: "Showcasing the projects and skills of Ömer Öztürk",
    ogImage: "00.jpg", // Update with the actual path to your image
    ogUrl: "https://omerozturk.com.tr", // Update with your actual website URL
    twitterCard: "summary_large_image",
    twitterSite: "@yourTwitterHandle", // Update with your actual Twitter handle
    twitterCreator: "@yourTwitterHandle", // Update with your actual Twitter handle
  };

  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.ogUrl} />
        <meta name="twitter:card" content={metadata.twitterCard} />
        <meta name="twitter:site" content={metadata.twitterSite} />
        <meta name="twitter:creator" content={metadata.twitterCreator} />
        <title>{metadata.title}</title>
      </head>
      <body>
        <main className="content">
            <ToastContainer />
            <Navbar />
            {children}
        </main>
      </body>
    </html>
  );
}
