import { getLocale } from "../i18n/server";
import { translatedText } from "../i18n/config";
import { FaMedium } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";

import { normalizeContent } from "../api/profilePayload";
import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";
import ContentMark from "./ContentMark";

interface ContentSizeProps {
  size?: number;
}

export default async function ContentsBanner({ size }: ContentSizeProps) {
  const locale = await getLocale();
  const en = locale === "en";
  const CardHeading = size ? "h3" : "h2";
  const result = await fetchPublicList("/user/contents", ["contents", "items"]);
  const contents = result.status === "ok"
    ? result.items.map(normalizeContent).filter(content => content !== null)
    : [];
  const visibleContents = size ? contents.slice(0, size) : contents;

  return (
    <section className="surface-page px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader title={en ? "Contents" : "İçerikler"} level={size ? 2 : 1} icon={<FaMedium />} />

        {visibleContents.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleContents.map((content, index) => (
              <a className="surface-card content-card group overflow-hidden" title={translatedText(content, "name", locale)} key={content._id ?? `${content.name}-${index}`} href={content.link} target="_blank" rel="noopener noreferrer">
                
                <div className="p-5"><div className="mb-3"><ContentMark kind="contents" image={content.image} /></div>
                  <CardHeading className="line-clamp-2 break-words text-lg font-bold text-ink">{translatedText(content, "name", locale)}</CardHeading>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-brand">
                    {en ? "Read more" : "İçeriği oku"} <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="surface-card p-8 text-center text-quiet" role="status">
            {result.status === "unavailable" ? (en ? "Contents could not be loaded." : "İçerikler şu anda yüklenemiyor.") : (en ? "No contents yet." : "Henüz gösterilecek içerik bulunmuyor.")}
          </p>
        )}

        {size && contents.length > size && <div className="mt-8"><SeeMore path="contents" /></div>}
      </div>
    </section>
  );
}



