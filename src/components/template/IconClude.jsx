import { IconCloud } from "@/components/magicui/icon-cloud";
import { ShineBorder } from "../magicui/shine-border";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export function IconCloudDemo({ content, langState }) {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className={`relative flex flex-col ${
        langState === "en" ? "sm:flex-row-reverse" : "sm:flex-row"
      } gap-14 size-full w-full items-center justify-center overflow-hidden`}
    >
      <div
        data-aos="zoom-out"
        className="glass px-6 py-10 gap-8 flex flex-col items-center rounded-lg text-white"
      >
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        <h5 className="font-bold text-2xl">{content.title}</h5>
        <p>{content.description}</p>
      </div>
      <IconCloud images={images} />
      <div className="w-full h-52 shrink-0 rounded-[448px] bg-linear-to-r from-cyan-500 to-fuchsia-500  opacity-[0.20] blur-[100px] absolute right-0" />
    </div>
  );
}
