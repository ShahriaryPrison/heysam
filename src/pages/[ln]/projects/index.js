// pages/[ln]/projects/index.js
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import simplifiedSkills from "@/data/skillData";
import Link from "next/link";
import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
import fs from "fs";
import path from "path";

const ProjectCard = ({ project, langState }) => {
  const someSkills = simplifiedSkills
    .filter((item) => project.tech_stack.includes(item.alt))
    .slice(0, 4);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] hover:border-white/20 transition-all duration-300 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
    >
      <Link href={`/${langState}/projects/${project.id}`} prefetch={false}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-white text-xl">{project.title}</h3>
            <div className="button-gradient px-3 py-1.5 rounded-2xl text-sm">
              {langState === "fa" ? "جزئیات" : "details"}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-5 flex-wrap">
            {someSkills.map((skill) => (
              <img
                key={skill.alt}
                src={skill.src}
                className="w-6 h-6"
                alt={skill.alt}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          <p className="text-white/70 text-sm line-clamp-3 mb-4">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-3" />
            <div className="flex justify-between items-center text-xs text-white/50">
              <span>
                {langState === "fa" ? "تکنولوژی‌ها" : "Technologies"} (
                {project.tech_stack.length})
              </span>
              <span>{project.date}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const AllProjectsPage = ({ projects, langState, content }) => {
  const pageContent = {
    en: {
      title: "All Projects",
      subtitle: "From problem analysis to technical execution",
      back: "Back to Home",
    },
    fa: {
      title: "پروژه ها",
      subtitle: "از شناسایی مسئله تا پیاده‌سازی راه‌حل",
      back: "بازگشت به خانه",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <Header content={content.header} langState={langState} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">
            {pageContent[langState].title}
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            {pageContent[langState].subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              langState={langState}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href={`/${langState}`}
            className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`mr-2 h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1 ${
                langState === "fa" ? "ml-2 rotate-180" : "mr-2"
              }`}
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            {pageContent[langState].back}
          </Link>
        </motion.div>
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
      projects: projects.sort((a, b) => a.id - b.id),
      langState: ln,
      content: langData,
    },
  };
}

export default AllProjectsPage;
