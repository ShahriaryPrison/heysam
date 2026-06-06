import Link from "next/link";
import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const CONTENT = {
  en: { eyebrow: "Featured Work", title: "Projects", details: "Details", viewAll: "View all", viewAllCard: "View all projects", viewAllSub: "See the full portfolio" },
  fa: { eyebrow: "نمونه‌کارهای منتخب", title: "پروژه‌ها", details: "جزئیات", viewAll: "مشاهده همه", viewAllCard: "مشاهده همه پروژه‌ها", viewAllSub: "نمونه‌کار کامل" },
};

function ProjectCard({ project, index, langState, detailsLabel, isFA }) {
  const tags = project.tech_stack
    ? project.tech_stack.slice(0, 4)
    : project.tags || [];

  const mainImgSrc = project.mainImage || null;
  const iconSrc = project.icon?.src || project.icon || null;

  return (
    <Link href={`/${langState}/projects/${project.id || index}`} className="ds-proj-card ap-card" style={isFA ? { direction: "rtl" } : {}}>
      <div
        className="ap-card-shot"
        style={mainImgSrc ? {
          backgroundImage: `url(${mainImgSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        } : {}}
      >
        {!mainImgSrc && (
          <span className="ap-card-num">{String(index + 1).padStart(2, "0")}</span>
        )}
        {iconSrc && (
          <img
            src={iconSrc}
            alt={project.title || project.name}
            className="ap-card-icon"
            loading="lazy"
          />
        )}
      </div>
      <div className="ap-card-body">
        <div className="ap-card-top">
          <h3>{project.title || project.name}</h3>
          <span className="ap-card-badge">{detailsLabel}</span>
        </div>
        <p className="ap-card-desc">{project.description || project.desc}</p>
        {tags.length > 0 && (
          <div className="ap-card-tags">
            {tags.map((t) => <span key={t}>{t}</span>)}
          </div>
        )}
      </div>
    </Link>
  );
}

export default function Projects({ projects = [], langState, content }) {
  const railRef = useRef(null);
  const headRef = useReveal();
  const isFA = langState === "fa";
  const c = CONTENT[isFA ? "fa" : "en"];
  const step = 402;

  function scroll(dir) {
    if (!railRef.current) return;
    railRef.current.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <section
      className="ds-block"
      id="projects"
      style={{ paddingTop: 0, fontFamily: isFA ? "'Estedad', sans-serif" : "'Inter', sans-serif" }}
    >
      <div className="ds-wrap">
        <div className="ds-sec-head reveal" ref={headRef} style={isFA ? { direction: "rtl" } : {}}>
          <div className="left">
            <span className="ds-eyebrow">{c.eyebrow}</span>
            <h2 className="ds-h-section" style={{ marginTop: 16 }}>
              <span className="ds-grad-text">{c.title}</span>
            </h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link
              href={`/${langState}/projects`}
              className="ds-btn ds-btn-ghost"
              style={{ fontSize: 13, padding: "10px 18px" }}
            >
              {c.viewAll}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <div className="ds-rail-nav">
              {langState === "fa" ? (
                <>
                  <button className="ds-rail-btn" onClick={() => scroll(1)} aria-label="next">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                  <button className="ds-rail-btn" onClick={() => scroll(-1)} aria-label="previous">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                </>

              ) : (
                <>
                  <button className="ds-rail-btn" onClick={() => scroll(-1)} aria-label="previous">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <button className="ds-rail-btn" onClick={() => scroll(1)} aria-label="next">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="ds-proj-mobile-nav ds-wrap">
        <button className="ds-rail-btn" onClick={() => scroll(-1)} aria-label="previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <Link href={`/${langState}/projects`} className="ds-btn ds-btn-ghost" style={{ fontSize: 13, padding: "10px 24px" }}>
          {c.viewAll}
        </Link>
        <button className="ds-rail-btn" onClick={() => scroll(1)} aria-label="next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="ds-proj-rail-wrap">
        <div className="ds-proj-rail" ref={railRef}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id || i}
              project={project}
              index={i}
              langState={langState}
              detailsLabel={c.details}
              isFA={isFA}
            />
          ))}
          {/* View All card */}
          <Link href={`/${langState}/projects`} className="ds-proj-viewall-card">
            <div className="ds-proj-viewall-inner">
              <div className="ds-proj-viewall-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </div>
              <p className="ds-proj-viewall-title">{c.viewAllCard}</p>
              <p className="ds-proj-viewall-sub">{c.viewAllSub}</p>
              <span className="ds-proj-viewall-btn">
                {c.viewAll}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
