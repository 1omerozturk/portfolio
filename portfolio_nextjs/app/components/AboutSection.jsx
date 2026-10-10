import Image from "next/image";
import CVSelector from "./CVSelector";
import SocialBanner from "./SocialBanner";

const AboutMe = () => {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__content">
        <p className="home-hero__eyebrow">YAZILIM MÜHENDİSİ · FULL-STACK VE MOBİL</p>
        <h1 id="home-hero-title" className="home-hero__title">Merhaba, ben Ömer Öztürk.</h1>
        <p className="home-hero__description">
          Web ve mobil uygulamalar geliştiriyorum. Öğrendiklerimi paylaşmayı ve teknolojiyi daha çok kişinin keşfetmesine yardımcı olacak projeler üretmeyi seviyorum.
        </p>
        <div className="home-hero__actions">
          <CVSelector />
          <a href="/contact" className="button-secondary">İletişime geç</a>
        </div>
        <div className="home-hero__social">
          <span>Bağlantıda kalın</span>
          <SocialBanner />
        </div>
      </div>

      <div className="home-hero__visual">
        <div className="home-hero__portrait-frame">
          <Image
            src="/ozturkomer.webp"
            alt="Ömer Öztürk"
            width={560}
            height={640}
            quality={78}
            priority
            sizes="(max-width: 720px) 80vw, (max-width: 1200px) 38vw, 460px"
            className="home-hero__portrait"
          />
        </div>
        <p className="home-hero__caption">Fikirleri çalışan ürünlere dönüştürüyorum.</p>
      </div>
    </section>
  );
};

export default AboutMe;
