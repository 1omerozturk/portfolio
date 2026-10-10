import { FaMedium } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";
import { isSafeImageSource } from "../api/urlSafety";
import { normalizeContent } from "../api/profilePayload";
import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";
import PublicImage from "./PublicImage";

type ContentItem = {
  _id?: string;
  name: string;
  link: string;
  image?: string;
};

interface ContentSizeProps {
  size?: number;
}

export default async function ContentsBanner({ size }: ContentSizeProps) {
  const CardHeading = size ? "h3" : "h2";
  const result = await fetchPublicList<ContentItem>("/user/contents", ["contents", "items"]);
  const contents = result.status === "ok"
    ? result.items.map(normalizeContent).filter(content => content !== null)
    : [];
  const visibleContents = size ? contents.slice(0, size) : contents;

  return (
    <section className="surface-page px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <PageHeader title="İçerikler" level={size ? 2 : 1} icon={<FaMedium />} />

        {visibleContents.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleContents.map((content, index) => (
              <a className="surface-card content-card group overflow-hidden" title={content.name} key={content._id ?? `${content.name}-${index}`} href={content.link} target="_blank" rel="noopener noreferrer">
                {isSafeImageSource(content.image) ? (
                  <PublicImage src={content.image} alt={content.name} width={480} height={320} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw" className="content-card__image" />
                ) : (
                  <div className="content-card__placeholder" aria-hidden="true"><FaMedium /></div>
                )}
                <div className="p-5">
                  <CardHeading className="line-clamp-2 break-words text-lg font-bold text-ink">{content.name}</CardHeading>
                  <span className="mt-4 inline-flex items-center gap-2 font-semibold text-brand">
                    İçeriği oku <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="surface-card p-8 text-center text-quiet" role="status">
            {result.status === "unavailable" ? "İçerikler şu anda yüklenemiyor." : "Henüz gösterilecek içerik bulunmuyor."}
          </p>
        )}

        {size && contents.length > size && <div className="mt-8"><SeeMore path="contents" /></div>}
      </div>
    </section>
  );
}
