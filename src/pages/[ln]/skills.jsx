// pages/[ln]/skills.jsx
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import Header from "@/components/template/Header";
import Footer from "@/components/template/Footer";
import BackToTopButton from "@/components/template/BackToTopButton";
import simplifiedSkills from "@/data/skillData";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const SkillCard = ({ skill, index, langState }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const variants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          delay: isMobile ? 0 : index * 0.05,
          duration: isMobile ? 0.3 : 0.5,
          ease: [0.22, 1, 0.36, 1],
        },
      },
      hover: {
        y: -5,
        transition: { duration: 0.2 },
      },
    }),
    [index, isMobile]
  );

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] hover:border-white/20 transition-all duration-300"
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={!isMobile ? "hover" : {}}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 p-4 flex items-start gap-3">
        {skill.src && (
          <div className="flex-shrink-0 p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
            <img
              src={skill.src}
              alt={skill.alt}
              className="w-6 h-6 object-contain"
              loading="lazy"
            />
          </div>
        )}

        <div>
          <h4 className="font-semibold text-white text-lg">{skill.alt}</h4>
          {skill.description && (
            <p className="text-white/60 text-sm mt-1">
              {langState === "en" ? skill.description.en : skill.description.fa}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SkillsPage = ({ content }) => {
  const router = useRouter();
  const { ln } = router.query;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const pageContent = useMemo(() => {
    return {
      en: {
        title: "Expertise & Skills",
        subtitle:
          "Here's a detailed look at the technologies and areas I specialize in.",
        backButton: "Back to Home",
        categories: {
          frontend: "Frontend Development",
          backend: "Backend Development",
          devops: "DevOps & Cloud",
          tools: "Tools & Platforms",
        },
      },
      fa: {
        title: "تخصص و مهارت‌ها",
        subtitle:
          "در اینجا نگاهی دقیق‌تر به فناوری‌ها و حوزه‌هایی که در آن‌ها تخصص دارم، آورده شده است.",
        backButton: "بازگشت به صفحه اصلی",
        categories: {
          frontend: "توسعه فرانت‌اند",
          backend: "توسعه بک‌اند",
          devops: "دواپس و ابر",
          tools: "ابزارها و پلتفرم‌ها",
        },
      },
    }[ln];
  }, [ln]);

  // Group skills by category
  const categorizedSkills = useMemo(() => {
    return simplifiedSkills.reduce((acc, skill) => {
      const category = skill.category || "tools";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill);
      return acc;
    }, {});
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: "beforeChildren",
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800"
      style={ln === "fa" ? { direction: "rtl" } : { direction: "ltr" }}
    >
      <Header content={content.header} langState={ln} />

      <motion.main
        className="container mx-auto px-4 sm:px-6 py-12 md:py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <motion.section
          className="mb-16 text-center"
          variants={sectionVariants}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {pageContent.title}
          </motion.h1>
          <motion.p
            className="text-xl text-white/80 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {pageContent.subtitle}
          </motion.p>
        </motion.section>

        {/* Skills Grid */}
        {Object.entries(categorizedSkills).map(([category, skills]) => (
          <motion.section
            key={category}
            className="mb-12"
            variants={sectionVariants}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-white mb-6 flex items-center gap-3"
              initial={{ opacity: 0, x: ln === "fa" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"></span>
              {pageContent.categories[category] || pageContent.categories.tools}
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <SkillCard
                  key={`${category}-${skill.alt}`}
                  skill={skill}
                  index={index}
                  langState={ln}
                />
              ))}
            </div>
          </motion.section>
        ))}

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <Link
            href={`/${ln}`}
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
              className={`h-5 w-5 transition-transform duration-200 group-hover:-translate-x-1 ${
                ln === "fa" ? "ml-2 rotate-180" : "mr-2"
              }`}
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            {pageContent.backButton}
          </Link>
        </motion.div>
      </motion.main>

      <Footer content={content.footer} langState={ln} />
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

  return {
    props: {
      content: langData,
    },
  };
}

export default SkillsPage;
