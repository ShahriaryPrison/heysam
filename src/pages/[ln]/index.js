import Header from "@/components/template/Header";
import Hero from "@/components/template/Hero";
import Projects from "@/components/template/Projects";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
import Services from "@/components/template/Services";
import About from "@/components/template/About";
import Skills from "@/components/template/Skills";
import Contact from "@/components/template/Contact";
import SeoHead from "@/components/SeoHead";
import fs from "fs";
import path from "path";
import { readCustomProjects, normalizeCustomProject } from "@/lib/projectStore";
import { SEO, SITE_URL } from "@/lib/seo";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Heysam",
  url: SITE_URL,
  logo: `${SITE_URL}/images/heysam-logo.png`,
  sameAs: [
    "https://www.instagram.com/heysam.build",
    "https://www.linkedin.com/company/heytham/",
  ],
  description: "Professional software development studio building web apps, websites, and digital products.",
};

export default function Home({ langData, projects }) {
  const lang = langData.lang;
  const seo = SEO[lang]?.home || SEO.en.home;

  return (
    <section
      className="flex flex-col items-center w-screen"
      style={lang === "fa" ? { direction: "rtl" } : { direction: "ltr" }}
    >
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`${SITE_URL}/${lang}`}
        siteName={SEO[lang]?.siteName}
        lang={lang}
        altLang={{ en: `${SITE_URL}/en`, fa: `${SITE_URL}/fa` }}
      />
      {/* JSON-LD Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <div className="ds-page-aura" />
      <Header content={langData.header} langState={langData.lang} />
      <Hero content={langData.main_about_us} langState={langData.lang} />
      <Services key={langData.lang} langState={langData.lang} />
      <About langState={langData.lang} />
      <Skills langState={langData.lang} />
      <Projects projects={projects} langState={langData.lang} content={langData.projects} />
      <Contact langState={langData.lang} />
      <Footer content={langData.footer} langState={langData.lang} />
      <BackToTopButton />
    </section>
  );
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { ln: "en" } }, { params: { ln: "fa" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { ln } = params;
  const langData = (await import(`@/data/languages/${ln}.js`)).default;

  const projectsDir  = path.join(process.cwd(), "src", "data", "projects", ln);
  const projectFiles = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".js"));

  const staticProjects = await Promise.all(
    projectFiles.map(async (file) => {
      const id      = path.basename(file, ".js");
      const project = (await import(`@/data/projects/${ln}/${id}.js`)).default;
      return normalizeCustomProject({ ...project, id });
    })
  );

  const customProjects = await readCustomProjects(ln);
  const map = new Map(staticProjects.map((p) => [p.id, p]));
  customProjects.forEach((p) => map.set(p.id, normalizeCustomProject(p)));

  const FIRST_PROJECT = "alef";
  const allProjects = Array.from(map.values())
    .filter((p) => p.isActive !== false)
    .sort((a, b) => a.id.toString().toLowerCase().localeCompare(b.id.toString().toLowerCase()));

  const firstIdx = allProjects.findIndex((p) => p.id.toLowerCase() === FIRST_PROJECT);
  if (firstIdx > 0) {
    const [first] = allProjects.splice(firstIdx, 1);
    allProjects.unshift(first);
  }
  const projects = allProjects.slice(0, 5);

  return { props: { langData, projects }, revalidate: 60 };
}
