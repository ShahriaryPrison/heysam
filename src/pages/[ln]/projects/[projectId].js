import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import fs from "fs";
import path from "path";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "react-photo-view/dist/react-photo-view.css";
import { ShineBorder } from "@/components/magicui/shine-border";
import Link from "next/link";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";
import { Safari } from "@/components/magicui/safari";
import { motion } from "framer-motion";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import simplifiedSkills from "@/data/skillData";
import { BorderBeam } from "@/components/magicui/border-beam";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 },
  },
};

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.4, type: "spring" },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.3 },
  },
};

const statusColors = {
  production: "bg-green-500/20 text-green-400 border-green-500",
  local: "bg-blue-500/20 text-blue-400 border-blue-500",
  test: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
  staging: "bg-purple-500/20 text-purple-400 border-purple-500",
};

const typeColors = {
  public: "bg-emerald-500/20 text-emerald-400 border-emerald-500",
  private: "bg-rose-500/20 text-rose-400 border-rose-500",
};

export default function ProjectPage({
  langData = {},
  project = {},
  projects = [],
}) {
  console.log(project);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  // Safe defaults
  const lang = langData?.lang || "en";
  const isRTL = lang === "fa";
  const direction = isRTL ? "rtl" : "ltr";

  // Project content with fallbacks
  const projectTitle = project?.title || (isRTL ? "پروژه" : "Project");
  const projectTech = project?.tech || (isRTL ? "وب اپ" : "Web App");
  const projectDescription =
    project?.description ||
    (isRTL
      ? "توضیحات پروژه در دسترس نیست"
      : "Project description not available");
  const projectImages = project?.images || [];
  const projectStatus = project?.status || "Production";
  const projectType = project?.type || "Public";
  const techStack = project?.tech_stack || [];

  return (
    <section
      className={`flex flex-col items-center gap-8 w-full min-h-screen`}
      style={{ direction }}
    >
      <Header content={langData?.header || {}} langState={lang} />

      <div className="w-full max-w-6xl px-4 flex flex-col lg:flex-row justify-center gap-8">
        <div className="flex-1 w-full lg:max-w-2xl">
          {/* Project Title and Metadata */}
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center gap-2">
              <h1
                className="text-2xl md:text-3xl font-bold text-white"
                data-aos="fade-up"
              >
                {projectTitle}
              </h1>

              {/* Project Link - Conditionally rendered based on type */}
              {projectType === "Public" && project?.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg button-gradient text-sm md:text-base"
                  data-aos="fade-up"
                  data-aos-delay="250"
                >
                  {isRTL ? "مشاهده پروژه" : "View Project"}
                </a>
              )}
            </div>

            {/* Status and Type Badges */}
            <div
              className="flex flex-wrap gap-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <Badge className={`${statusColors[projectStatus]} border`}>
                {projectStatus === "Production"
                  ? isRTL
                    ? "تولید"
                    : "Production"
                  : projectStatus === "Local"
                  ? isRTL
                    ? "محلی"
                    : "Local"
                  : isRTL
                  ? "تست"
                  : "Test"}
              </Badge>

              <Badge className={`${typeColors[projectType]} border`}>
                {projectType === "Public"
                  ? isRTL
                    ? "عمومی"
                    : "Public"
                  : isRTL
                  ? "خصوصی"
                  : "Private"}
              </Badge>

              <Badge className="bg-gray-500/20 text-gray-400 border-gray-500">
                {projectTech}
              </Badge>
            </div>
          </div>

          {/* Project Description */}
          <div className="mt-4 md:mt-6" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-lg md:text-xl text-white font-semibold mb-2">
              {isRTL ? "توضیحات" : "Description"}
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              {projectDescription}
            </p>
          </div>

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="mt-6" data-aos="fade-up" data-aos-delay="250">
              <h2 className="text-lg md:text-xl text-white font-semibold mb-4">
                {isRTL ? "تکنولوژی‌های استفاده شده" : "Tech Stack"}
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {techStack.map((tech, index) => {
                  // پیدا کردن آیکون مربوطه از داده‌های skills
                  const skillData = simplifiedSkills.find(
                    (skill) => skill.alt.toLowerCase() === tech.toLowerCase()
                  ) || {
                    src: {
                      src: `https://cdn.simpleicons.org/${tech.toLowerCase()}`,
                    },
                  };

                  return (
                    <motion.div
                      key={index}
                      className="group relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="glass bg-gray-800/50 hover:bg-gray-700/60 rounded-xl p-3 flex flex-col items-center justify-center h-full transition-all duration-300 cursor-default">
                        <div className="relative w-10 h-10 mb-2 group-hover:scale-110 transition-transform">
                          <img
                            src={skillData.src}
                            alt={tech}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-white text-xs sm:text-sm text-center font-medium">
                          {tech}
                        </span>
                        <BorderBeam duration={8} size={100} />
                      </div>

                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                        {skillData.description?.[lang] || tech}
                        <div className="absolute top-full left-1/2 w-0 h-0 border-l-4 border-r-4 border-b-0 border-t-4 border-gray-800 border-x-transparent transform -translate-x-1/2"></div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Project Gallery */}
          <div
            className="relative glass h-fit p-2 md:p-4 rounded-xl shadow-lg mt-6 md:mt-8"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

            <PhotoProvider>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="media-swiper rounded-xl overflow-hidden shadow-lg"
              >
                {projectImages.map((media, index) => {
                  const srcPath = media.src.src || media.src;

                  return (
                    <SwiperSlide key={index}>
                      <PhotoView src={srcPath}>
                        <div className="relative aspect-video bg-transparent dark:bg-gray-800 flex items-center justify-center cursor-pointer">
                          {srcPath.endsWith(".mp4") ? (
                            media.size === "mobile" ? (
                              <Iphone15Pro
                                videoSrc={srcPath}
                                className="w-full max-w-32 md:max-w-40 max-h-64 md:max-h-80"
                              />
                            ) : (
                              <Safari
                                videoSrc={srcPath}
                                className="w-full max-w-56 md:max-w-72 max-h-48 md:max-h-64"
                              />
                            )
                          ) : media.size === "mobile" ? (
                            <Iphone15Pro
                              src={srcPath}
                              className="w-full max-w-32 md:max-w-40 max-h-64 md:max-h-80"
                            />
                          ) : (
                            <Safari
                              imageSrc={srcPath}
                              className="w-full max-w-56 md:max-w-xl max-h-48 md:max-h-64"
                            />
                          )}
                        </div>
                      </PhotoView>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </PhotoProvider>

            <style jsx global>{`
              .media-swiper {
                --swiper-navigation-color: #3081ed;
                --swiper-pagination-color: #3081ed;
                --swiper-pagination-bullet-size: 8px;
                --swiper-pagination-bullet-horizontal-gap: 4px;
              }

              .media-swiper .swiper-button-next:after,
              .media-swiper .swiper-button-prev:after {
                font-size: 1.2rem;
                font-weight: bold;
              }

              @media (min-width: 768px) {
                .media-swiper {
                  --swiper-pagination-bullet-size: 10px;
                  --swiper-pagination-bullet-horizontal-gap: 6px;
                }

                .media-swiper .swiper-button-next:after,
                .media-swiper .swiper-button-prev:after {
                  font-size: 1.5rem;
                }
              }

              .media-swiper .swiper-pagination-bullet {
                opacity: 0.6;
                background: black;
              }

              .media-swiper .swiper-pagination-bullet-active {
                opacity: 1;
                background-color: #3081ed;
                background-image: linear-gradient(
                  to right,
                  #3081ed 0%,
                  #9b51e0 52%
                );
              }
            `}</style>
          </div>

          {project?.features?.length > 0 && (
            <div
              className="mt-6 md:mt-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h2 className="text-lg md:text-xl text-white font-semibold mb-4">
                {isRTL ? "ویژگی‌های کلیدی" : "Key Features"}
              </h2>

              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    className={`flex items-start gap-3  ${
                      isRTL ? "pr-6" : "pl-6"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 mt-2 w-2 h-2 rounded-full bg-purple-400" />

                    <motion.p
                      className="text-gray-300 text-sm md:text-base"
                      whileHover={{
                        color: "#ffffff",
                        x: isRTL ? -3 : 3,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {feature}
                    </motion.p>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <motion.div
          className="lg:sticky lg:top-0 flex-1 w-full lg:max-w-md glass rounded-2xl p-4 md:p-6 shadow-lg h-fit mt-8 lg:mt-0"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          data-aos="zoom-in"
        >
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

          <motion.h4
            className="text-xl md:text-2xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            data-aos="fade-up"
          >
            {isRTL ? "پروژه‌های دیگر" : "Other Projects"}
          </motion.h4>

          <motion.ul
            className="space-y-3 md:space-y-4"
            variants={containerVariants}
          >
            {projects?.map((proj) => (
              <motion.li
                key={proj.id}
                className="text-white glass p-3 md:p-4 rounded-2xl"
                variants={itemVariants}
                whileHover="hover"
                data-aos="zoom-out"
              >
                <BorderBeam duration={8} size={100} />

                <Link
                  href={`/${lang}/projects/${proj.id}`}
                  className="flex justify-between items-center w-full"
                >
                  <div>
                    <motion.div
                      className="text-base md:text-lg font-semibold"
                      whileHover={{ x: 5 }}
                    >
                      {proj.title}
                    </motion.div>
                    <motion.div className="flex gap-2 mt-1">
                      <Badge
                        className={`text-xs ${
                          proj.type === "Public"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-rose-500/20 text-rose-400"
                        }`}
                      >
                        {proj.type === "Public"
                          ? isRTL
                            ? "عمومی"
                            : "Public"
                          : isRTL
                          ? "خصوصی"
                          : "Private"}
                      </Badge>
                      <Badge className="text-xs bg-gray-500/20 text-gray-400">
                        {proj.tech}
                      </Badge>
                    </motion.div>
                  </div>

                  <motion.div
                    className="overflow-hidden rounded-lg max-w-12 md:max-w-16"
                    variants={imageVariants}
                    whileHover="hover"
                  >
                    <motion.img
                      src={proj?.icon?.src}
                      alt={proj.title}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        <div
          data-aos="fade-left"
          className="hidden md:block w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#18B2DE] opacity-[0.34]! blur-[100px] absolute -bottom-40 right-20"
        />
        <div
          data-aos="fade-right"
          className="hidden md:block w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#FB37FF] opacity-[0.34]! blur-[100px] absolute top-[50px] left-[50px]"
        />
      </div>

      <Footer content={langData?.footer || {}} langState={lang} />
      <BackToTopButton />
    </section>
  );
}

export async function getStaticPaths() {
  const languages = ["en", "fa"];
  const paths = [];

  for (const lang of languages) {
    try {
      const projectsDir = path.join(
        process.cwd(),
        "src",
        "data",
        "projects",
        lang
      );

      if (!fs.existsSync(projectsDir)) continue;

      const projectFiles = fs
        .readdirSync(projectsDir)
        .filter((file) => file.endsWith(".js"));

      projectFiles.forEach((file) => {
        const projectId = path.basename(file, ".js");
        paths.push({
          params: {
            ln: lang,
            projectId,
          },
        });
      });
    } catch (err) {
      console.error(`Error generating paths for ${lang}:`, err);
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params: { ln, projectId } }) {
  const projecsstId = projectId;

  try {
    const langModule = await import(`@/data/languages/${ln}.js`);
    const langData = langModule?.default || {};

    const projectModule = await import(`@/data/projects/${ln}/${projectId}.js`);
    let project = projectModule?.default || {};

    project = {
      id: projectId,
      title: project.title || "",
      tech: project.tech || "",
      description: project.description || "",
      images: project.images || [],
      features: project.features || [],
      status: project.status || "Production",
      type: project.type || "Public",
      tech_stack: project.tech_stack || [],
      ...project,
    };

    const projectsDir = path.join(process.cwd(), "src", "data", "projects", ln);
    const allProjectFiles = fs
      .readdirSync(projectsDir)
      .filter((file) => file.endsWith(".js") && file !== `${projectId}.js`);

    const otherProjects = await Promise.all(
      allProjectFiles.map(async (file) => {
        const otherModule = await import(`@/data/projects/${ln}/${file}`);
        const id = path.basename(file, ".js");
        return {
          id,
          title: otherModule.default?.title || "",
          tech:
            otherModule.default?.tech || (ln === "fa" ? "وب اپ" : "Web App"),
          type: otherModule.default?.type || "public",
          status: otherModule.default?.status || "production",
          images: otherModule.default?.images || [],
          icon: otherModule.default?.icon || {
            src: "/images/default-icon.png",
          },
        };
      })
    );

    return {
      props: {
        langData: {
          lang: ln,
          ...langData,
        },
        project,
        projects: otherProjects,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error(`❌ Error loading data for ${ln}/${projectId}:`, error);

    return {
      notFound: true,
    };
  }
}
