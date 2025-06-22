import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import {
  FigmaLogoIcon,
  CodeIcon,
  GlobeIcon,
  GearIcon,
  MagnifyingGlassIcon,
  CubeIcon,
} from "@radix-ui/react-icons";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { AuroraText } from "../magicui/aurora-text";
import {
  GitCommitIcon,
  HammerIcon,
  RocketIcon,
  TestTubeIcon,
} from "lucide-react";

export default function Services({ projects, langState }) {
  console.log(langState);

  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [isMobile, setIsMobile] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleCardClick = (index) => {
    if (isMobile) {
      setActiveCard(activeCard === index ? null : index);
    }
  };

  // Define content for both English and Persian
  const content = {
    en: {
      uiUx: {
        name: "UI/UX Design",
        description: "Crafting intuitive and engaging user experiences.",
        cta: "Learn more",
      },
      frontend: {
        name: "Frontend Development",
        description: "Building responsive and dynamic web applications.",
        cta: "Learn more",
      },
      backend: {
        name: "Backend Development",
        description: "Creating robust server-side solutions and APIs.",
        cta: "Learn more",
      },
      devops: {
        name: "DevOps",
        description: "Streamlining development and operations for efficiency.",
        cta: "Learn more",
      },
      seo: {
        name: "SEO Optimization",
        description:
          "Enhancing visibility and searchability of web applications.",
        cta: "Learn more",
      },
    },
    fa: {
      uiUx: {
        name: "طراحی UI/UX",
        description: "ایجاد تجربه‌های کاربری بصری و جذاب.",
        cta: "بیشتر بدانید",
      },
      frontend: {
        name: "توسعه فرانت‌اند",
        description: "ساخت اپلیکیشن‌های وب واکنش‌گرا و پویا.",
        cta: "بیشتر بدانید",
      },
      backend: {
        name: "توسعه بک‌اند",
        description: "ایجاد راه‌حل‌های قوی سمت سرور و APIها.",
        cta: "بیشتر بدانید",
      },
      devops: {
        name: "عملیات توسعه (DevOps)",
        description: "بهینه‌سازی توسعه و عملیات برای افزایش کارایی.",
        cta: "بیشتر بدانید",
      },
      seo: {
        name: "بهینه‌سازی سئو",
        description: "افزایش دید و قابلیت جستجوی اپلیکیشن‌های وب.",
        cta: "بیشتر بدانید",
      },
    },
  };

  // Select the current language content based on langState
  const currentContent = langState === "fa" ? content.fa : content.en;

  const features = [
    {
      name: currentContent.uiUx.name,
      description: currentContent.uiUx.description,
      href: `${langState}/#footer`,
      cta: currentContent.uiUx.cta,
      background: (
        <motion.div
          className="absolute inset-0 overflow-hidden grid grid-cols-3 grid-rows-3 gap-2 p-2"
          initial="hidden"
          animate={isMobile && activeCard === 0 ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0.5 },
            visible: { opacity: 1, transition: { duration: 0.8 } },
          }}
        >
          <motion.div
            className="bg-white/20 rounded-lg col-span-2 row-span-1"
            variants={{
              hidden: { x: -20, opacity: 0.7 },
              visible: { x: 0, opacity: 1, transition: { delay: 0.2 } },
            }}
          />
          <motion.div
            className="bg-pink-500/20 rounded-lg"
            variants={{
              hidden: { y: -20, opacity: 0.7 },
              visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
            }}
          />
          <motion.div
            className="bg-purple-500/20 rounded-lg"
            variants={{
              hidden: { y: -20, opacity: 0.7 },
              visible: { y: 0, opacity: 1, transition: { delay: 0.4 } },
            }}
          />
          <motion.div
            className="bg-white/30 rounded-lg col-span-1 row-span-2"
            variants={{
              hidden: { x: -20, opacity: 0.7 },
              visible: { x: 0, opacity: 1, transition: { delay: 0.5 } },
            }}
          />
          <motion.div
            className="bg-blue-500/20 rounded-lg col-span-2"
            variants={{
              hidden: { y: 20, opacity: 0.7 },
              visible: { y: 0, opacity: 1, transition: { delay: 0.6 } },
            }}
          />
          <motion.div
            className="absolute -right-5 -top-5 w-24 h-8 bg-gray-800/80 rounded-full"
            variants={{
              hidden: { scale: 0.8, opacity: 0 },
              visible: {
                scale: 1,
                opacity: 1,
                transition: { delay: 0.7, type: "spring" },
              },
            }}
          />
          <motion.div
            className="absolute right-10 -bottom-5 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg rotate-12"
            variants={{
              hidden: { rotate: 0, scale: 0, opacity: 0 },
              visible: {
                rotate: 12,
                scale: 1,
                opacity: 1,
                transition: { delay: 0.8, type: "spring" },
              },
            }}
          />
        </motion.div>
      ),
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
      Icon: FigmaLogoIcon,
    },
    {
      name: currentContent.frontend.name,
      description: currentContent.frontend.description,
      href: `${langState}/#footer`,
      cta: currentContent.frontend.cta,
      background: (
        <motion.div
          className="absolute inset-0 overflow-hidden p-4"
          initial="hidden"
          animate={isMobile && activeCard === 1 ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0.7 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          <motion.div
            className="relative h-full"
            variants={{
              hidden: { y: 10, opacity: 0.8 },
              visible: { y: 0, opacity: 1, transition: { delay: 0.2 } },
            }}
          >
            <motion.div
              className="absolute left-0 top-0 w-full h-8 bg-gray-800/80 rounded-t-lg flex items-center px-3 space-x-2"
              variants={{
                hidden: { opacity: 0.8 },
                visible: { opacity: 1, transition: { delay: 0.3 } },
              }}
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-red-500"
                variants={{
                  hidden: { scale: 1 },
                  visible: {
                    scale: [1, 1.2, 1],
                    transition: { repeat: Infinity, duration: 2, delay: 0.4 },
                  },
                }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-yellow-500"
                variants={{
                  hidden: { scale: 1 },
                  visible: {
                    scale: [1, 1.2, 1],
                    transition: { repeat: Infinity, duration: 2, delay: 0.6 },
                  },
                }}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-green-500"
                variants={{
                  hidden: { scale: 1 },
                  visible: {
                    scale: [1, 1.2, 1],
                    transition: { repeat: Infinity, duration: 2, delay: 0.8 },
                  },
                }}
              />
            </motion.div>
            <motion.div
              className="absolute left-0 top-8 w-full h-full bg-gray-900/50 rounded-b-lg p-4 font-mono text-xs"
              variants={{
                hidden: { opacity: 0.8 },
                visible: { opacity: 1, transition: { delay: 0.4 } },
              }}
            >
              <div dir="ltr" className="text-left">
                <motion.div
                  className="text-blue-400"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.5 } },
                  }}
                ></motion.div>
                <motion.div
                  className="text-gray-400"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.6 } },
                  }}
                >
                  export default function Counter() {"{"}
                </motion.div>
                <motion.div
                  className="text-blue-400 ml-4"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.7 } },
                  }}
                >
                  const [count, setCount] = useState(0);
                </motion.div>
                <motion.div
                  className="text-gray-400 ml-4"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.8 } },
                  }}
                >
                  return (
                </motion.div>
                <motion.div
                  className="text-yellow-300 ml-8"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.9 } },
                  }}
                >
                  {"<div className='p-4'>"}
                </motion.div>
                <motion.div
                  className="text-yellow-300 ml-12"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 1.0 } },
                  }}
                >
                  {"<button onClick={() => setCount(c => c + 1)}>"}
                </motion.div>
                <motion.div
                  className="text-yellow-300 ml-16"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 1.1 } },
                  }}
                >
                  Clicked {"{count}"} times
                </motion.div>
                <motion.div
                  className="text-yellow-300 ml-12"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 1.2 } },
                  }}
                >
                  {"</button>"}
                </motion.div>
                <motion.div
                  className="text-yellow-300 ml-8"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 1.3 } },
                  }}
                >
                  {"</div>"}
                </motion.div>
                <motion.div
                  className="text-gray-400"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 1.4 } },
                  }}
                >
                  {"}"}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
      Icon: CodeIcon,
    },
    {
      name: currentContent.backend.name,
      description: currentContent.backend.description,
      href: `${langState}/#footer`,
      cta: currentContent.backend.cta,
      background: (
        <motion.div
          className="absolute inset-0 overflow-hidden p-4"
          initial="hidden"
          animate={isMobile && activeCard === 2 ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0.7 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          <motion.div
            className="relative h-full"
            variants={{
              hidden: { scale: 0.95, opacity: 0.8 },
              visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } },
            }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48"
              variants={{
                hidden: { rotate: 0, opacity: 0.8 },
                visible: {
                  rotate: 0,
                  opacity: 1,
                  transition: { delay: 0.3 },
                },
              }}
            >
              <motion.div
                className="absolute left-0 top-0 w-32 h-32 bg-blue-900/30 rounded-lg border border-blue-500/50"
                variants={{
                  hidden: { y: 0, opacity: 0.8 },
                  visible: { y: 0, opacity: 1, transition: { delay: 0.4 } },
                }}
              >
                <div className="absolute left-2 top-2 text-xs text-blue-300">
                  {langState === "fa" ? "کاربران" : "Users"}
                </div>
                <div className="absolute left-2 top-6 w-28 h-px bg-blue-500/30"></div>
                <div className="absolute left-2 top-8 text-[10px] text-blue-400">
                  id: string
                </div>
                <div className="absolute left-2 top-12 text-[10px] text-blue-400">
                  name: string
                </div>
              </motion.div>
              <motion.div
                className="absolute right-0 top-8 w-32 h-32 bg-amber-900/30 rounded-lg border border-amber-500/50"
                variants={{
                  hidden: { y: 0, opacity: 0.8 },
                  visible: { y: 0, opacity: 1, transition: { delay: 0.5 } },
                }}
              >
                <div className="absolute left-2 top-2 text-xs text-amber-300">
                  {langState === "fa" ? "محصولات" : "Products"}
                </div>
                <div className="absolute left-2 top-6 w-28 h-px bg-amber-500/30"></div>
                <div className="absolute left-2 top-8 text-[10px] text-amber-400">
                  id: string
                </div>
                <div className="absolute left-2 top-12 text-[10px] text-amber-400">
                  price: number
                </div>
              </motion.div>
              <motion.div
                className="absolute left-1/2 bottom-0 w-32 h-32 bg-purple-900/30 rounded-lg border border-purple-500/50 -translate-x-1/2"
                variants={{
                  hidden: { y: 0, opacity: 0.8 },
                  visible: { y: 0, opacity: 1, transition: { delay: 0.6 } },
                }}
              >
                <div className="absolute left-2 top-2 text-xs text-purple-300">
                  {langState === "fa" ? "سفارشات" : "Orders"}
                </div>
                <div className="absolute left-2 top-6 w-28 h-px bg-purple-500/30"></div>
                <div className="absolute left-2 top-8 text-[10px] text-purple-400">
                  userId: FK
                </div>
                <div className="absolute left-2 top-12 text-[10px] text-purple-400">
                  productId: FK
                </div>
              </motion.div>
              <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M64,32 L128,64"
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: { delay: 0.7, duration: 0.5 },
                    },
                  }}
                />
                <motion.path
                  d="M64,64 L96,128"
                  stroke="rgba(217, 119, 6, 0.5)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: {
                      pathLength: 1,
                      opacity: 1,
                      transition: { delay: 0.8, duration: 0.5 },
                    },
                  }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
      Icon: GlobeIcon,
    },
    {
      name: currentContent.devops.name,
      description: currentContent.devops.description,
      href: `${langState}/#footer`,
      cta: currentContent.devops.cta,
      background: (
        <motion.div
          className="absolute inset-0 overflow-hidden p-4"
          initial="hidden"
          animate={isMobile && activeCard === 3 ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0.8 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          {/* Pipeline Flow */}
          <motion.div
            className="absolute top-1/4 left-0 right-0"
            variants={{
              hidden: { opacity: 0.8 },
              visible: { opacity: 1 },
            }}
          >
            <div className="flex justify-center items-center">
              {/* Code Commit */}
              <motion.div
                className="relative sm:flex flex-col items-center mx-4 hidden"
                variants={{
                  hidden: { y: 0 },
                  visible: { y: 0 },
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-blue-900/30 rounded-full border-2 border-blue-400/50 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <GitCommitIcon className="text-blue-400 w-8 h-8" />
                </motion.div>
                <motion.div className="mt-2 text-xs text-blue-300 font-mono">
                  {currentContent.devops.commit || "Code Commit"}
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <motion.div
                className="w-16 h-1 bg-blue-500/30 relative"
                variants={{
                  hidden: { opacity: 0.7 },
                  visible: { opacity: 1 },
                }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-4 h-4 -mt-1.5 bg-blue-400 rounded-full"
                  animate={
                    isMobile && activeCard === 3
                      ? {
                          x: [0, 48],
                        }
                      : {}
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Build */}
              <motion.div
                className="relative flex flex-col items-center mx-4"
                variants={{
                  hidden: { y: 0 },
                  visible: { y: 0 },
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-amber-900/30 rounded-full border-2 border-amber-400/50 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <HammerIcon className="text-amber-400 w-8 h-8" />
                </motion.div>
                <motion.div className="mt-2 text-xs text-amber-300 font-mono">
                  {currentContent.devops.build || "Build"}
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <motion.div className="w-16 h-1 bg-amber-500/30 relative">
                <motion.div
                  className="absolute top-0 left-0 w-4 h-4 -mt-1.5 bg-amber-400 rounded-full"
                  animate={
                    isMobile && activeCard === 3
                      ? {
                          x: [0, 48],
                        }
                      : {}
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: 0.5,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Test */}
              <motion.div
                className="relative flex flex-col items-center mx-4"
                variants={{
                  hidden: { y: 0 },
                  visible: { y: 0 },
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-green-900/30 rounded-full border-2 border-green-400/50 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <TestTubeIcon className="text-green-400 w-8 h-8" />
                </motion.div>
                <motion.div className="mt-2 text-xs text-green-300 font-mono">
                  {currentContent.devops.test || "Test"}
                </motion.div>
              </motion.div>

              {/* Arrow */}
              <motion.div className="w-16 h-1 bg-green-500/30 relative">
                <motion.div
                  className="absolute top-0 left-0 w-4 h-4 -mt-1.5 bg-green-400 rounded-full"
                  animate={
                    isMobile && activeCard === 3
                      ? {
                          x: [0, 48],
                        }
                      : {}
                  }
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    delay: 0.8,
                    ease: "linear",
                  }}
                />
              </motion.div>

              {/* Deploy */}
              <motion.div
                className="relative flex flex-col items-center mx-4"
                variants={{
                  hidden: { y: 0 },
                  visible: { y: 0 },
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-purple-900/30 rounded-full border-2 border-purple-400/50 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <RocketIcon className="text-purple-400 w-8 h-8" />
                </motion.div>
                <motion.div className="mt-2 text-xs text-purple-300 font-mono">
                  {currentContent.devops.deploy || "Deploy"}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Cloud Infrastructure */}
          <motion.div
            className="absolute bottom-1/4 left-0 right-0"
            variants={{
              hidden: { opacity: 0.8 },
              visible: { opacity: 1 },
            }}
          >
            <div className="flex justify-center space-x-8">
              {/* Server */}
              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { y: 0 },
                  visible: { y: 0 },
                }}
              >
                <motion.div
                  className="w-20 h-12 bg-gray-800/50 rounded-lg border border-gray-500/30 flex flex-col items-center justify-end pb-1"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-1 bg-gray-500/50 mb-1"></div>
                  <div className="w-14 h-1 bg-gray-500/50 mb-1"></div>
                  <div className="w-12 h-1 bg-gray-500/50"></div>
                </motion.div>
                <motion.div className="mt-2 text-xs text-gray-300 font-mono">
                  {currentContent.devops.server || "Server"}
                </motion.div>
              </motion.div>

              {/* Container */}
              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { y: 0 },
                  visible: { y: 0 },
                }}
              >
                <motion.div
                  className="w-16 h-16 bg-blue-800/30 rounded-lg border-2 border-blue-400/50 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <CubeIcon className="text-blue-400 w-8 h-8" />
                </motion.div>
                <motion.div className="mt-2 text-xs text-blue-300 font-mono">
                  {currentContent.devops.container || "Container"}
                </motion.div>
              </motion.div>

              {/* Kubernetes */}
              <motion.div
                className="flex flex-col items-center"
                variants={{
                  hidden: { y: 0 },
                  visible: { y: 0 },
                }}
              >
                <motion.div
                  className="w-20 h-16 bg-indigo-800/30 rounded-lg border-2 border-indigo-400/50 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="grid grid-cols-2 gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-sm bg-indigo-400/70"
                      ></div>
                    ))}
                  </div>
                </motion.div>
                <motion.div className="mt-2 text-xs text-indigo-300 font-mono">
                  {currentContent.devops.kubernetes || "K8s"}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Monitoring */}
          <motion.div
            className="absolute bottom-8 left-0 right-0"
            variants={{
              hidden: { opacity: 0.8 },
              visible: { opacity: 1 },
            }}
          >
            <div className="flex justify-center">
              <motion.div
                className="w-64 h-12 bg-gray-900/50 rounded-lg border border-gray-500/30 p-2"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center h-full">
                  <div className="w-3 h-3 rounded-full bg-green-400/80 mr-2"></div>
                  <div className="text-xs text-green-300 font-mono flex-1">
                    {currentContent.devops.monitoring || "System: Healthy"}
                  </div>
                  <div className="text-xs text-gray-400 font-mono">100%</div>
                </div>
                <motion.div
                  className="h-1 bg-green-500/50 rounded-full mt-1"
                  initial={{ width: 0 }}
                  animate={
                    isMobile && activeCard === 3 ? { width: "100%" } : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-1",
      Icon: GearIcon,
    },
    {
      name: currentContent.seo.name,
      description: currentContent.seo.description,
      href: `${langState}/#footer`,
      cta: currentContent.seo.cta,
      background: (
        <motion.div
          className="absolute inset-0 overflow-hidden p-4"
          initial="hidden"
          animate={isMobile && activeCard === 4 ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0.7 },
            visible: { opacity: 1, transition: { duration: 0.5 } },
          }}
        >
          <motion.div
            className="relative h-full"
            variants={{
              hidden: { scale: 0.95, opacity: 0.8 },
              visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } },
            }}
          >
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64"
              variants={{
                hidden: { y: 0, opacity: 0.8 },
                visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
              }}
            >
              <motion.div
                className="bg-white/10 rounded-lg p-3 border border-white/10"
                variants={{
                  hidden: { opacity: 0.8 },
                  visible: { opacity: 1, transition: { delay: 0.4 } },
                }}
              >
                <motion.div
                  className="flex justify-between items-center mb-2"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.5 } },
                  }}
                >
                  <span className="text-xs text-white/80">
                    {langState === "fa" ? "ترافیک ارگانیک" : "Organic Traffic"}
                  </span>
                  <span className="text-xs text-green-400">↑ 24%</span>
                </motion.div>
                <motion.div
                  className="h-8 bg-gradient-to-r from-green-900/30 to-green-500/30 rounded-full"
                  variants={{
                    hidden: { scaleX: 0.8 },
                    visible: {
                      scaleX: 1,
                      transition: { delay: 0.6 },
                    },
                  }}
                />

                <motion.div
                  className="flex mt-4 space-x-2"
                  variants={{
                    hidden: { opacity: 0.8 },
                    visible: {
                      opacity: 1,
                      transition: { delay: 0.7 },
                    },
                  }}
                >
                  <motion.div
                    className="flex-1 bg-white/10 rounded p-2"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-xs text-white/60">
                      {langState === "fa" ? "کلمات کلیدی" : "Keywords"}
                    </div>
                    <div className="text-lg text-white">1,248</div>
                  </motion.div>
                  <motion.div
                    className="flex-1 bg-white/10 rounded p-2"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-xs text-white/60">
                      {langState === "fa" ? "موقعیت" : "Position"}
                    </div>
                    <div className="text-lg text-amber-400">3.2</div>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute -right-6 -top-6 w-16 h-16 bg-gradient-to-br from-blue-900/30 to-blue-500/30 rounded-full flex items-center justify-center"
                variants={{
                  hidden: { scale: 0.8, rotate: 0, opacity: 0 },
                  visible: {
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    transition: {
                      delay: 0.8,
                      type: "spring",
                      duration: 1,
                    },
                  },
                }}
                whileHover={{ rotate: 360 }}
              >
                <div className="relative w-8 h-8">
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-400/50"
                    variants={{
                      hidden: { scale: 1, opacity: 0.5 },
                      visible: {
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                        transition: {
                          repeat: Infinity,
                          duration: 2,
                          delay: 1,
                        },
                      },
                    }}
                  />
                  <div className="absolute top-1/2 left-1/2 w-6 h-1 bg-blue-400/50 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-3",
      Icon: MagnifyingGlassIcon,
    },
  ];

  return (
    <motion.div
      key={langState}
      ref={ref}
      className={`w-full max-w-7xl mx-auto px-4 py-12 md:py-16 ${
        langState === "fa" ? "font-iran-sans" : ""
      }`}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        },
      }}
    >
      <div className="w-full text-center sm:text-left max-w-7xl py-10 mx-auto flex flex-col text-white">
        <h4 className="text-white px-4 pt-10 pb-4 w-full font-bold text-5xl">
          <AuroraText>{langState === "fa" ? "خدمات" : "Services"}</AuroraText>
        </h4>
      </div>
      <BentoGrid>
        {features.map((feature, index) => (
          <BentoCard
            key={`${feature.name}-${langState}`}
            name={feature.name}
            description={feature.description}
            href={feature.href}
            cta={feature.cta}
            background={feature.background}
            className={feature.className + " glass"}
            Icon={feature.Icon}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  delay: index * 0.1,
                },
              },
            }}
            onClick={() => handleCardClick(index)}
            whileTap={isMobile ? { scale: 0.98 } : {}}
          />
        ))}
      </BentoGrid>
    </motion.div>
  );
}
