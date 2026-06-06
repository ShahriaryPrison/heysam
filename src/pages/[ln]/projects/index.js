import simplifiedSkills from "@/data/skillData";
import Link from "next/link";
import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
import SeoHead from "@/components/SeoHead";
import fs from "fs";
import path from "path";
import { readCustomProjects, normalizeCustomProject } from "@/lib/projectStore";
import { useEffect, useRef } from "react";
import { SEO, SITE_URL } from "@/lib/seo";

const PAGE_COPY = {
  en: { title: "Projects", eyebrow: "Our Work", subtitle: "From problem analysis to technical execution", back: "Back to Home" },
  fa: { title: "پروژه‌ها", eyebrow: "نمونه‌کارها", subtitle: "از شناسایی مسئله تا پیاده‌سازی راه‌حل", back: "بازگشت به خانه" },
};

const ProjectCard = ({ project, langState, index }) => {
  const tags = project.tech_stack ? project.tech_stack.slice(0, 4) : project.tags || [];
  const mainImgSrc = project.mainImage || null;
  const iconSrc = project.icon?.src || project.icon || null;
  const isFA = langState === "fa";

  return (
    <Link href={`/${langState}/projects/${project.id}`} className="ap-card reveal">
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
          <span className="ap-card-badge">{isFA ? "جزئیات" : "Details"}</span>
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
};

const AllProjectsPage = ({ projects, langState, content }) => {
  const copy = PAGE_COPY[langState] ?? PAGE_COPY.en;
  const isRTL = langState === "fa";
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".ap-card");
    if (!cards) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    cards.forEach((card, i) => {
      card.style.transitionDelay = `${(i % 3) * 70}ms`;
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, [projects]);

  const seo = SEO[langState]?.projects || SEO.en.projects;

  return (
    <div style={{ direction: isRTL ? "rtl" : "ltr", fontFamily: isRTL ? "'Estedad', sans-serif" : "'Inter', sans-serif" }}>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`${SITE_URL}/${langState}/projects`}
        siteName={SEO[langState]?.siteName}
        lang={langState}
        altLang={{ en: `${SITE_URL}/en/projects`, fa: `${SITE_URL}/fa/projects` }}
      />
      <Header content={content.header} langState={langState} />

      <main className="ap-root">
        {/* Page header */}
        <div className="ap-head">
          <h1 className="ds-h-section">
            <span className="ds-grad-text">{copy.title}</span>
          </h1>
          <p className="ap-subtitle">{copy.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="ap-grid" ref={gridRef}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} langState={langState} index={i} />
          ))}
        </div>

        {/* Back link */}
        <div className="ap-back">
          <Link href={`/${langState}`} className="ds-btn ds-btn-ghost">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={isRTL ? { transform: "rotate(180deg)" } : {}}>
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            {copy.back}
          </Link>
        </div>
      </main>

      <Footer content={content.footer} langState={langState} />
      <BackToTopButton />
    </div>
  );
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { ln: "en" } }, { params: { ln: "fa" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { ln } = params;
  const langData = (await import(`@/data/languages/${ln}.js`)).default;

  const projectsDir = path.join(process.cwd(), "src", "data", "projects", ln);
  const projectFiles = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".js"));

  const staticProjects = await Promise.all(
    projectFiles.map(async (file) => {
      const id = path.basename(file, ".js");
      const project = (await import(`@/data/projects/${ln}/${id}.js`)).default;
      return normalizeCustomProject({ ...project, id });
    })
  );

  const customProjects = await readCustomProjects(ln);
  const map = new Map(staticProjects.map((p) => [p.id, p]));
  customProjects.forEach((p) => map.set(p.id, normalizeCustomProject(p)));

  const projects = Array.from(map.values())
    .filter((p) => p.isActive !== false)
    .sort((a, b) => a.id.toString().localeCompare(b.id.toString()));

  return { props: { projects, langState: ln, content: langData }, revalidate: 60 };
}

export default AllProjectsPage;
