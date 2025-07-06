// components/template/Projects.js
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import simplifiedSkills from "@/data/skillData";
import Link from "next/link";
import { AuroraText } from "../magicui/aurora-text";
import { useEffect, useState } from "react";

const ProjectPreviewCard = ({ project, langState }) => {
  const someSkills = simplifiedSkills
    .filter((item) => project.tech_stack.includes(item.alt))
    .slice(0, 4);

  return (
    <div
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 glass text-white mr-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Link href={`/${langState}/projects/${project.id}`} prefetch={false}>
        <div className="relative z-10">
          <div className="w-full flex justify-between items-end mb-3">
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col gap-2">
                <figcaption className="text-sm font-medium dark:text-white">
                  {project.title}
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
          <div className="w-full h-[0.5px] bg-gray-400 opacity-70 rounded-lg my-2" />
          <blockquote className="text-sm line-clamp-2">
            {project.description}
          </blockquote>
        </div>
      </Link>
    </div>
  );
};

export default function Projects({ projects, langState, content }) {
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
    <section id="projects" className="flex flex-col items-center gap-10 mb-20">
      <div
        className={`w-full text-center pt-10 sm:pt-32 pb-4 sm:text-left max-w-7xl py-10 mx-auto flex flex-col gap-8 sm:flex-row text-white relative ${
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
            {langState === "fa" ? "پروژه ها" : "Projects"}
          </AuroraText>
        </h4>

        <Link
          href={`/${langState}/projects`}
          className="w-full max-w-40 mx-auto text-nowrap button-gradient px-4 py-2 rounded-lg font-medium text-sm cursor-pointer text-center flex justify-center items-center gap-2"
        >
          {langState === "fa" ? "نمایش همه" : "View All"}
        </Link>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover={!isMobile} className={""}>
          {projects.slice(0, isMobile ? 4 : projects.length).map((project) => (
            <ProjectPreviewCard
              key={project.id}
              project={project}
              langState={langState}
            />
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 backdrop-blur-[2px] [mask-image:linear-gradient(to_left,transparent,white)]"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 backdrop-blur-[2px] [mask-image:linear-gradient(to_right,transparent,white)]"></div>
      </div>
    </section>
  );
}
