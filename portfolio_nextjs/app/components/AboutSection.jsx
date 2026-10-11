import PublicImage from "./PublicImage";
import { getPublicProfile } from "../api/personalInfo";
import CVSelector from "./CVSelector";
import SocialBanner from "./SocialBanner";
import { getLocale } from "../i18n/server";
import { localizedPath } from "../i18n/config";

const AboutMe = async () => {
  const locale = await getLocale();
  const en = locale === "en";
  const profile = await getPublicProfile();
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__content">
        <p className="home-hero__eyebrow">{profile.jobTitle}</p>
        <h1 id="home-hero-title" className="home-hero__title">{en ? "Hello, I'm" : "Merhaba, ben"} {profile.fullName}.</h1>
        <p className="home-hero__description">
          {profile.about}
        </p>
        <div className="home-hero__actions">
          <CVSelector />
          <a href={localizedPath("/contact", locale)} className="button-secondary">{en ? "Get in touch" : "İletişime geç"}</a>
        </div>
        <div className="home-hero__social">
          <span>{en ? "Stay connected" : "Bağlantıda kalın"}</span>
          <SocialBanner />
        </div>
      </div>

      <div className="home-hero__visual">
        <div className="home-hero__portrait-frame">
          <PublicImage
            src={profile.profilePicture}
            alt={profile.fullName}
            width={560}
            height={640}
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 720px) 80vw, (max-width: 1200px) 38vw, 460px"
            className="home-hero__portrait"
          />
        </div>
        <p className="home-hero__caption">{en ? "I turn ideas into working products." : "Fikirleri çalışan ürünlere dönüştürüyorum."}</p>
      </div>
    </section>
  );
};

export default AboutMe;
