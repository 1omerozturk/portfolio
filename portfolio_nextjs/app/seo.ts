import type { Metadata } from "next";
import { normalizeImageSource } from "./api/urlSafety";

import { siteConfig } from "./siteConfig";

export function createPageMetadata(
  title: string,
  description: string,
  path: string,
  image: string = siteConfig.defaultImage,
): Metadata {
  const safeImage = normalizeImageSource(image) || siteConfig.defaultImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [{ url: safeImage, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [safeImage],
    },
  };
}
