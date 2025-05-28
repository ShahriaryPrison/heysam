import Header from "@/components/template/Header";
import MainAboutUs from "@/components/template/MainAboutUs";
import Skills from "@/components/template/Skills";
import Projects from "@/components/template/Projects";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import fs from "fs";
import path from "path";

export default function Home({ langData, projects }) {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section
      className={`flex flex-col items-center gap-8 pb-8 w-screen px-4`}
      style={
        langData.lang === "fa" ? { direction: "rtl" } : { direction: "ltr" }
      }
    >
      <Header content={langData.header} langState={langData.lang} />
      <MainAboutUs content={langData.main_about_us} langState={langData.lang} />
      <Projects
        projects={projects}
        lang={langData.lang}
        content={langData.projects}
      />
      <Skills content={langData.skills} langState={langData.lang} />
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
  const projectsDir = path.join(process.cwd(), "data", "projects", ln);
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
