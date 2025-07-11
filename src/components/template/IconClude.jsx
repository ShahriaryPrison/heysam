// components/template/IconCloud.jsx
import { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import { IconCloud } from "@/components/magicui/icon-cloud";
import AOS from "aos";
import "aos/dist/aos.css";
import simplifiedSkills from "@/data/skillData";
import Link from "next/link";

const IconCloudDemo = ({ content, langState }) => {
  const [mounted, setMounted] = useState(false);
  const [radius, setRadius] = useState(250);

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
            <Link
              href={`/${langState}/skills`}
              className="w-full sm:w-fit inline-flex justify-center items-center button-gradient px-4 py-2 text-white rounded-lg font-bold text-sm sm:text-base whitespace-nowrap text-center"
            >
              {content.button}
            </Link>

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
    </div>
  );
};

export default memo(IconCloudDemo);
