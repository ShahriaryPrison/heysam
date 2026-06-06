import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
import SeoHead from "@/components/SeoHead";
import { SEO, SITE_URL } from "@/lib/seo";
import fs from "fs";
import path from "path";
import { readCustomProjects } from "@/lib/projectStore";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import Link from "next/link";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { Safari } from "@/components/magicui/safari";
import simplifiedSkills from "@/data/skillData";
import { useEffect, useRef, useState } from "react";

const STATUS_DOT = {
  Production:   "#22c55e",
  Local:        "#60a5fa",
  Test:         "#facc15",
  Staging:      "#a855f7",
  Development:  "#6366f1",
  Deprecated:   "#ef4444",
  Maintenance:  "#f59e0b",
  Experimental: "#ec4899",
};

const STATUS_MAP = { طراحی: "Design", design: "Design", انتشار: "Production", production: "Production", local: "Local", test: "Test", staging: "Staging", development: "Development", deprecated: "Deprecated", maintenance: "Maintenance", experimental: "Experimental" };

function normalizeStatus(val) {
  if (Array.isArray(val)) {
    const mapped = val.map(v => { const s = v?.toString().trim(); return STATUS_MAP[s?.toLowerCase()] ?? s; }).filter(Boolean);
    return mapped.join(", ") || "Production";
  }
  const s = val?.toString().trim();
  if (!s) return "Production";
  return STATUS_MAP[s.toLowerCase()] ?? s;
}

function normalizeType(val) {
  if (Array.isArray(val)) val = val[0];
  const t = val?.toString().trim();
  if (!t) return "Public";
  if (t === "عمومی"  || t.toLowerCase() === "public")  return "Public";
  if (t === "خصوصی" || t.toLowerCase() === "private") return "Private";
  return t;
}

function normalizeTech(val) {
  if (Array.isArray(val)) val = val[0];
  const t = val?.toString().trim();
  if (!t) return "";
  const map = { "وب اپ": "Web App", "وب سایت": "Web Site", "webapp": "Web App", "website": "Web Site" };
  return map[t] ?? t;
}

function resolveSrc(v) {
  if (!v) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object") {
    if (typeof v.src === "string") return v.src;
    if (typeof v.src === "object") return v.src?.src || "";
    return v.default || "";
  }
  return String(v);
}

export default function ProjectPage({ langData = {}, project = {}, projects = [] }) {
  const lang  = langData?.lang || "en";
  const isRTL = lang === "fa";

  const techRef = useRef(null);
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef(null);

  function handleTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // swipe left → next (in LTR), prev (in RTL)
        isRTL
          ? setSlide((s) => (s - 1 + images.length) % images.length)
          : setSlide((s) => (s + 1) % images.length);
      } else {
        // swipe right → prev (in LTR), next (in RTL)
        isRTL
          ? setSlide((s) => (s + 1) % images.length)
          : setSlide((s) => (s - 1 + images.length) % images.length);
      }
    }
    touchStartX.current = null;
  }

  const projectStatus = normalizeStatus(project?.status);
  const projectType   = normalizeType(project?.type);
  const projectTech   = normalizeTech(project?.tech);
  const techStack     = project?.tech_stack || [];
  const images        = project?.images || [];
  const statusColor   = STATUS_DOT[projectStatus] || STATUS_DOT.Production;
  const iconSrc       = resolveSrc(project?.icon);
  const mainImageSrc  = resolveSrc(project?.mainImage);

  useEffect(() => {
    const cards = techRef.current?.querySelectorAll(".pd-tech-card");
    if (!cards) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("active"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    cards.forEach((c, i) => { c.style.transitionDelay = `${i * 35}ms`; obs.observe(c); });
    return () => obs.disconnect();
  }, [techStack]);

  const seoMeta = SEO[lang]?.project(project?.title || "", project?.description || "") || SEO.en.project(project?.title || "", "");
  const canonicalUrl = `${SITE_URL}/${lang}/projects/${project?.id}`;
  const ogImage = mainImageSrc || iconSrc || undefined;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "fa" ? "خانه" : "Home", item: `${SITE_URL}/${lang}` },
      { "@type": "ListItem", position: 2, name: lang === "fa" ? "پروژه‌ها" : "Projects", item: `${SITE_URL}/${lang}/projects` },
      { "@type": "ListItem", position: 3, name: project?.title || "", item: canonicalUrl },
    ],
  };

  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project?.title || "",
    description: project?.description || "",
    url: project?.link || canonicalUrl,
    image: ogImage,
    author: { "@type": "Organization", name: "Heysam", url: SITE_URL },
    ...(techStack.length > 0 && { keywords: techStack.join(", ") }),
  };

  return (
    <div
      className="pd-root"
      style={{ direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Estedad', sans-serif" : "'Inter', sans-serif" }}
    >
      <SeoHead
        title={seoMeta.title}
        description={seoMeta.description}
        keywords={seoMeta.keywords}
        ogImage={ogImage}
        canonical={canonicalUrl}
        siteName={SEO[lang]?.siteName}
        lang={lang}
        altLang={{ en: `${SITE_URL}/en/projects/${project?.id}`, fa: `${SITE_URL}/fa/projects/${project?.id}` }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <div className="ds-page-aura" />
      <Header content={langData?.header || {}} langState={lang} />

      {/* Hero banner */}
      <div className="pd-hero pd-fade-in">
        <div className="pd-hero-wrap">
          {/* Back link above banner */}
          <Link href={`/${lang}/projects`} className="pd-back-link pd-back-link-top" style={isRTL ? { direction: "rtl" } : {}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d={isRTL ? "M19 12H5M11 18l-6-6 6-6" : "M5 12h14M11 6l-6 6 6 6"}/>
            </svg>
            {isRTL ? "بازگشت به پروژه‌ها" : "Back to Projects"}
          </Link>

          {/* Banner card */}
          <div
            className="pd-hero-banner"
            style={mainImageSrc ? { backgroundImage: `url(${mainImageSrc})` } : {}}
          >
            <div className="pd-hero-banner-overlay" />

            {/* Live icon button — top right corner */}
            {projectType === "Public" && project?.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="pd-live-icon-btn" title={isRTL ? "مشاهده پروژه" : "Live Project"}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                </svg>
              </a>
            )}

            {/* Glass info bar at bottom */}
            <div className="pd-hero-glass-bar" style={isRTL ? { direction: "rtl" } : {}}>
              {(iconSrc || project?.title) && (
                <div className="pd-hero-glass-icon">
                  {iconSrc
                    ? <img src={iconSrc} alt={project?.title} />
                    : <span>{(project?.title || "P")[0]}</span>
                  }
                </div>
              )}
              <div className="pd-hero-glass-text">
                <h1 className="pd-title">{project?.title || (isRTL ? "پروژه" : "Project")}</h1>
                <div className="pd-badges">
                  <span className="pd-badge" style={{ "--dot": statusColor }}>
                    <span className="pd-badge-dot" />{projectStatus}
                  </span>
                  <span className={`pd-badge pd-badge-type ${projectType === "Private" ? "pd-badge-private" : ""}`}>
                    {projectType === "Public" ? (isRTL ? "عمومی" : "Public") : (isRTL ? "خصوصی" : "Private")}
                  </span>
                  {projectTech && <span className="pd-badge pd-badge-tech">{projectTech}</span>}
                </div>
              </div>
              {/* Desktop only: full live button */}
              {projectType === "Public" && project?.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="ds-btn ds-btn-primary pd-live-btn pd-live-btn-desk"
                  style={{ marginInlineStart: "auto", flexShrink: 0 }}>
                  {isRTL ? "مشاهده پروژه" : "Live Project"}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pd-body">
        {/* Main column */}
        <div className="pd-main">

          {/* Description */}
          <div className="pd-card pd-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="pd-card-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
              </svg>
              {isRTL ? "توضیحات" : "Description"}
            </h2>
            <p className="pd-desc">{project?.description || (isRTL ? "توضیحات در دسترس نیست" : "No description available")}</p>
          </div>

          {/* Gallery — right after description */}
          {images.length > 0 && (
            <div className="pd-card pd-fade-in" style={{ animationDelay: "0.15s" }}>
              <h2 className="pd-card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21,15 16,10 5,21"/>
                </svg>
                {isRTL ? "گالری" : "Gallery"}
              </h2>
              <PhotoProvider key={project.id}>
                <div className="pd-slider">
                  <div
                    className="pd-slider-main"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    {/* All images rendered — only current slide visible. Lightbox navigates all. */}
                    {images.map((media, i) => {
                      const src = typeof media === "string" ? media : resolveSrc(media?.src ?? media);
                      return (
                        <PhotoView key={i} src={src}>
                          <img
                            src={src}
                            alt={`${project?.title} - ${i + 1}`}
                            className="pd-slider-img"
                            loading="lazy"
                            style={{ display: i === slide ? "block" : "none" }}
                          />
                        </PhotoView>
                      );
                    })}
                    <span className="pd-slider-count">{slide + 1} / {images.length}</span>
                    {images.length > 1 && (
                      <>
                        <button className="pd-gal-btn pd-gal-prev"
                          onClick={() => setSlide((s) => (s - 1 + images.length) % images.length)} aria-label="previous">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M15 18l-6-6 6-6"/>
                          </svg>
                        </button>
                        <button className="pd-gal-btn pd-gal-next"
                          onClick={() => setSlide((s) => (s + 1) % images.length)} aria-label="next">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M9 18l6-6-6-6"/>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="pd-gal-thumbs">
                      {images.map((media, i) => {
                        const src = typeof media === "string" ? media : resolveSrc(media?.src ?? media);
                        return (
                          <button key={i}
                            className={`pd-gal-thumb${i === slide ? " active" : ""}`}
                            onClick={() => setSlide(i)}
                            style={{ backgroundImage: `url(${src})` }}
                            aria-label={`slide ${i + 1}`}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              </PhotoProvider>
            </div>
          )}

          {/* Features */}
          {project?.features?.length > 0 && (
            <div className="pd-card">
              <h2 className="pd-card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
                {isRTL ? "ویژگی‌های کلیدی" : "Key Features"}
              </h2>
              <ul className="pd-features">
                {project.features.map((feature, i) => (
                  <li key={i} className="pd-feature-item">
                    <span className="pd-feature-dot" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech stack */}
          {techStack.length > 0 && (
            <div className="pd-card" style={{ transitionDelay: "0.1s" }}>
              <h2 className="pd-card-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/>
                </svg>
                {isRTL ? "تکنولوژی‌های استفاده شده" : "Tech Stack"}
              </h2>
              <div ref={techRef} className="pd-tech-grid">
                {techStack.map((tech, i) => {
                  const skillData = simplifiedSkills.find(
                    (s) => s.alt.toLowerCase() === tech.toLowerCase()
                  ) || { src: `https://cdn.simpleicons.org/${tech.toLowerCase()}` };
                  return (
                    <div key={i} className="pd-tech-card">
                      <img src={skillData.src} alt={tech} className="pd-tech-icon" loading="lazy" />
                      <span className="pd-tech-name">{tech}</span>
                      {skillData.description?.[lang] && (
                        <div className="pd-tech-tip">{skillData.description[lang]}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Other Projects — full width at bottom */}
      {projects?.length > 0 && (
        <div className="pd-others-section pd-fade-in" style={{ animationDelay: "0.2s", direction: isRTL ? "rtl" : "ltr" }}>
          <div className="pd-others-inner">
            <h4 className="pd-card-title" style={{ marginBottom: 20 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/>
              </svg>
              {isRTL ? "پروژه‌های دیگر" : "Other Projects"}
            </h4>
            <div className="pd-others-grid">
              {projects?.map((proj) => {
                const pType = normalizeType(proj.type);
                const pIcon = resolveSrc(proj.icon);
                return (
                  <Link key={proj.id} href={`/${lang}/projects/${proj.id}`} className="pd-other-item">
                    <div className="pd-other-icon">
                      {pIcon ? (
                        <img src={pIcon} alt={proj.title} loading="lazy" />
                      ) : (
                        <span>{(proj.title || "P")[0]}</span>
                      )}
                    </div>
                    <div className="pd-other-text">
                      <div className="pd-other-name">{proj.title}</div>
                      <div className="pd-other-meta">
                        <span className={`pd-badge-xs ${pType === "Private" ? "pd-badge-private" : ""}`}>
                          {pType === "Public" ? (isRTL ? "عمومی" : "Public") : (isRTL ? "خصوصی" : "Private")}
                        </span>
                        {proj.tech && <span className="pd-badge-xs pd-badge-tech">{normalizeTech(proj.tech)}</span>}
                      </div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pd-other-arrow">
                      <path d={isRTL ? "M19 12H5" : "M5 12h14"}/>
                      <path d={isRTL ? "M9 18l-6-6 6-6" : "M13 6l6 6-6 6"}/>
                    </svg>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <Footer content={langData?.footer || {}} langState={lang} />
      <BackToTopButton />

      <style jsx global>{`
        .pd-root {
          min-height: 100vh;
          background: #07060f;
          color: #e8e6f0;
          padding-top: 0;
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
        }

        /* Hero strip */
        /* ── Hero section ── */
        .pd-hero { padding: 80px 0 0; }
        .pd-hero-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 28px;
        }
        /* Back link row above banner */
        .pd-back-link-top {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 8px 14px 8px 10px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          transition: color .2s, background .2s, border-color .2s;
          backdrop-filter: blur(8px);
        }
        .pd-back-link-top:hover {
          color: #fff;
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.16);
        }

        /* Banner card */
        .pd-hero-banner {
          position: relative;
          width: 100%;
          height: 520px;
          border-radius: 24px;
          background-size: cover;
          background-position: center;
          background-color: #0d0b1e;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          box-shadow: 0 40px 100px rgba(0,0,0,0.6);
        }
        .pd-hero-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            170deg,
            rgba(0,0,0,0.0) 0%,
            rgba(0,0,0,0.1) 40%,
            rgba(7,6,15,0.82) 70%,
            rgba(7,6,15,0.97) 100%
          );
        }

        /* Glass info bar at the bottom of the banner */
        .pd-hero-glass-bar {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 28px 24px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(24px) saturate(160%);
          -webkit-backdrop-filter: blur(24px) saturate(160%);
          border-top: 1px solid rgba(255,255,255,0.08);
          flex-wrap: wrap;
        }
        .pd-hero-glass-icon {
          width: 64px; height: 64px;
          border-radius: 16px;
          background: rgba(10,8,24,0.85);
          border: 2px solid rgba(155,81,224,0.5);
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
          box-shadow: 0 6px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(185,133,240,0.15);
        }
        .pd-hero-glass-icon img { width: 44px; height: 44px; object-fit: contain; }
        .pd-hero-glass-icon span {
          font-size: 24px; font-weight: 800;
          background: linear-gradient(135deg,#3F51B5,#9B51E0);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .pd-hero-glass-text { flex: 1; min-width: 0; }
        .pd-hero-glass-text .pd-title { margin: 0 0 8px; }

        /* Live icon button (always in top-right of banner) */
        .pd-live-icon-btn {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 10;
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          transition: background .2s, transform .2s;
          text-decoration: none;
        }
        .pd-live-icon-btn:hover { background: rgba(155,81,224,0.4); transform: scale(1.08); }

        /* keep old .pd-hero-inner for no-image fallback */
        .pd-hero-inner {
          max-width: 1200px; margin: 0 auto; padding: 40px 28px 24px;
          display: flex; align-items: center; gap: 20px; flex-wrap: wrap;
        }
        .pd-hero-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .pd-hero-icon { width: 44px; height: 44px; object-fit: contain; }
        .pd-hero-icon-fallback {
          font-size: 26px;
          font-weight: 800;
          background: linear-gradient(135deg, #3F51B5, #9B51E0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pd-hero-text { flex: 1; min-width: 0; }
        .pd-hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }
        .pd-back-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .pd-back-link:hover { color: rgba(155,81,224,0.9); }
        .pd-title {
          font-size: clamp(1.5rem, 4vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 10px;
          color: #fff;
        }
        .pd-badges { display: flex; gap: 8px; flex-wrap: wrap; }
        .pd-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.7);
        }
        .pd-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--dot, #22c55e);
          box-shadow: 0 0 6px var(--dot, #22c55e);
        }
        .pd-badge-type { color: #6ee7b7; background: rgba(110,231,183,0.08); border-color: rgba(110,231,183,0.2); }
        .pd-badge-private { color: #fca5a5; background: rgba(252,165,165,0.08); border-color: rgba(252,165,165,0.2); }
        .pd-badge-tech { color: rgba(255,255,255,0.5); }
        .pd-live-btn { flex-shrink: 0; font-size: 13px; padding: 10px 18px; }

        /* Body layout */
        .pd-body {
          max-width: 860px;
          margin: 0 auto;
          padding: 32px 24px 40px;
          display: flex;
          flex-direction: column;
        }
        .pd-main { width: 100%; }

        /* Other Projects — full width section */
        .pd-others-section {
          max-width: 860px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .pd-others-inner {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(18px) saturate(140%);
        }
        .pd-others-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 10px;
        }

        /* Cards */
        .pd-card {
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(18px) saturate(140%);
          margin-bottom: 20px;
          min-width: 0;
          overflow: hidden;
          box-sizing: border-box;
        }
        .pd-card:last-child { margin-bottom: 0; }
        .pd-card-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 16px;
        }
        .pd-card-title svg { opacity: 0.5; }

        /* Description */
        .pd-desc {
          font-size: 14.5px;
          line-height: 1.75;
          color: rgba(255,255,255,0.6);
          margin: 0;
        }

        /* Tech grid */
        .pd-tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 10px;
        }
        .pd-tech-card {
          position: relative;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 12px 8px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s;
        }
        .pd-tech-card.active { opacity: 1; transform: translateY(0); }
        .pd-tech-card:hover { background: rgba(155,81,224,0.1); border-color: rgba(155,81,224,0.25); }
        .pd-tech-icon { width: 32px; height: 32px; object-fit: contain; }
        .pd-tech-name { font-size: 10.5px; font-weight: 500; text-align: center; color: rgba(255,255,255,0.65); }
        .pd-tech-tip {
          position: absolute;
          bottom: calc(100% + 6px);
          left: 50%;
          transform: translateX(-50%);
          background: #1a1830;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.8);
          font-size: 11px;
          padding: 5px 10px;
          border-radius: 8px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s;
          z-index: 10;
        }
        .pd-tech-card:hover .pd-tech-tip { opacity: 1; }

        /* Gallery */
        /* ── Slider ── */
        .pd-slider { display: flex; flex-direction: column; gap: 12px; }
        .pd-slider-main {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background: #08071a;
          aspect-ratio: 16/9;
          cursor: zoom-in;
        }
        .pd-slider-img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: opacity .3s ease;
        }
        .pd-slider-count {
          position: absolute; bottom: 12px; right: 14px;
          background: rgba(0,0,0,0.55); backdrop-filter: blur(6px);
          color: rgba(255,255,255,0.7); font-size: 12px; font-weight: 500;
          padding: 3px 9px; border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          pointer-events: none;
        }
        .pd-gal-btn {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(10,8,25,0.65); backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #fff; display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background .2s, border-color .2s, transform .2s;
          z-index: 2;
        }
        .pd-gal-btn:hover { background: rgba(155,81,224,0.55); border-color: rgba(155,81,224,0.6); transform: translateY(-50%) scale(1.08); }
        .pd-gal-prev { left: 12px; }
        .pd-gal-next { right: 12px; }
        .pd-gal-thumbs {
          display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px;
          scrollbar-width: none;
        }
        .pd-gal-thumbs::-webkit-scrollbar { display: none; }
        .pd-gal-thumb {
          flex: none;
          width: 72px; height: 52px;
          border-radius: 10px;
          border: 2px solid rgba(255,255,255,0.1);
          background: rgba(0,0,0,0.4) center/cover no-repeat;
          cursor: pointer;
          transition: border-color .2s, opacity .2s, transform .2s;
          padding: 0; opacity: 0.55;
        }
        .pd-gal-thumb.active { border-color: #9b51e0; opacity: 1; transform: scale(1.05); }
        .pd-gal-thumb:hover { opacity: 0.9; }

        /* Features */
        .pd-features { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .pd-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.65);
          line-height: 1.6;
        }
        .pd-feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3F51B5, #9B51E0);
          margin-top: 7px;
          flex-shrink: 0;
        }

        /* Sidebar */
        .pd-side-card { margin-bottom: 0; position: sticky; top: 88px; }
        .pd-other-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .pd-other-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          text-decoration: none;
          color: inherit;
          transition: all 0.2s;
        }
        .pd-other-item:hover { background: rgba(155,81,224,0.08); border-color: rgba(155,81,224,0.25); }
        .pd-other-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          flex-shrink: 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          font-weight: 700;
          color: rgba(155,81,224,0.8);
        }
        .pd-other-icon img { width: 28px; height: 28px; object-fit: contain; border-radius: 4px; }
        .pd-other-text { flex: 1; min-width: 0; }
        .pd-other-name { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }
        .pd-other-meta { display: flex; gap: 5px; flex-wrap: wrap; }
        .pd-badge-xs {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 5px;
          background: rgba(110,231,183,0.08);
          color: #6ee7b7;
          border: 1px solid rgba(110,231,183,0.15);
        }
        .pd-badge-xs.pd-badge-private { background: rgba(252,165,165,0.08); color: #fca5a5; border-color: rgba(252,165,165,0.15); }
        .pd-badge-xs.pd-badge-tech { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.4); border-color: rgba(255,255,255,0.08); }
        .pd-other-arrow { opacity: 0.3; flex-shrink: 0; transition: opacity 0.2s, transform 0.2s; }
        .pd-other-item:hover .pd-other-arrow { opacity: 0.8; transform: translateX(3px); }
        [dir="rtl"] .pd-other-item:hover .pd-other-arrow { transform: translateX(-3px); }

        /* Fade-in animation for page sections */
        .pd-fade-in {
          animation: pd-fadein 0.55s ease both;
        }
        @keyframes pd-fadein {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          .pd-hero { padding: 64px 0 0; }
          .pd-hero-wrap { padding: 0; }
          .pd-back-link-top { margin: 10px 16px 12px; }

          /* Full-bleed banner */
          .pd-hero-banner {
            height: 100svh;
            max-height: 580px;
            border-radius: 0;
            box-shadow: none;
          }

          /* Glass bar: vertical stack */
          .pd-hero-glass-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            padding: 16px 18px 20px;
          }

          /* hide separate icon on mobile — branding visible in banner image */
          .pd-hero-glass-icon { display: none; }
          .pd-hero-glass-text { width: 100%; }
          .pd-hero-glass-text .pd-title {
            font-size: clamp(20px, 5.5vw, 28px);
            margin-bottom: 8px;
          }
          .pd-badges { flex-wrap: wrap; gap: 6px; }

          /* Hide desktop full live button on mobile (icon button handles it) */
          .pd-live-btn-desk { display: none !important; }

          /* Body — prevent overflow */
          .pd-body {
            padding: 20px 16px 24px;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
          }
          .pd-others-section { padding: 0 16px 60px; }
          .pd-others-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
          .pd-card {
            padding: 18px 16px;
            overflow: hidden;
            word-break: break-word;
          }
          .pd-main {
            width: 100%;
            min-width: 0;
            overflow: hidden;
          }
          .pd-tech-grid { grid-template-columns: repeat(auto-fill, minmax(70px, 1fr)); }
          .pd-desc { overflow-wrap: break-word; word-break: break-word; }
        }
      `}</style>
    </div>
  );
}

export async function getStaticPaths() {
  const languages = ["en", "fa"];
  const allPaths = [];

  for (const lang of languages) {
    try {
      const dir = path.join(process.cwd(), "src", "data", "projects", lang);
      if (!fs.existsSync(dir)) continue;

      fs.readdirSync(dir)
        .filter((f) => f.endsWith(".js"))
        .forEach((f) => allPaths.push({ params: { ln: lang, projectId: path.basename(f, ".js") } }));

      const custom = await readCustomProjects(lang);
      custom.forEach((p) => { if (p?.id) allPaths.push({ params: { ln: lang, projectId: p.id } }); });
    } catch (err) {
      console.error(`getStaticPaths error for ${lang}:`, err);
    }
  }

  return { paths: allPaths, fallback: "blocking" };
}

export async function getStaticProps({ params: { ln, projectId } }) {
  try {
    const langData   = (await import(`@/data/languages/${ln}.js`))?.default || {};
    const customs    = await readCustomProjects(ln);
    const custom     = customs.find((i) => i.id === projectId);

    let project = {};
    try { project = (await import(`@/data/projects/${ln}/${projectId}.js`))?.default || {}; }
    catch { /* static file not found, use custom */ }

    if (custom) {
      project = {
        ...project,
        ...custom,
        images:    custom.images?.length    ? custom.images    : project.images    || [],
        icon:      custom.icon?.src && custom.icon.src !== "[object Object]" ? custom.icon : project.icon,
        tech_stack: custom.tech_stack?.length ? custom.tech_stack : project.tech_stack || [],
        features:  custom.features?.length  ? custom.features  : project.features  || [],
      };
    }

    project = {
      title: "", tech: "", description: "", images: [], features: [],
      status: "Production", type: "Public", tech_stack: [],
      icon: { src: "/images/default-icon.png" },
      ...project,
      id: projectId,
      icon: typeof project.icon === "string" ? { src: project.icon } : project.icon || { src: "/images/default-icon.png" },
    };

    if (project.isActive === false) return { notFound: true };

    const dir       = path.join(process.cwd(), "src", "data", "projects", ln);
    const normId    = (v) => String(v || "").trim().toLowerCase();
    const curKey    = normId(projectId);

    const otherProjectFiles = fs.readdirSync(dir).filter((f) => f.endsWith(".js") && f !== `${projectId}.js`);
    const others = await Promise.all(otherProjectFiles.map(async (f) => {
      try {
        const m  = (await import(`@/data/projects/${ln}/${f}`))?.default || {};
        const id = path.basename(f, ".js");
        return { id, title: m.title || "", tech: m.tech || "", type: m.type || "Public", status: m.status || "Production", icon: m.icon || { src: "" } };
      } catch { return null; }
    }));

    const mergedMap = new Map(others.filter(Boolean).map((p) => [normId(p.id), p]));
    customs.filter((c) => normId(c.id) !== curKey && c.isActive !== false).forEach((c) => {
      const k = normId(c.id);
      mergedMap.set(k, { ...(mergedMap.get(k) || {}), ...c });
    });

    return {
      props: {
        langData: { lang: ln, ...langData },
        project,
        projects: Array.from(mergedMap.values()).filter((p) => normId(p.id) !== curKey),
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error(`Error loading ${ln}/${projectId}:`, err);
    return { notFound: true };
  }
}
