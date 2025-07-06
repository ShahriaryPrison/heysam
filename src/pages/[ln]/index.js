// pages/[ln]/index.jsx
import Header from "@/components/template/Header";
import Hero from "@/components/template/Hero";
import Projects from "@/components/template/Projects";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import fs from "fs";
import path from "path";
import IconCloudDemo from "@/components/template/IconClude";
import Services from "@/components/template/Services";

export default function Home({ langData, projects }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className={`flex flex-col items-center gap-8 w-screen`}
      style={
        langData.lang === "fa" ? { direction: "rtl" } : { direction: "ltr" }
      }
    >
      <Header content={langData.header} langState={langData.lang} />
      <Hero content={langData.main_about_us} langState={langData.lang} />
      <Services key={langData.lang} langState={langData.lang} />
      <IconCloudDemo content={langData.skills} langState={langData.lang} />
      <Projects
        projects={projects}
        langState={langData.lang}
        content={langData.projects}
      />
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

  // Import language data
  const langData = (await import(`@/data/languages/${ln}.js`)).default;

  // Read projects
  const projectsDir = path.join(process.cwd(), "src", "data", "projects", ln);

  const projectFiles = fs.readdirSync(projectsDir);

  const projects = await Promise.all(
    projectFiles.map(async (file) => {
      const projectId = path.basename(file, ".js");
      const project = (await import(`@/data/projects/${ln}/${projectId}.js`))
        .default;
      return { ...project, id: projectId };
    })
  );

  return {
    props: {
      langData,
      projects: projects.sort((a, b) => a.id - b.id),
    },
  };
}
