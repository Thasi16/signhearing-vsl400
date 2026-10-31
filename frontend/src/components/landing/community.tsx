import Image from "next/image";
import { ArrowUpRight, Heart } from "lucide-react";
import { dictionary, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/shared/reveal";

export function Community({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  return (
    <section
      id="dong-hanh"
      className="section community-section"
      aria-labelledby="together-title"
    >
      <div className="shell">
        <Reveal>
          <figure className="keller-quote">
            <span aria-hidden="true" className="quote-flower">
              ✳
            </span>
            <blockquote lang="en">“{t["quote.keller.text"]}”</blockquote>
            {locale === "vi" && (
              <p className="quote-translation">
                {t["quote.translation.label"]}: {t["quote.keller.translation"]}
              </p>
            )}
            <figcaption>
              <strong>{t["quote.keller.author"]}</strong>
              <a href="https://www.helenkeller.org/get-involved/">
                {t["quote.keller.source"]}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal>
          <div className="invitation-banner">
            <div className="invitation-mascot">
              <Image
                src="/assets/mascot.png"
                width={1351}
                height={1164}
                alt=""
                sizes="280px"
              />
            </div>
            <div className="invitation-copy">
              <p className="eyebrow">
                <span className="chapter-index" aria-hidden="true">
                  06
                </span>
                {t["together.chapter"]}
              </p>
              <h2 id="together-title">{t["together.title"]}</h2>
              <p>{t["together.body"]}</p>
              <details id="lien-he" className="contact-details">
                <summary>
                  {t["action.contact"]}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </summary>
                <div className="contact-message">
                  <h3>{t["contact.missing.title"]}</h3>
                  <p>{t["contact.missing.body"]}</p>
                </div>
              </details>
            </div>
            <Heart
              className="banner-heart"
              strokeWidth={1}
              aria-hidden="true"
            />
          </div>
        </Reveal>
        <p className="quote-context">{t["quote.context"]}</p>
      </div>
    </section>
  );
}
