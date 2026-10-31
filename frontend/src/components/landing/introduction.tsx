import { ArrowUpRight, BookOpen, Eye, Route } from "lucide-react";
import { dictionary, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";

export function VslIntroduction({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  return (
    <section
      id="vsl"
      className="section vsl-section"
      aria-labelledby="vsl-title"
    >
      <div className="shell vsl-grid">
        <Reveal className="section-copy">
          <p className="eyebrow">
            <span className="chapter-index" aria-hidden="true">
              02
            </span>
            {t["vsl.chapter"]}
          </p>
          <h2 id="vsl-title">{t["vsl.title"]}</h2>
          <p>{t["vsl.body"]}</p>
          <aside className="language-note">{t["vsl.note"]}</aside>
        </Reveal>
        <Reveal>
          <figure className="jordan-quote">
            <span className="quote-mark" aria-hidden="true">
              “
            </span>
            <blockquote lang="en">{t["quote.jordan.text"]}</blockquote>
            {locale === "vi" && (
              <p className="quote-translation">
                {t["quote.translation.label"]}: {t["quote.jordan.translation"]}
              </p>
            )}
            <figcaption>
              <div>
                <strong>{t["quote.jordan.author"]}</strong>
                <p>{t["quote.jordan.role"]}</p>
              </div>
              <a href="https://www.congress.gov/109/crec/2006/03/28/CREC-2006-03-28.pdf#page=13">
                {t["quote.jordan.source"]}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

export function Challenges({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  const cards = [
    {
      title: t["beginning.one.title"],
      body: t["beginning.one.body"],
      Icon: BookOpen,
    },
    {
      title: t["beginning.two.title"],
      body: t["beginning.two.body"],
      Icon: Eye,
    },
    {
      title: t["beginning.three.title"],
      body: t["beginning.three.body"],
      Icon: Route,
    },
  ];
  return (
    <section className="section challenges" aria-labelledby="beginning-title">
      <div className="shell">
        <Reveal className="section-heading">
          <div id="beginning-title">
            <SectionHeading
              chapter={t["beginning.chapter"]}
              title={t["beginning.title"]}
              number="03"
            />
          </div>
          <span className="section-dash" aria-hidden="true" />
        </Reveal>
        <div className="challenge-grid">
          {cards.map(({ title, body, Icon }, index) => (
            <Reveal key={title} delay={index * 0.05}>
              <Card className={`challenge-card challenge-${index}`}>
                <div className="card-top">
                  <span className="card-icon">
                    <Icon size={25} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="card-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <span className="card-rule" aria-hidden="true" />
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
