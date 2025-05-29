import Image from "next/image";
import Link from "next/link";
import AboutUsImage from "../../../public/images/heysam-logo.png";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Hero({ content, langState }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  // Variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="#about_us"
      className="w-full max-w-7xl mx-auto flex flex-col items-center lg:flex-row lg:justify-center lg:items-center gap-10 px-8 lg:px-16"
    >
      <motion.div
        className="text-center lg:text-left w-full flex flex-col items-center lg:items-start gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        data-aos="fade-right"
      >
        <motion.h2
          className={`max-w-lg text-xl md:text-2xl lg:text-4xl font-bold text-white ${
            langState === "en" ? "font-[Poppins] text-left" : "text-right"
          }`}
          variants={itemVariants}
          data-aos="fade-up"
        >
          {langState === "fa" ? (
            <div className="leading-relaxed">
              <span className="md:text-2xl lg:text-4xl">
                {" "}
                {content.header.first}{" "}
              </span>
              <TypeAnimation
                sequence={[
                  `${content.header.mid[0]}`,
                  1000,
                  `${content.header.mid[1]}`,
                  1000,
                  `${content.header.mid[2]}`,
                  1000,
                ]}
                wrapper="span"
                speed={10}
                deletionSpeed={10}
                style={{ fontSize: "1em", display: "inline-block" }}
                repeat={Infinity}
                cursor={true}
                className="text-gradient font-black"
              />
              <span className="md:text-2xl lg:text-4xl ">
                {content.header.last}
              </span>
            </div>
          ) : (
            content.header
          )}
        </motion.h2>

        <motion.p
          className={`max-w-lg text-[#E2E2E2] font-medium ${
            langState === "fa" ? "text-base text-right" : "text-left"
          }`}
          variants={itemVariants}
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {content.body}
        </motion.p>

        <motion.div
          className="flex gap-4"
          variants={itemVariants}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Link
            href="#projects"
            className="flex justify-center items-center button-gradient px-4 py-2 text-white rounded-lg font-bold"
          >
            {content.button}
          </Link>
          <Link
            href="#footer"
            className="flex justify-center items-center glass px-4 py-1 text-white rounded-lg font-bold"
          >
            {content.secondButton}
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="glass text-lg lg:text-xl about-us-animation relative p-5 rounded-3xl w-full max-w-sm flex flex-col justify-start items-center gap-8"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <Image
          src={AboutUsImage}
          className="w-full h-fit"
          width="1000"
          height="1000"
          alt="Logo"
          priority
        />
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <div
            className={`text-white flex ${
              langState === "fa" && "flex-row-reverse"
            } justify-between items-center`}
          >
            <h4>Software</h4>
            <h4>Development</h4>
          </div>
          <div className="w-full bg-white h-0.5 bg-opacity-70 rounded-full" />
          <div
            className={`text-[#D7D7D7] flex ${
              langState === "fa" && "flex-row-reverse"
            } justify-between items-center`}
          >
            <h4>created at</h4>
            <h4>12/23/2023</h4>
          </div>
        </div>
        <div className="w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#18B2DE] opacity-[0.34] blur-[100px] absolute bottom-[-100px] right-[-150px]" />
        <div className="w-[248px] h-[248px] shrink-0 rounded-[448px] bg-[#FB37FF] opacity-[0.34] blur-[100px] absolute top-[-100px] left-[-100px]" />
      </motion.div>
    </section>
  );
}

export default Hero;
