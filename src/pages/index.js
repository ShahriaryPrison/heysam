import { MagicCard } from "@/components/magicui/magic-card";
import { Meteors } from "@/components/magicui/meteors";
import { ShineBorder } from "@/components/magicui/shine-border";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useEffect } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { TextAnimate } from "@/components/magicui/text-animate";
import { AuroraText } from "@/components/magicui/aurora-text";

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
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <section className="flex justify-center items-center w-screen h-screen">
      <Meteors number={30} />
      <motion.div
        className="relative z-10 w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        data-aos="fade-up"
      >
        <div className="glass flex flex-col items-center gap-8 p-10 rounded-2xl backdrop-blur-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/10 shadow-xl">
          <motion.h3
            className="text-3xl text-center font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4"
            variants={itemVariants}
          >
            <AuroraText>Select Your Language</AuroraText>
          </motion.h3>

          <motion.div
            className="flex gap-4 justify-center"
            variants={itemVariants}
          >
            {/* <Link
              href="/en"
              as={"button"}
              className="member-animation px-6 py-2.5 rounded-lg button-gradient text-white font-medium hover:shadow-lg transition-all duration-300 hover:shadow-purple-500/30"
            >
              English
            </Link>

            <Link
              href="/fa"
              as={"button"}
              className="member-animation px-6 py-2.5 rounded-lg button-gradient text-white font-medium hover:shadow-lg transition-all duration-300 hover:shadow-purple-500/30"
            >
              فارسی
            </Link> */}
            <Link
              href="/en"
              as={"button"}
              className="member-animation flex justify-center items-center glass px-6 py-2.5 text-white rounded-lg font-bold"
            >
              English
            </Link>

            <Link
              href="/fa"
              as={"button"}
              className="member-animation flex justify-center items-center glass px-6 py-2.5 text-white rounded-lg font-bold"
            >
              فارسی
            </Link>
          </motion.div>
          <BorderBeam duration={8} size={100} />
        </div>
      </motion.div>
    </section>
  );
}
