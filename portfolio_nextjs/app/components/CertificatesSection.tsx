import { getLocale } from "../i18n/server";
import { FaAward, FaExternalLinkAlt } from "react-icons/fa";
import { fetchPublicList } from "../api/publicData";
import { isSafeHttpUrl } from "../api/urlSafety";
import PageHeader from "./PageHeader";
import SeeMore from "./SeeMore";
import CertificatePdf from "./CertificatePdf";
import { normalizeCertificate } from "../api/profilePayload";

interface CertificatesSizeProps {
  size?: number;
}

function formatIssueDate(value: string | undefined, en: boolean) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString(en ? "en-GB" : "tr-TR", { timeZone: "Europe/Istanbul", year: "numeric", month: "short" });
}

export default async function CertificatesSection({ size }: CertificatesSizeProps) {
  const en = (await getLocale()) === "en";
  const CardHeading = size ? "h3" : "h2";
  const result = await fetchPublicList("/user/certifications", ["certificates", "certifications", "items"]);
  const records = result.status === "ok"
    ? result.items.map(normalizeCertificate).filter(certificate => certificate !== null)
    : [];
  const certificates = records.map(certificate => ({ ...certificate, name: en && certificate.nameEn.trim() ? certificate.nameEn : certificate.name, issuingOrganization: en && certificate.issuingOrganizationEn.trim() ? certificate.issuingOrganizationEn : certificate.issuingOrganization }));
  const displayedCertificates = certificates.slice(0, size ?? certificates.length);

  return (
    <section className="surface-page px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <PageHeader title={en ? "Certificates" : "Sertifikalar"} level={size ? 2 : 1} icon={<FaAward />} />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {displayedCertificates.map((certificate, index) => (
            <article key={certificate._id ?? `${certificate.name}-${index}`} className="surface-card flex min-h-52 flex-col items-center justify-center p-6 text-center">
              <FaAward aria-hidden="true" className="mb-4 text-4xl text-brand" />
              <CardHeading className="max-w-full break-words text-lg font-semibold text-ink">{certificate.name || certificate.issuingOrganization}</CardHeading>
              {certificate.issuingOrganization && certificate.name !== certificate.issuingOrganization && <p className="mt-1 text-sm text-quiet">{certificate.issuingOrganization}</p>}
              {formatIssueDate(certificate.issueDate, en) && <time className="mt-2 text-sm text-quiet" dateTime={certificate.issueDate}>{formatIssueDate(certificate.issueDate, en)}</time>}
              <CertificatePdf url={certificate.certificatePdf} name={certificate.name} en={en} />
              {isSafeHttpUrl(certificate.certificateLink) && (
                <a href={certificate.certificateLink} target="_blank" rel="noopener noreferrer" className="button-secondary mt-4">
                  {en ? "Verify certificate" : "Sertifikayı doğrula"} <FaExternalLinkAlt aria-hidden="true" />
                </a>
              )}
            </article>
          ))}
        </div>
        {!displayedCertificates.length && (
          <p className="surface-card p-8 text-center text-quiet" role="status">
            {result.status === "unavailable" ? (en ? "Certificates could not be loaded." : "Sertifikalar şu anda yüklenemiyor.") : (en ? "No certificates yet." : "Henüz sertifika eklenmemiş.")}
          </p>
        )}
        {size && certificates.length > size && <div className="mt-8"><SeeMore path="certificates" /></div>}
      </div>
    </section>
  );
}



