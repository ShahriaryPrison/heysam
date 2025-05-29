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
export default function ProjectPage({
  langData = {},
  project = {},
  projects = [],
}) {
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

  return (
    <section
      className={`flex flex-col items-center gap-8 w-full min-h-screen`}
      style={{ direction }}
    >
      <Header content={langData?.header || {}} langState={lang} />

      <div className="w-full max-w-6xl px-4 flex flex-col lg:flex-row justify-center gap-8">
        <div className="flex-1 w-full lg:max-w-2xl">
          {/* Project Title */}
          <h1
            className="text-2xl md:text-3xl font-bold text-white"
            data-aos="fade-up"
          >
            {projectTitle}
          </h1>

          {/* Project Technology */}
          <p
            className="text-base md:text-lg text-gray-400 mt-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {projectTech}
          </p>

          {/* Project Description */}
          <div className="mt-4 md:mt-6" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-lg md:text-xl text-white font-semibold mb-2">
              {isRTL ? "توضیحات" : "Description"}
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              {projectDescription}
            </p>
          </div>

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
                  console.log(media);

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
                              className="w-full max-w-56 md:max-w-72 max-h-48 md:max-h-64"
                            />
                          )}
                        </div>
                      </PhotoView>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </PhotoProvider>

            {/* استایل سفارشی */}
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

          {/* Project Features */}
          {project?.features?.length > 0 && (
            <div
              className="mt-6 md:mt-8"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <h2 className="text-lg md:text-xl text-white font-semibold mb-3">
                {isRTL ? "ویژگی‌ها" : "Features"}
              </h2>
              <ul
                className={`space-y-2 text-gray-400 text-sm md:text-base ${
                  isRTL ? "pr-5" : "pl-5"
                }`}
              >
                {project.features.map((feature, index) => (
                  <li key={index} className={isRTL ? "list-rtl" : "list-disc"}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Project Link */}
          <div className="mt-4">
            {project?.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg button-gradient text-sm md:text-base"
                data-aos="fade-up"
                data-aos-delay="250"
              >
                {isRTL ? "مشاهده پروژه" : "View Project"}
              </a>
            )}
          </div>
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
                    <motion.div
                      className="text-xs md:text-sm text-gray-400"
                      whileHover={{ x: 5 }}
                    >
                      {proj.tech}
                    </motion.div>
                  </div>

                  <motion.div
                    className="overflow-hidden rounded-lg max-w-16 md:max-w-24"
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
    fallback: "blocking", // Better for SEO than false
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
