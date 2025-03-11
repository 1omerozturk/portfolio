"use client";
import "./globals.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.css";
import "@radix-ui/themes/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function RootLayout({ children }) {

  const metadata = {
    title: "Ömer Öztürk",
    description: "Ömer Öztürk",
    keywords:
      'Ömer Öztürk, "Ömer", Yazılım" ,"Ömer Yazılım", "Software", portfolio, Software Devleoper, projects',
    author: "Ömer Öztürk",
    ogDescription: "Showcasing the projects and skills of Ömer Öztürk",
    ogImage: "omer ozturk.webp",
    ogUrl: "https://omerozturk.com.tr",
    
  };

  return (
    <html lang="tr">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="lkmYNOjBeWUoeKPA601lyVpARgj2vCbJPq55a8hvL0k" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:image" content={metadata.ogImage} />
        <meta property="og:url" content={metadata.ogUrl} />
        <title>{metadata.title}</title>
      </head>
      <body>
  <div id="top" /> {/* Buraya yeni anchor ekliyoruz */}
  <main className="content">
    <ToastContainer />
    <Navbar/>
    {children}
    <ScrollToTopButton />
  </main>
</body>
    </html>
  );
}
