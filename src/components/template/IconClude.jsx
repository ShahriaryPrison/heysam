import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCloud } from "@/components/magicui/icon-cloud";
import AOS from "aos";
import "aos/dist/aos.css";
import simplifiedSkills from "@/data/skillData"; // این ایمپورت باید در فایل اصلی باشد، نه اینجا
import Link from "next/link";
import Image from "next/image"; // Import Next.js Image component for optimized images

// **SkillsModal Component - Nested within IconCloudDemo**
const SkillsModal = ({ simplifiedSkills, onClose, langState }) => {
  useEffect(() => {
    // ذخیره مقدار اولیه
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // محاسبه عرض scrollbar
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    // اعمال تغییرات
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      // بازگردانی مقادیر اولیه
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

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

  const skillCardVariants = {
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
      title: "Expertise & Skills",
      subtitle:
        "Here's a detailed look at the technologies and areas I specialize in.",
      closeButton: "Close",
    },
    fa: {
      title: "تخصص و مهارت‌ها",
      subtitle:
        "در اینجا نگاهی دقیق‌تر به فناوری‌ها و حوزه‌هایی که در آن‌ها تخصص دارم، آورده شده است.",
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
        className="relative z-20 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/20 bg-gradient-to-br from-gray-900/90 to-gray-800/90 shadow-2xl shadow-black/50 backdrop-blur-lg"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {simplifiedSkills.map((skill, index) => (
              <motion.div
                key={skill.alt}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] hover:border-white/20 transition-all duration-300"
                variants={skillCardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 p-4 flex items-start gap-3">
                  {skill.src && (
                    <div className="flex-shrink-0 p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                      <img
                        src={skill.src}
                        alt={skill.alt}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  )}

                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {skill.alt}
                    </h4>
                    {skill.description && (
                      <p className="text-white/60 text-sm mt-1">
                        {langState === "en"
                          ? skill.description.en
                          : skill.description.fa}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
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

// **Main IconCloudDemo Component**
export function IconCloudDemo({ content, langState }) {
  const [mounted, setMounted] = useState(false);
  const [radius, setRadius] = useState(250);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  useEffect(() => {
    setMounted(true);
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const handleResize = () => {
      setRadius(Math.min(300, window.innerWidth / 2.5));
    };

    if (typeof window !== "undefined") {
      handleResize();
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  if (!mounted) {
    return (
      <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center">
          <div className="text-white">Loading skills cloud...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="skills"
      className={`relative flex flex-col ${
        langState === "en" ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center justify-center gap-8 w-full max-w-7xl mx-auto px-2 sm:px-4 py-12 md:py-16`}
    >
      {/* Content Card */}
      <motion.div
        className="relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        data-aos="fade-up"
      >
        <div className="glass-container mx-auto w-fit p-4 sm:p-8 rounded-2xl backdrop-blur-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/10 shadow-xl">
          <motion.h3
            className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 flex"
            variants={itemVariants}
          >
            {content.title}
          </motion.h3>

          <motion.p
            className="text-white/80 mb-6 leading-relaxed flex"
            variants={itemVariants}
          >
            {content.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap sm:flex-nowrap gap-3 sm:gap-4"
            variants={itemVariants}
          >
            <button
              onClick={() => setIsModalOpen(true)} // Button to open the modal
              className="w-full sm:w-fit inline-flex justify-center items-center button-gradient px-4 py-2 text-white rounded-lg font-bold text-sm sm:text-base whitespace-nowrap text-center"
            >
              {content.button}
            </button>

            <Link
              href="#footer"
              className="w-full sm:w-fit inline-flex justify-center items-center glass px-4 py-2 text-white rounded-lg font-bold text-sm sm:text-base whitespace-nowrap text-center"
            >
              {content.secondButton}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Icon Cloud */}
      <motion.div
        className="relative z-10 w-full h-[400px] md:h-[500px] flex items-center justify-center"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <IconCloud
          images={simplifiedSkills}
          className="w-full h-full"
          config={{
            radius: radius,
            speed: 0.5,
            initialAngle: langState === "en" ? 0 : 180,
          }}
        />
        <div className="absolute inset-0 rounded-full pointer-events-none border border-white/10 mix-blend-overlay" />
      </motion.div>

      {/* Skills Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <SkillsModal
            simplifiedSkills={simplifiedSkills}
            onClose={() => setIsModalOpen(false)}
            langState={langState}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
