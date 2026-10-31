import Image from "next/image";
import { ArrowRight, Check, Circle, Clock3 } from "lucide-react";
import { dictionary, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "./section-heading";

export function OriginStory({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  return (
    <section
      id="cau-chuyen"
      className="section story-section"
      aria-labelledby="story-title"
    >
      <div className="shell story-grid">
        <Reveal className="story-visual">
          <div className="story-mascot">
            <span aria-hidden="true" />
            <Image
              src="/assets/mascot.png"
              alt={t["a11y.illustration"]}
              width={1351}
              height={1164}
              sizes="320px"
            />
          </div>
          <p className="illustration-note">{t["story.illustration.note"]}</p>
          <div className="direction-card">
            <p>{t["story.direction"]}</p>
            <ol>
              {[t["story.learn"], t["story.observe"], t["story.practice"]].map(
                (label, index) => (
                  <li key={label}>
                    <span>0{index + 1}</span>
                    <strong>{label}</strong>
                    {index < 2 && <ArrowRight aria-hidden="true" size={14} />}
                  </li>
                ),
              )}
            </ol>
          </div>
        </Reveal>
        <Reveal className="section-copy story-copy">
          <div id="story-title">
            <SectionHeading
              chapter={t["story.chapter"]}
              title={t["story.title"]}
              number="04"
            />
          </div>
          <p className="story-intro">{t["story.one"]}</p>
          <p>{t["story.two"]}</p>
          <p className="story-emphasis">{t["story.three"]}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Journey({ locale }: { locale: Locale }) {
  const t = dictionary(locale);
  const milestones = [
    {
      title: t["journey.curriculum.title"],
      body: t["journey.curriculum.state"],
      Icon: Check,
    },
    {
      title: t["journey.video.title"],
      body: t["journey.video.state"],
      Icon: Clock3,
    },
    {
      title: t["journey.practice.title"],
      body: t["journey.practice.state"],
      Icon: Circle,
    },
  ];
  return (
    <section
      id="hanh-trinh"
      className="section journey-section"
      aria-labelledby="journey-title"
    >
      <div className="shell journey-grid">
        <Reveal className="section-copy">
          <div id="journey-title">
            <SectionHeading
              chapter={t["journey.chapter"]}
              title={t["journey.title"]}
              number="05"
            />
          </div>
          <p>{t["journey.body"]}</p>
          <div className="planned-framework">
            <p>{t["journey.planned"]}</p>
            <div>
              <span>
                <strong>8</strong>
                {t["journey.module.label"]}
              </span>
              <span className="framework-divider" aria-hidden="true" />
              <span>
                <strong>18</strong>
                {t["journey.lesson.label"]}
              </span>
            </div>
          </div>
          <p className="material-note">
            <Clock3 size={18} aria-hidden="true" />
            {t["journey.material.note"]}
          </p>
        </Reveal>
        <Reveal>
          <ol className="journey-timeline">
            {milestones.map(({ title, body, Icon }, index) => (
              <li key={title}>
                <span className={`timeline-icon timeline-${index}`}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <span className="timeline-number" aria-hidden="true">
                    0{index + 1}
                  </span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
