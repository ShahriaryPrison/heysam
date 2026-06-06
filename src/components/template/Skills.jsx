import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

const ORBIT_TAGS = ["React", "Node.js", "TypeScript", "Python", "Docker", "AWS", "Next.js", "Go", "Kubernetes", "GraphQL"];
const SKILL_TAGS = ["React", "Next.js", "Node.js", "TypeScript", "Python", "Go", "PostgreSQL", "Docker", "Kubernetes", "AWS", "Tailwind", "GraphQL"];

const CONTENT = {
  en: {
    eyebrow: "Our Stack",
    title: "Our Expertise",
    sub: "From planning to production — we've got you covered with a battle-tested toolkit.",
    cta1: "Explore Skills",
    cta2: "Need something else?",
  },
  fa: {
    eyebrow: "ابزار ما",
    title: "تخصص ما",
    sub: "از برنامه‌ریزی تا تولید، با مجموعه‌ابزاری آزموده‌شده کنار شما هستیم.",
    cta1: "مشاهده مهارت‌ها",
    cta2: "چیز دیگری نیاز دارید؟",
  },
};

function placeRing(items, radiusPct) {
  return items.map((t, i) => {
    const ang = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    const x = 50 + Math.cos(ang) * radiusPct;
    const y = 50 + Math.sin(ang) * radiusPct;
    return { t, x, y };
  });
}

const ringA = placeRing(ORBIT_TAGS.slice(0, 5), 50);
const ringB = placeRing(ORBIT_TAGS.slice(5), 32);

export default function Skills({ langState }) {
  const textRef = useReveal();
  const constRef = useReveal();
  const isFA = langState === "fa";
  const c = CONTENT[isFA ? "fa" : "en"];

  return (
    <section
      id="skills"
      className="ds-block"
      style={{ paddingTop: 0, fontFamily: isFA ? "'Estedad', sans-serif" : "'Inter', sans-serif" }}
    >
      <div className="ds-wrap">
        <div className="ds-skills-grid" style={isFA ? { direction: "rtl" } : {}}>
          {/* Constellation side */}
          <div ref={constRef} className="ds-constellation reveal" style={{ transitionDelay: "0.2s" }}>
            <div className="ds-orbit r3" />
            <div className="ds-orbit r1" />

            {/* Outer ring — spinning */}
            <div className="ds-orbit-spin" style={{ position: "absolute", inset: 0 }}>
              {ringA.map(({ t, x, y }) => (
                <div key={t} className="ds-chip" style={{ left: `${x}%`, top: `${y}%` }}>
                  <span className="d" />{t}
                </div>
              ))}
            </div>

            {/* Inner ring — reverse spinning */}
            <div className="ds-orbit-spin rev" style={{ position: "absolute", inset: 0 }}>
              {ringB.map(({ t, x, y }) => (
                <div key={t} className="ds-chip" style={{ left: `${x}%`, top: `${y}%` }}>
                  <span className="d" />{t}
                </div>
              ))}
            </div>

            {/* Core */}
            <div className="ds-chip-core">H</div>

            <style jsx>{`
              /* Counter-rotate chips so text stays upright */
              .ds-orbit-spin .ds-chip {
                animation: ds-spin 40s linear infinite reverse;
              }
              .ds-orbit-spin.rev .ds-chip {
                animation: ds-spin 56s linear infinite normal;
              }
            `}</style>
          </div>

          {/* Text side */}
          <div ref={textRef} className="reveal">
            <span className="ds-eyebrow">{c.eyebrow}</span>
            <h2 className="ds-h-section" style={{ marginTop: 16 }}>
              <span className="ds-grad-text">{c.title}</span>
            </h2>
            <p className="ds-lead" style={{ marginTop: 14 }}>{c.sub}</p>
            <div className="ds-expertise-actions">
              <Link href={`/${langState}#services`} className="ds-btn ds-btn-primary">{c.cta1}</Link>
              <Link href={`/${langState}#footer`} className="ds-btn ds-btn-ghost">{c.cta2}</Link>
            </div>
            <div className="ds-skill-tags">
              {SKILL_TAGS.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
