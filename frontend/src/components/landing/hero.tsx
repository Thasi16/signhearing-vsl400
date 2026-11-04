import Image from "next/image";
import { ArrowDown, ArrowUpRight, Heart } from "lucide-react";
import { dictionary, localized, type Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { MascotMotion } from "./mascot-motion";

export function Hero({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <Reveal className="hero-copy">
          <p className="eyebrow-pill">
            <span aria-hidden="true" />
            {t["hero.eyebrow"]}
          </p>
          <p className="eyebrow hero-chapter">{t["hero.chapter"]}</p>
          <h1 id="hero-title">
            <span>{t["hero.title.first"]}</span>
            <span className="hero-title-accent">{t["hero.title.second"]}</span>
          </h1>
          <p className="hero-description">{t["hero.description"]}</p>
          <div className="hero-actions">
            <Button asChild>
              <a href="#cau-chuyen">
                {t["action.story"]}
                <ArrowDown aria-hidden="true" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={localized("/app", locale)}>
                {t["action.explore"]}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Button>
          </div>
          <p className="hero-note">
            <span aria-hidden="true" />
            {t["hero.note"]}
          </p>
        </Reveal>
        <Reveal className="hero-scene" delay={0.08}>
          <MascotMotion
            pauseLabel={t["a11y.motion.pause"]}
            resumeLabel={t["a11y.motion.resume"]}
          >
            <div className="art-orbit orbit-one" aria-hidden="true" />
            <div className="art-orbit orbit-two" aria-hidden="true" />
            <div className="hero-blob" aria-hidden="true" />
            <div className="art-heart" aria-hidden="true">
              <Heart strokeWidth={1.5} />
            </div>
            <span className="art-spark" aria-hidden="true">
              ✳
            </span>
            <div className="mascot-shadow" aria-hidden="true" />
            <Image
              className="hero-mascot"
              src="/assets/mascot.png"
              width={1351}
              height={1164}
              alt={t["a11y.mascot"]}
              priority
              sizes="(max-width: 700px) 80vw, 480px"
            />
            <div className="hello-note">
              <span aria-hidden="true">
                <Heart size={22} />
              </span>
              <p>
                {t["hero.floating.first"]}
                <strong>{t["hero.floating.second"]}</strong>
              </p>
            </div>
            <p className="art-caption">{t["hero.caption"]}</p>
          </MascotMotion>
        </Reveal>
      </div>
      <div className="hero-baseline shell">
        <span aria-hidden="true">01 / 06</span>
        <p>{t["site.tagline"]}</p>
        <a href="#vsl" aria-label={t["nav.vsl"]}>
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
