import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import fs from "fs";
import path from "path";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function ProjectPage({ langData = {}, project = {} }) {
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
      className={`flex flex-col items-center gap-8 pb-8 w-screen px-4`}
      style={{ direction }}
    >
      <Header content={langData?.header || {}} langState={lang} />

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
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
        </div>

        {/* Project Gallery */}
        {projectImages.length > 0 && (
          <div className="text-white" data-aos="fade-up" data-aos-delay="400">
            <h2 className="text-xl font-semibold mb-4">
              {isRTL ? "گالری تصاویر" : "Gallery"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projectImages.length > 0 && (
                <div
                  className="text-white"
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  <PhotoProvider>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectImages.map((media, index) => {
                        return (
                          <PhotoView key={index} src={media}>
                            <div className="rounded-lg overflow-hidden shadow-md cursor-pointer">
                              {media.src.endsWith(".mp4") ? (
                                <video
                                  src={media.src}
                                  className="w-full h-auto object-cover"
                                  controls
                                  muted
                                  playsInline
                                />
                              ) : (
                                <img
                                  src={media.src}
                                  alt={`${projectTitle} - ${index + 1}`}
                                  className="w-full h-auto object-cover"
                                  loading="lazy"
                                />
                              )}
                            </div>
                          </PhotoView>
                        );
                      })}
                    </div>
                  </PhotoProvider>
                </div>
              )}
            </div>
          </div>
        )}
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
      const projectsDir = path.join(process.cwd(), "data", "projects", lang);

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

export async function getStaticProps({ params }) {
  const { ln, projectId } = params;

  try {
    // Dynamically import language data
    const langModule = await import(`@/data/languages/${ln}.js`);
    const langData = langModule?.default || {};

    // Dynamically import project data
    const projectModule = await import(`@/data/projects/${ln}/${projectId}.js`);
    let project = projectModule?.default || {};

    // Ensure project has required fields
    project = {
      id: projectId,
      title: project.title || "",
      tech: project.tech || (ln === "fa" ? "وب اپ" : "Web App"),
      description: project.description || "",
      images: project.images || [],
      features: project.features || [],
      ...project,
    };

    return {
      props: {
        langData: {
          lang: ln,
          ...langData,
        },
        project,
      },
      revalidate: 60, // ISR: Regenerate page every 60 seconds
    };
  } catch (error) {
    console.error(`Error loading data for ${ln}/${projectId}:`, error);

    return {
      notFound: true, // This will show the 404 page
      // Alternatively, you can return default props:
      // props: {
      //   langData: { lang: ln },
      //   project: { id: projectId }
      // }
    };
  }
}
