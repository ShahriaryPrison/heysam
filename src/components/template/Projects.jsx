import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { ShineBorder } from "../magicui/shine-border";
import simplifiedSkills from "@/data/skillData";
import Link from "next/link";
import { AuroraText } from "../magicui/aurora-text";

const ReviewCard = ({
  key,
  icon,
  title,
  slug,
  tech_stack,
  description,
  langState,
}) => {
  const someSkills = simplifiedSkills
    .filter((item) => tech_stack.includes(item.alt))
    .slice(0, 6);

  return (
    <Link
      key={key}
      href={`/${langState}/projects/${slug}`}
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 glass text-white",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <div className="w-full flex justify-between items-end">
        <div className="flex flex-row items-center gap-2">
          <div className="flex flex-col gap-2">
            <figcaption className="text-sm font-medium dark:text-white">
              {title}
            </figcaption>
            <div className="flex items-center gap-1 overflow-hidden">
              {someSkills.map((skill, index) => (
                <img
                  key={index}
                  src={skill.src}
                  className="w-4 h-4"
                  alt={skill.alt}
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
};

const ProjectsModal = ({ projects, langState, onClose }) => {
  // Variants for animations
  const backdropVariants = {
    hidden: { opacity: 0, backdropFilter: "blur(0px)" },
    visible: {
      opacity: 1,
      backdropFilter: "blur(8px)",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      backdropFilter: "blur(0px)",
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const projectCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05 + 0.3,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const modalContent = {
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
  };

  const currentContent = langState === "en" ? modalContent.en : modalContent.fa;

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
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-b from-gray-900/80 to-transparent">
          <div>
            <motion.h2
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {currentContent.title}
            </motion.h2>
            <motion.p
              className="text-white/70 text-sm mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {currentContent.subtitle}
            </motion.p>
          </div>

          <motion.button
            onClick={onClose}
            className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
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
              className="text-white/70 group-hover:text-white w-5 h-5 transition-colors duration-200"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const someSkills = simplifiedSkills
                .filter((item) => project.tech_stack.includes(item.alt))
                .slice(0, 6);

              return (
                <motion.div
                  key={project.id}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] hover:border-white/20 transition-all duration-300"
                  variants={projectCardVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/${langState}/projects/${project.id}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative z-10 p-5 h-full flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-white text-lg">
                          {project.title}
                        </h3>
                        <div className="button-gradient px-2 py-1 rounded-2xl text-xs">
                          {langState === "fa" ? "جزئیات" : "details"}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4 flex-wrap">
                        {someSkills.map((skill, i) => (
                          <img
                            key={i}
                            src={skill.src}
                            className="w-5 h-5"
                            alt={skill.alt}
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
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 border-t border-white/10 bg-gradient-to-t from-gray-900/80 to-transparent">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <button
              onClick={onClose}
              className="group relative px-6 py-3 rounded-lg font-bold text-white overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute inset-0.5 rounded-md bg-gray-900/90 group-hover:bg-gray-900/80 transition-colors duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-2">
                {currentContent.closeButton}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-400"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Projects({ projects, langState }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="projects">
      <div className="w-full text-center pt-10 pb-4 sm:text-left max-w-7xl py-10 mx-auto flex flex-col gap-4 sm:flex-row text-white relative">
        <h4 className="text-white px-4   w-full font-bold text-5xl">
          <AuroraText>
            {langState === "fa" ? "پروژه ها" : "Expriences"}
          </AuroraText>
        </h4>

        {/* Show All Button - Visible on all devices */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full max-w-40 mx-auto text-nowrap button-gradient px-4 py-2 rounded-lg font-medium text-sm cursor-pointer"
        >
          {langState === "fa" ? "نمایش همه" : "Show All"}
        </button>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          {projects.map((project) => (
            <ReviewCard
              key={project.title}
              langState={langState}
              tech_stack={project.tech_stack}
              slug={project.id}
              {...project}
            />
          ))}
        </Marquee>

        {/* Gradient fade effects */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 
               backdrop-blur-[2px] 
               [mask-image:linear-gradient(to_left,transparent,white)]"
        ></div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/4 
               backdrop-blur-[2px] 
               [mask-image:linear-gradient(to_right,transparent,white)]"
        ></div>
      </div>

      {/* Projects Modal */}
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
