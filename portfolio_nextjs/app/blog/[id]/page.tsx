import Link from "next/link";
import { BLOG_CATEGORY_STYLES as categoryStyles } from "../../blogConstants";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MdArrowBack, MdAccessTime, MdVisibility, MdCalendarToday, MdPerson } from "react-icons/md";
import CopyLinkButton from "../../components/CopyLinkButton";
import ArticleBody from "../../components/ArticleBody";
import PublicImage from "../../components/PublicImage";
import JsonLd from "../../components/JsonLd";
import RelatedBlogs from "../../components/RelatedBlogs";
import { fetchPublicBlogRecord } from "../../api/publicData";
import { isSafeHttpUrl } from "../../api/urlSafety";

type RouteProps = { params: Promise<{ id: string }> };
import { siteConfig } from "../../siteConfig";
const siteUrl = siteConfig.url;


function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : date.toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul" });
}

export default async function BlogDetailPage({ params }: RouteProps) {
  const { id } = await params;
  const result = await fetchPublicBlogRecord(id);
  if (result.status === "not-found") notFound();
  if (result.status === "ok" && result.data.isPublished === false) notFound();

  if (result.status === "unavailable" || typeof result.data.title !== "string") {
    return (
      <main className="surface-page flex min-h-[60vh] items-center justify-center p-6">
        <section className="surface-card max-w-lg p-8 text-center" role="status">
          <h1 className="mb-4 text-lg font-semibold text-ink">Yazı şu anda yüklenemiyor.</h1>
          <p className="text-quiet">Lütfen biraz sonra yeniden deneyin.</p>
          <Link href="/blog" className="button-primary mt-6">Tüm yazılara dön</Link>
        </section>
      </main>
    );
  }

  const blog = result.data;
  const articleUrl = `${siteUrl}/blog/${encodeURIComponent(id)}`;
  const category = typeof blog.category === "string" ? blog.category : "diğer";
  const tags = Array.isArray(blog.tags) ? blog.tags.filter((tag): tag is string => typeof tag === "string" && Boolean(tag.trim())) : [];
  const content = typeof blog.content === "string" ? blog.content : "";
  const image = isSafeHttpUrl(blog.featuredImage) ? blog.featuredImage : undefined;
  const datePublished = blog.createdAt && !Number.isNaN(new Date(blog.createdAt).getTime())
    ? new Date(blog.createdAt).toISOString()
    : undefined;
  const dateModified = blog.updatedAt && !Number.isNaN(new Date(blog.updatedAt).getTime())
    ? new Date(blog.updatedAt).toISOString()
    : datePublished;
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || content.slice(0, 180),
    image: image ? [image] : undefined,
    datePublished,
    dateModified,
    author: { "@type": "Person", name: blog.author || "Ömer Öztürk", url: siteUrl },
    publisher: { "@type": "Person", name: "Ömer Öztürk", url: siteUrl },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    articleBody: content || undefined,
    keywords: tags.length ? tags.join(", ") : undefined,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: blog.title, item: articleUrl },
    ],
  };

  return (
    <main className="surface-page min-h-screen">
      <JsonLd value={schema} />
      <JsonLd value={breadcrumb} />
      <header className="blog-hero py-8">
        <div className="mx-auto max-w-4xl px-4">
          <Link href="/blog" className="mb-4 inline-flex items-center gap-2 font-semibold text-brand hover:underline">
            <MdArrowBack aria-hidden="true" size={20} /> Blog yazılarına dön
          </Link>
          <h1 className="break-words text-3xl font-bold text-ink sm:text-4xl">{blog.title}</h1>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {image && (
          <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
            <PublicImage src={image} alt={blog.title} width={1200} height={675} sizes="(max-width: 895px) 100vw, 864px" loading="eager" fetchPriority="high" className="blog-detail__image" />
          </div>
        )}

        <section className="surface-card mb-8 rounded-lg p-6" aria-label="Yazı bilgileri">
          <div className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 md:grid-cols-5 [&>div]:min-w-0 [&>div]:break-words [&_svg]:shrink-0">
            <div className="flex items-center gap-2"><MdPerson aria-hidden="true" className="text-brand" size={20} /><div><p className="text-sm text-quiet">Yazar</p><p className="font-semibold text-ink">{blog.author || "Ömer Öztürk"}</p></div></div>
            <div className="flex items-center gap-2"><MdCalendarToday aria-hidden="true" className="text-brand" size={20} /><div><p className="text-sm text-quiet">Tarih</p><time className="font-semibold text-ink" dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time></div></div>
            <div className="flex items-center gap-2"><MdAccessTime aria-hidden="true" className="text-brand" size={20} /><div><p className="text-sm text-quiet">Okuma</p><p className="font-semibold text-ink">{blog.readingTime || 1} dk</p></div></div>
            <div className="flex items-center gap-2"><MdVisibility aria-hidden="true" className="text-brand" size={20} /><div><p className="text-sm text-quiet">Görüntülenme</p><p className="font-semibold text-ink">{Number.isFinite(Number(blog.views)) ? Number(blog.views) : 0}</p></div></div>
            <div><span className={`content-tag ${categoryStyles[category] || categoryStyles.diğer}`}>{category}</span></div>
          </div>
        </section>

        <article className="prose prose-lg mb-8 max-w-none" aria-label={blog.title}>
          <div className="surface-card rounded-lg p-6 leading-relaxed sm:p-8">
            <ArticleBody content={content} />
          </div>
        </article>

        {tags.length > 0 && (
          <section className="mb-8 border-y border-line py-6" aria-label="Yazı etiketleri">
            <p className="mb-3 text-sm font-semibold text-quiet">Etiketler:</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => <Link key={tag} href={`/blog?search=${encodeURIComponent(tag)}`} className="content-tag hover:border-brand hover:text-brand">#{tag}</Link>)}
            </div>
          </section>
        )}

        <section className="surface-card mb-12 rounded-lg p-6" aria-label="Yazıyı paylaş">
          <p className="mb-4 text-sm font-semibold text-ink">Paylaş:</p>
          <div className="flex flex-wrap gap-3">
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="button-secondary">Twitter</a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noopener noreferrer" className="button-secondary">Facebook</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`} target="_blank" rel="noopener noreferrer" className="button-secondary">LinkedIn</a>
            <CopyLinkButton url={articleUrl} />
          </div>
        </section>

        <Suspense fallback={<div className="mt-12 min-h-48" aria-hidden="true" />}>
          <RelatedBlogs category={category} currentId={id} />
        </Suspense>

        <div className="mt-12 border-t border-line pt-8 text-center">
          <Link href="/blog" className="button-primary"><MdArrowBack aria-hidden="true" /> Tüm yazılara dön</Link>
        </div>
      </div>
    </main>
  );
}

