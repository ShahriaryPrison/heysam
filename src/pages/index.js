import { MagicCard } from "@/components/magicui/magic-card";
import { Meteors } from "@/components/magicui/meteors";
import { motion, useMotionValue, animate } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedCircularProgressBar } from "@/components/magicui/animated-circular-progress-bar";
import { useRouter } from "next/router";

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
  const [isLoading, setIsLoading] = useState(false);
  const [progressText, setProgressText] = useState("0%");
  const router = useRouter();
  const progressValue = useMotionValue(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const handleRouteChange = (url) => {
      setIsLoading(true);
      setProgressText("0%");

      const animation = animate(progressValue, 100, {
        duration: 2.5,
        ease: "easeInOut",
        onUpdate: (latest) => {
          setProgressText(`${Math.round(latest)}%`);
        },
      });

      return () => animation.stop();
    };

    const handleRouteComplete = () => {
      setTimeout(() => {
        setIsLoading(false);
        progressValue.set(0);
      }, 300);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeError", handleRouteComplete);
    };
  }, [router]);

  return (
    <section className="flex justify-center items-center w-screen h-dvh relative">
      {/* لودینگ اورلی */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <AnimatedCircularProgressBar
                max={100}
                min={0}
                value={progressValue.get()}
                gaugePrimaryColor="rgb(124 58 237)"
                gaugeSecondaryColor="rgba(255, 255, 255, 0.1)"
                size={140}
                strokeWidth={12}
              />
            </div>
            <motion.p
              className="text-purple-300 font-medium text-lg"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.2,
              }}
            >
              Loading page...
            </motion.p>
          </div>
        </div>
      )}

      {/* محتوای اصلی */}
      <Meteors number={30} />
      <motion.div
        className="relative z-10 w-full max-w-md px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        data-aos="fade-up"
      >
        <div className="glass flex flex-col items-center gap-8 py-10 px-4 sm:p-10 rounded-2xl backdrop-blur-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/10 shadow-xl">
          <motion.h3
            className="text-xl sm:text-3xl text-center font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4"
            variants={itemVariants}
          >
            <AuroraText>Select Your Language</AuroraText>
          </motion.h3>

          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            variants={itemVariants}
          >
            <Link
              href="/en"
              className="member-animation flex justify-center items-center glass px-4 py-2 sm:px-6 sm:py-2.5 text-white rounded-lg text-xs sm:text-base font-bold hover:bg-purple-500/20 transition-all"
              onClick={() => setIsLoading(true)}
            >
              English
            </Link>

            <Link
              href="/fa"
              className="member-animation flex justify-center items-center glass px-4 py-2 sm:px-6 sm:py-2.5 text-white rounded-lg text-xs sm:text-base font-bold hover:bg-purple-500/20 transition-all"
              onClick={() => setIsLoading(true)}
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
