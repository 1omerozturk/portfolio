import type { Metadata } from "next";
import { isSafeImageSource } from "./api/urlSafety";

const siteUrl = "https://omerozturk.com.tr";

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/ozturkomer.webp",
): Metadata {
  const safeImage = isSafeImageSource(image)
    ? image
    : "/ozturkomer.webp";
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: `${siteUrl}${path}`,
      siteName: "Ömer Öztürk",
      title: `${title} | Ömer Öztürk`,
      description,
      images: [{ url: safeImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Ömer Öztürk`,
      description,
      images: [safeImage],
    },
  };
}
