import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { ShineBorder } from "../magicui/shine-border";
import simplifiedSkills from "@/data/skillData";
import Link from "next/link";
import { AuroraText } from "../magicui/aurora-text";

const ReviewCard = React.memo(
  ({ icon, title, slug, tech_stack, description, langState }) => {
    const someSkills = useMemo(
      () =>
        simplifiedSkills
          .filter((item) => tech_stack.includes(item.alt))
          .slice(0, 4),
      [tech_stack]
    );

    return (
      <Link
        href={`/${langState}/projects/${slug}`}
        className={cn(
          "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 glass text-white mr-4",
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        )}
        prefetch={false}
      >
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-row items-center gap-2">
            <div className="flex flex-col gap-2">
              <figcaption className="text-sm font-medium dark:text-white">
                {title}
              </figcaption>
              <div className="flex items-center gap-1 overflow-hidden">
                {someSkills.map((skill) => (
                  <img
                    key={skill.alt}
                    src={skill.src}
                    className="w-4 h-4"
                    alt={skill.alt}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="button-gradient px-2 py-1 rounded-2xl text-xs">
            {langState === "fa" ? "جزئیات" : "details"}
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-gray-400 opacity-70 rounded-lg mt-4" />
        <blockquote className="mt-2 text-sm line-clamp-2">
          {description}
        </blockquote>
      </Link>
    );
  }
);

ReviewCard.displayName = "ReviewCard";

const ProjectCard = React.memo(({ project, langState }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const someSkills = useMemo(
    () =>
      simplifiedSkills
        .filter((item) => project.tech_stack.includes(item.alt))
        .slice(0, 4),
    [project.tech_stack]
  );

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      y: isMobile ? 0 : -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] hover:border-white/20 transition-all duration-300"
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Link href={`/${langState}/projects/${project.id}`} prefetch={false}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 p-5 h-full flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-bold text-white text-lg">{project.title}</h3>
            <div className="button-gradient px-2 py-1 rounded-2xl text-xs">
              {langState === "fa" ? "جزئیات" : "details"}
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {someSkills.map((skill) => (
              <img
                key={skill.alt}
                src={skill.src}
                className="w-5 h-5"
                alt={skill.alt}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>

          <p className="text-white/70 text-sm line-clamp-3">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

const ProjectsModal = ({ projects, langState, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const modalContent = useMemo(
    () => ({
      en: {
        title: "All Projects",
        subtitle: "Here's a complete list of my projects and experiences.",
        closeButton: "Close",
      },
      fa: {
        title: "همه پروژه‌ها",
        subtitle: "در اینجا لیست کامل پروژه‌ها و تجربیات من آورده شده است.",
        closeButton: "بستن",
      },
    }),
    [langState]
  );

  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: {
      opacity: 1,
      backdropFilter: isMobile ? "blur(4px)" : "blur(8px)",
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: { duration: 0.2 },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 20 : 50,
      scale: isMobile ? 0.98 : 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: isMobile ? 0.3 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: isMobile ? 20 : 30,
      scale: isMobile ? 0.98 : 0.95,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        className="relative z-20 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-2xl shadow-black/50 backdrop-blur-lg"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 sm:p-6 border-b border-white/10 bg-gradient-to-b from-gray-900/80 to-transparent">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              {modalContent[langState].title}
            </h2>
            <p className="text-white/70 text-xs sm:text-sm mt-1">
              {modalContent[langState].subtitle}
            </p>
          </div>

          <motion.button
            onClick={onClose}
            className="group relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200"
            whileHover={!isMobile ? { scale: 1.1 } : {}}
            whileTap={{ scale: 0.9 }}
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/30 to-cyan-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              className="text-white/70 group-hover:text-white w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {projects.map((project, index) => (
              <ProjectCard
                key={`${project.id}-${index}`}
                project={project}
                langState={langState}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-4 sm:p-6 border-t border-white/10 bg-gradient-to-t from-gray-900/80 to-transparent">
          <button
            onClick={onClose}
            className="group relative px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-bold text-white overflow-hidden mx-auto block text-sm sm:text-base"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute inset-0.5 rounded-md bg-gray-900/90 group-hover:bg-gray-900/80 transition-colors duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {modalContent[langState].closeButton}
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects({ projects, langState }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="projects">
      <div
        className={`w-full text-center pt-10 sm:pt-32 pb-4 sm:text-left max-w-7xl py-10 mx-auto flex flex-col gap-4 sm:flex-row text-white relative ${
          langState === "fa" ? "rtl" : ""
        }`}
      >
        <h4
          className={`text-white px-4 w-full font-bold text-5xl ${
            langState === "fa"
              ? "text-center sm:text-right"
              : "text-center sm:text-left"
          }`}
        >
          <AuroraText>
            {langState === "fa" ? "پروژه ها" : "Expriences"}
          </AuroraText>
        </h4>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-40 mx-auto text-nowrap button-gradient px-4 py-2 rounded-lg font-medium text-sm cursor-pointer"
        >
          {langState === "fa" ? "نمایش همه" : "Show All"}
        </button>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover={!isMobile} className={""}>
          {projects.slice(0, isMobile ? 4 : projects.length).map((project) => (
            <ReviewCard
              key={project.id}
              langState={langState}
              tech_stack={project.tech_stack}
              slug={project.id}
              {...project}
            />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 backdrop-blur-[2px] [mask-image:linear-gradient(to_left,transparent,white)]"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 backdrop-blur-[2px] [mask-image:linear-gradient(to_right,transparent,white)]"></div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <ProjectsModal
            projects={projects}
            langState={langState}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
