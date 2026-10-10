import Image from "next/image";
import { optimizedImageHosts } from "../api/imageHosts.mjs";
import { isSafeImageSource } from "../api/urlSafety";

type Props = {
  src: unknown;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "auto" | "high" | "low";
};

export default function PublicImage({ src, alt, width, height, sizes, className, loading = "lazy", fetchPriority }: Props) {
  if (!isSafeImageSource(src)) return null;
  const local = src.startsWith("/");
  const url = local ? null : new URL(src);
  const optimize = local || (url?.protocol === "https:" && !url.port && optimizedImageHosts.includes(url.hostname));
  return <Image src={src} alt={alt} width={width} height={height} sizes={sizes} unoptimized={!optimize} loading={loading} fetchPriority={fetchPriority} className={className} />;
}
