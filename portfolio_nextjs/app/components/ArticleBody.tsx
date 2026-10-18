import { prepareBlogMarkdown } from "../blogMarkdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import PublicImage from "./PublicImage";
import { isSafeHttpUrl, normalizeImageSource } from "../api/urlSafety";

const components: Components = {
  h1: ({ children }) => <h2>{children}</h2>,
  a: ({ href, children }) => {
    const internal = typeof href === "string" && (href.startsWith("#") || (href.startsWith("/") && !href.startsWith("//") && !href.includes("\\")));
    if (!internal && !isSafeHttpUrl(href)) return <span>{children}</span>;
    return <a href={href} {...(!internal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{children}</a>;
  },
  img: ({ src, alt }) => {
    const source = normalizeImageSource(src);
    return source ? <PublicImage src={source} alt={alt || ""} width={1200} height={800} sizes="(max-width: 895px) 100vw, 768px" className="article-inline-image" /> : null;
  },
  pre: ({ children }) => <div className="article-code"><pre tabIndex={0} aria-label="Kod örneği">{children}</pre></div>,
  table: ({ children }) => <div className="article-table" role="region" aria-label="Table / Tablo" tabIndex={0}><table>{children}</table></div>,
};

export default function ArticleBody({ content }: { content: string }) {
  return <div className="article-body"><Markdown remarkPlugins={[remarkGfm]} skipHtml components={components}>{prepareBlogMarkdown(content)}</Markdown></div>;
}
