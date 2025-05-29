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

export default function ProjectPage({
  langData = {},
  project = {},
  projects = [],
}) {
  console.log("Project Data:", projects);
  
  
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
      className={`flex flex-col items-center gap-8 w-screen`}
      style={{ direction }}
    >
      <Header content={langData?.header || {}} langState={lang} />

      <div className="w-full max-w-6xl flex justify-center gap-8">
        <div className="flex-1 max-w-2xl">
          {/* Project Title */}
          <h1 className="text-3xl font-bold text-white" data-aos="fade-up">
            {projectTitle}
          </h1>

          {/* Project Technology */}
          <p
            className="text-lg text-gray-400 mt-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {projectTech}
          </p>

          {/* Project Description */}
          <div className="mt-6" data-aos="fade-up" data-aos-delay="200">
            <h2 className="text-xl text-white font-semibold mb-2">
              {isRTL ? "توضیحات" : "Description"}
            </h2>
            <p className="text-gray-400 leading-relaxed">
              {projectDescription}
            </p>
          </div>

          {/* Project Gallery */}
          <div className="relative glass h-fit p-4 rounded-xl shadow-lg mt-8">
            <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

            <PhotoProvider>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="media-swiper rounded-xl overflow-hidden shadow-lg"
              >
                {projectImages.map((media, index) => {
                  const srcPath = media.src || media;
                  return (
                    <SwiperSlide key={index}>
                      <PhotoView src={srcPath}>
                        <div className="relative aspect-video bg-transparent dark:bg-gray-800 flex items-center justify-center cursor-pointer">
                          {srcPath.endsWith(".mp4") ? (
                            <video
                              src={srcPath}
                              className="w-full h-full object-contain"
                              controls
                              muted
                              playsInline
                            />
                          ) : (
                            <img
                              src={srcPath}
                              alt={`${projectTitle} - ${index + 1}`}
                              className="w-full h-full object-contain"
                              loading="lazy"
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
                --swiper-pagination-bullet-size: 10px;
                --swiper-pagination-bullet-horizontal-gap: 6px;
              }

              .media-swiper .swiper-button-next:after,
              .media-swiper .swiper-button-prev:after {
                font-size: 1.5rem;
                font-weight: bold;
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
            <div className="mt-8" data-aos="fade-up" data-aos-delay="300">
              <h2 className="text-xl text-white font-semibold mb-3">
                {isRTL ? "ویژگی‌ها" : "Features"}
              </h2>
              <ul
                className={`space-y-2 text-gray-400 ${isRTL ? "pr-5" : "pl-5"}`}
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
                className="mt-4 inline-block text-white px-4 py-2 rounded-lg button-gradient"
                data-aos="fade-up"
                data-aos-delay="250"
              >
                {isRTL ? "مشاهده پروژه" : "View Project"}
              </a>
            )}
          </div>
        </div>

        <div className="sticky top-0 flex-1 max-w-md glass rounded-2xl p-6 shadow-lg h-fit">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
          <h4 className="text-2xl font-bold text-white mb-4" data-aos="fade-up">
            {isRTL ? "پروژه‌های دیگر" : "Other Projects"}
          </h4>
          <ul className="space-y-4">
            {projects?.map((proj) => (
              <li
                data-aos="zoom-out"
                key={proj.id}
                className="text-white border-b border-neutral-500 pb-4"
              >
                <Link
                  href={`/${lang}/projects/${proj.id}`}
                  className="hover:underline flex justify-between items-center w-full"
                >
                  <div>
                    <div className="text-lg font-semibold">{proj.title}</div>
                    <div className="text-sm text-gray-400">{proj.tech}</div>
                  </div>

                  <div className="overflow-hidden rounded-lg max-w-24">
                    <img
                      src={proj?.icon?.src}
                      alt={proj.title}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          data-aos="fade-left"
          className="w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#18B2DE] opacity-[0.34]! blur-[100px] absolute -bottom-40 right-20"
        />
        <div
          data-aos="fade-right"
          className="w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#FB37FF] opacity-[0.34]! blur-[100px] absolute top-[50px] left-[50px]"
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
          icon: otherModule.default?.icon || { src: "/images/default-icon.png" },
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
