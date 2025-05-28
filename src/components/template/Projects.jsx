import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { ShineBorder } from "../magicui/shine-border";
import simplifiedSkills from "@/data/skillData";

const someSkills = simplifiedSkills.slice(0, 6); // Adjust the number of skills to show

const ReviewCard = ({ icon, title, tech, description, langState }) => {
  return (
    <figure
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
          {/* <img
            className="rounded-full"
            width="32"
            height="32"
            alt=""
            src={icon.src}
          /> */}
          <div className="flex flex-col gap-2">
            <figcaption className="text-sm font-medium dark:text-white">
              {title}
            </figcaption>
            {/* <p className="text-xs font-medium dark:text-white/40">{tech}</p> */}
            <div className="flex items-center gap-1 overflow-hidden">
              {someSkills.map((skill) => (
                <img src={skill.src} className="w-4 h-4" />
              ))}
            </div>
          </div>
        </div>
        <a
          href={`/${langState}/projects/${title}`}
          className="button-gradient px-2 py-1 rounded-2xl text-xs"
        >
          {langState === "fa" ? "جزئیات" : "details"}
        </a>
      </div>
      <div className="w-full h-[0.5px] bg-gray-400 opacity-70 rounded-lg mt-4" />
      <blockquote className="mt-2 text-sm line-clamp-2">
        {description}
      </blockquote>
    </figure>
  );
};

export default function Projects({ projects, langState }) {
  return (
    <div className="relative py-20 flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {projects.map((project) => (
          <ReviewCard key={project.title} langState={langState} {...project} />
        ))}
      </Marquee>

      {/* سمت چپ - محو شدن به سمت راست + بلر */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/4 
               backdrop-blur-[2px] 
               [mask-image:linear-gradient(to_left,transparent,white)]"
      ></div>

      {/* سمت راست - محو شدن به سمت چپ + بلر */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/4 
               backdrop-blur-[2px] 
               [mask-image:linear-gradient(to_right,transparent,white)]"
      ></div>
    </div>
  );
}
