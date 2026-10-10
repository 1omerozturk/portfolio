import Markdown from "react-markdown";
import type { Components } from "react-markdown";
import { isSafeHttpUrl, isSafeImageSource } from "../api/urlSafety";

const components: Components = {
  h1: ({ children }) => <h2>{children}</h2>,
  a: ({ href, children }) => {
    const internal = typeof href === "string" && (href.startsWith("#") || (href.startsWith("/") && !href.startsWith("//") && !href.includes("\\")));
    if (!internal && !isSafeHttpUrl(href)) return <span>{children}</span>;
    return <a href={href} {...(!internal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
  },
  img: ({ src, alt }) => isSafeImageSource(src) ? <img src={src} alt={alt || ""} loading="lazy" decoding="async" /> : null,
  pre: ({ children }) => <div className="article-code"><pre tabIndex={0} aria-label="Kod örneği">{children}</pre></div>,
};

export default function ArticleBody({ content }: { content: string }) {
  return <div className="article-body"><Markdown skipHtml components={components}>{content}</Markdown></div>;
}
