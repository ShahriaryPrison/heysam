import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import {
  FigmaLogoIcon,
  CodeIcon,
  GlobeIcon,
  GearIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Services({ projects, langState }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const [isMobile, setIsMobile] = useState(false);

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

  const features = useMemo(() => {
    const currentContent = langState === "fa" ? content.fa : content.en;

    return [
      {
        name: currentContent.uiUx.name,
        description: currentContent.uiUx.description,
        href: `${langState}/#footer`,
        cta: currentContent.uiUx.cta,
        background: (
          <motion.div
            className="absolute inset-0 overflow-hidden grid grid-cols-3 grid-rows-3 gap-2 p-2"
            initial="hidden"
            animate={isMobile ? "loop" : "hidden"}
            whileHover={!isMobile ? "visible" : ""}
            variants={{
              hidden: { opacity: 0.5 },
              visible: { opacity: 1, transition: { duration: 0.8 } },
              loop: {
                opacity: 1,
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              },
            }}
          >
            <motion.div
              className="bg-white/20 rounded-lg col-span-2 row-span-1"
              variants={{
                hidden: { x: -20, opacity: 0.7 },
                visible: { x: 0, opacity: 1, transition: { delay: 0.2 } },
                loop: {
                  x: [0, -20, 0],
                  opacity: [1, 0.7, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 4,
                    delay: 0.2,
                    ease: "easeInOut",
                  },
                },
              }}
            />
            <motion.div
              className="bg-pink-500/20 rounded-lg"
              variants={{
                hidden: { y: -20, opacity: 0.7 },
                visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
                loop: {
                  y: [0, -20, 0],
                  opacity: [1, 0.7, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 4,
                    delay: 0.3,
                    ease: "easeInOut",
                  },
                },
              }}
            />
            <motion.div
              className="bg-purple-500/20 rounded-lg"
              variants={{
                hidden: { y: -20, opacity: 0.7 },
                visible: { y: 0, opacity: 1, transition: { delay: 0.4 } },
                loop: {
                  y: [0, -20, 0],
                  opacity: [1, 0.7, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 4,
                    delay: 0.4,
                    ease: "easeInOut",
                  },
                },
              }}
            />
            <motion.div
              className="bg-white/30 rounded-lg col-span-1 row-span-2"
              variants={{
                hidden: { x: -20, opacity: 0.7 },
                visible: { x: 0, opacity: 1, transition: { delay: 0.5 } },
                loop: {
                  x: [0, -20, 0],
                  opacity: [1, 0.7, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 4,
                    delay: 0.5,
                    ease: "easeInOut",
                  },
                },
              }}
            />
            <motion.div
              className="bg-blue-500/20 rounded-lg col-span-2"
              variants={{
                hidden: { y: 20, opacity: 0.7 },
                visible: { y: 0, opacity: 1, transition: { delay: 0.6 } },
                loop: {
                  y: [0, 20, 0],
                  opacity: [1, 0.7, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 4,
                    delay: 0.6,
                    ease: "easeInOut",
                  },
                },
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
                loop: {
                  scale: [1, 0.8, 1],
                  opacity: [1, 0.8, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 3,
                    delay: 0.7,
                    ease: "easeInOut",
                  },
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
                loop: {
                  rotate: [12, 0, 12],
                  scale: [1, 0.8, 1],
                  opacity: [1, 0.8, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 3,
                    delay: 0.8,
                    ease: "easeInOut",
                  },
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
            animate={isMobile ? "loop" : "hidden"}
            whileHover={!isMobile ? "visible" : ""}
            variants={{
              hidden: { opacity: 0.7 },
              visible: { opacity: 1, transition: { duration: 0.5 } },
              loop: {
                opacity: 1,
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              },
            }}
          >
            <motion.div
              className="relative h-full"
              variants={{
                hidden: { y: 10, opacity: 0.8 },
                visible: { y: 0, opacity: 1, transition: { delay: 0.2 } },
                loop: {
                  y: [0, 10, 0],
                  opacity: [1, 0.8, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 4,
                    delay: 0.2,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              <motion.div
                className="absolute left-0 top-0 w-full h-8 bg-gray-800/80 rounded-t-lg flex items-center px-3 space-x-2"
                variants={{
                  hidden: { opacity: 0.8 },
                  visible: { opacity: 1, transition: { delay: 0.3 } },
                  loop: {
                    opacity: 1,
                    transition: {
                      repeat: Infinity,
                      duration: 4,
                      delay: 0.3,
                      ease: "easeInOut",
                    },
                  },
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
                    loop: {
                      scale: [1, 1.2, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 2,
                        delay: 0.4,
                        ease: "easeInOut",
                      },
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
                    loop: {
                      scale: [1, 1.2, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 2,
                        delay: 0.6,
                        ease: "easeInOut",
                      },
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
                    loop: {
                      scale: [1, 1.2, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 2,
                        delay: 0.8,
                        ease: "easeInOut",
                      },
                    },
                  }}
                />
              </motion.div>
              <motion.div
                className="absolute left-0 top-8 w-full h-full bg-gray-900/50 rounded-b-lg p-4 font-mono text-xs"
                variants={{
                  hidden: { opacity: 0.8 },
                  visible: { opacity: 1, transition: { delay: 0.4 } },
                  loop: {
                    opacity: 1,
                    transition: {
                      repeat: Infinity,
                      duration: 4,
                      delay: 0.4,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                <motion.div
                  className="text-blue-400"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.5 } },
                    loop: {
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.5,
                        ease: "easeInOut",
                      },
                    },
                  }}
                ></motion.div>
                <motion.div
                  className="text-gray-400"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.6 } },
                    loop: {
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.6,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  export default function Counter() {"{"}
                </motion.div>
                <motion.div
                  className="text-blue-400 ml-4"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.7 } },
                    loop: {
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.7,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  const [count, setCount] = useState(0);
                </motion.div>
                <motion.div
                  className="text-gray-400 ml-4"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.8 } },
                    loop: {
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.8,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  return (
                </motion.div>
                <motion.div
                  className="text-yellow-300 ml-8"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 0.9 } },
                    loop: {
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.9,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  {"<div className='p-4'>"}
                </motion.div>
                <motion.div
                  className="text-yellow-300 ml-12"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 1.0 } },
                    loop: {
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 1.0,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  {"<button onClick={() => setCount(c => c + 1)}>"}
                </motion.div>
                <motion.div
                  className="text-yellow-300 ml-16"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 1.1 } },
                    loop: {
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 1.1,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  Clicked {"{count}"} times
                </motion.div>
                <motion.div
                  className="text-yellow-300 ml-12"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 1.2 } },
                    loop: {
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 1.2,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  {"</button>"}
                </motion.div>
                <motion.div
                  className="text-yellow-300 ml-8"
                  variants={{
                    hidden: { x: 0, opacity: 0.8 },
                    visible: { x: 0, opacity: 1, transition: { delay: 1.3 } },
                    loop: {
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 1.3,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  {"</div>"}
                </motion.div>
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
            animate={isMobile ? "loop" : "hidden"}
            whileHover={!isMobile ? "visible" : ""}
            variants={{
              hidden: { opacity: 0.7 },
              visible: { opacity: 1, transition: { duration: 0.5 } },
              loop: {
                opacity: 1,
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              },
            }}
          >
            <motion.div
              className="relative h-full"
              variants={{
                hidden: { scale: 0.95, opacity: 0.8 },
                visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } },
                loop: {
                  scale: [1, 0.95, 1],
                  opacity: [1, 0.8, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 4,
                    delay: 0.2,
                    ease: "easeInOut",
                  },
                },
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
                  loop: {
                    rotate: [0, 5, 0],
                    opacity: [1, 0.8, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 5,
                      delay: 0.3,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-32 h-32 bg-blue-900/30 rounded-lg border border-blue-500/50"
                  variants={{
                    hidden: { y: 0, opacity: 0.8 },
                    visible: { y: 0, opacity: 1, transition: { delay: 0.4 } },
                    loop: {
                      y: [0, 5, 0],
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.4,
                        ease: "easeInOut",
                      },
                    },
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
                    loop: {
                      y: [0, -5, 0],
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.5,
                        ease: "easeInOut",
                      },
                    },
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
                    loop: {
                      y: [0, 5, 0],
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.6,
                        ease: "easeInOut",
                      },
                    },
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
                      loop: {
                        pathLength: [0, 1, 0],
                        opacity: [0, 1, 0],
                        transition: {
                          repeat: Infinity,
                          duration: 3,
                          delay: 0.7,
                          ease: "linear",
                        },
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
                      loop: {
                        pathLength: [0, 1, 0],
                        opacity: [0, 1, 0],
                        transition: {
                          repeat: Infinity,
                          duration: 3,
                          delay: 0.8,
                          ease: "linear",
                        },
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
            animate={isMobile ? "loop" : "hidden"}
            whileHover={!isMobile ? "visible" : ""}
            variants={{
              hidden: { opacity: 0.7 },
              visible: { opacity: 1, transition: { duration: 0.5 } },
              loop: {
                opacity: 1,
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              },
            }}
          >
            <motion.div
              className="relative h-full"
              variants={{
                hidden: { scale: 0.95, opacity: 0.8 },
                visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } },
                loop: {
                  scale: [1, 0.95, 1],
                  opacity: [1, 0.8, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 4,
                    delay: 0.2,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
                variants={{
                  hidden: { y: 0, opacity: 0.8 },
                  visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
                  loop: {
                    y: [0, -5, 0],
                    opacity: [1, 0.8, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 5,
                      delay: 0.3,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                <motion.div
                  className="flex justify-center space-x-4"
                  variants={{
                    hidden: { opacity: 0.8 },
                    visible: {
                      opacity: 1,
                      transition: { delay: 0.4 },
                    },
                    loop: {
                      opacity: 1,
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.4,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  {[
                    currentContent.devops.step1,
                    currentContent.devops.step2,
                    currentContent.devops.step3,
                    currentContent.devops.step4,
                  ].map((step, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center"
                      variants={{
                        hidden: { y: 0, opacity: 0.8 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: { delay: 0.4 + i * 0.1 },
                        },
                        loop: {
                          y: [0, 5, 0],
                          opacity: [1, 0.8, 1],
                          transition: {
                            repeat: Infinity,
                            duration: 4,
                            delay: 0.4 + i * 0.1,
                            ease: "easeInOut",
                          },
                        },
                      }}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-full bg-green-900/30 border border-green-500/50 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        variants={{
                          hidden: { rotate: 0 },
                          visible: {
                            rotate: 0,
                            transition: { delay: 0.4 + i * 0.1 },
                          },
                          loop: {
                            rotate: [0, 360],
                            transition: {
                              repeat: Infinity,
                              duration: 5,
                              ease: "linear",
                              delay: i * 0.2 + 0.4,
                            },
                          },
                        }}
                      >
                        <motion.div
                          className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center"
                          variants={{
                            hidden: { rotate: 0 },
                            visible: {
                              rotate: [0, 360],
                              transition: {
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.2,
                              },
                            },
                            loop: {
                              rotate: [0, 360],
                              transition: {
                                repeat: Infinity,
                                duration: 5,
                                ease: "linear",
                                delay: i * 0.2,
                              },
                            },
                          }}
                        >
                          <div className="w-4 h-4 rounded-full bg-green-500/50"></div>
                        </motion.div>
                      </motion.div>
                      <div className="mt-2 text-xs text-green-300">{step}</div>
                      {i < 3 && (
                        <div className="h-px w-16 bg-green-500/30 mt-6"></div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  className="flex justify-around mt-12"
                  variants={{
                    hidden: { opacity: 0.8 },
                    visible: {
                      opacity: 1,
                      transition: { delay: 0.8 },
                    },
                    loop: {
                      opacity: 1,
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.8,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  {[
                    currentContent.devops.env1,
                    currentContent.devops.env2,
                    currentContent.devops.env3,
                  ].map((env, i) => (
                    <motion.div
                      key={i}
                      className="flex flex-col items-center"
                      variants={{
                        hidden: { y: 0, opacity: 0.8 },
                        visible: {
                          y: 0,
                          opacity: 1,
                          transition: { delay: 0.8 + i * 0.1 },
                        },
                        loop: {
                          y: [0, -5, 0],
                          opacity: [1, 0.8, 1],
                          transition: {
                            repeat: Infinity,
                            duration: 4,
                            delay: 0.8 + i * 0.1,
                            ease: "easeInOut",
                          },
                        },
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-16 h-16 bg-gray-800/50 rounded-lg border border-gray-500/30 flex flex-col items-center justify-center">
                        <div className="w-10 h-1 bg-gray-500/50 mb-1"></div>
                        <div className="w-8 h-1 bg-gray-500/50 mb-1"></div>
                        <div className="w-6 h-1 bg-gray-500/50"></div>
                      </div>
                      <div className="mt-2 text-xs text-gray-300">{env}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
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
            animate={isMobile ? "loop" : "hidden"}
            whileHover={!isMobile ? "visible" : ""}
            variants={{
              hidden: { opacity: 0.7 },
              visible: { opacity: 1, transition: { duration: 0.5 } },
              loop: {
                opacity: 1,
                transition: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                },
              },
            }}
          >
            <motion.div
              className="relative h-full"
              variants={{
                hidden: { scale: 0.95, opacity: 0.8 },
                visible: { scale: 1, opacity: 1, transition: { delay: 0.2 } },
                loop: {
                  scale: [1, 0.95, 1],
                  opacity: [1, 0.8, 1],
                  transition: {
                    repeat: Infinity,
                    duration: 4,
                    delay: 0.2,
                    ease: "easeInOut",
                  },
                },
              }}
            >
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64"
                variants={{
                  hidden: { y: 0, opacity: 0.8 },
                  visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
                  loop: {
                    y: [0, 5, 0],
                    opacity: [1, 0.8, 1],
                    transition: {
                      repeat: Infinity,
                      duration: 5,
                      delay: 0.3,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                <motion.div
                  className="bg-white/10 rounded-lg p-3 border border-white/10"
                  variants={{
                    hidden: { opacity: 0.8 },
                    visible: { opacity: 1, transition: { delay: 0.4 } },
                    loop: {
                      opacity: 1,
                      transition: {
                        repeat: Infinity,
                        duration: 4,
                        delay: 0.4,
                        ease: "easeInOut",
                      },
                    },
                  }}
                >
                  <motion.div
                    className="flex justify-between items-center mb-2"
                    variants={{
                      hidden: { x: 0, opacity: 0.8 },
                      visible: { x: 0, opacity: 1, transition: { delay: 0.5 } },
                      loop: {
                        x: [0, 5, 0],
                        opacity: [1, 0.8, 1],
                        transition: {
                          repeat: Infinity,
                          duration: 4,
                          delay: 0.5,
                          ease: "easeInOut",
                        },
                      },
                    }}
                  >
                    <span className="text-xs text-white/80">
                      {langState === "fa"
                        ? "ترافیک ارگانیک"
                        : "Organic Traffic"}
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
                      loop: {
                        scaleX: [1, 0.8, 1],
                        transition: {
                          repeat: Infinity,
                          duration: 3,
                          delay: 0.6,
                          ease: "easeInOut",
                        },
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
                      loop: {
                        opacity: 1,
                        transition: {
                          repeat: Infinity,
                          duration: 4,
                          delay: 0.7,
                          ease: "easeInOut",
                        },
                      },
                    }}
                  >
                    <motion.div
                      className="flex-1 bg-white/10 rounded p-2"
                      whileHover={{ y: -5 }}
                      variants={{
                        loop: {
                          y: [0, -5, 0],
                          transition: {
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut",
                          },
                        },
                      }}
                    >
                      <div className="text-xs text-white/60">
                        {langState === "fa" ? "کلمات کلیدی" : "Keywords"}
                      </div>
                      <div className="text-lg text-white">1,248</div>
                    </motion.div>
                    <motion.div
                      className="flex-1 bg-white/10 rounded p-2"
                      whileHover={{ y: -5 }}
                      variants={{
                        loop: {
                          y: [0, -5, 0],
                          transition: {
                            repeat: Infinity,
                            duration: 3,
                            ease: "easeInOut",
                          },
                        },
                      }}
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
                    loop: {
                      scale: [1, 0.8, 1],
                      rotate: [0, 360, 0],
                      opacity: [1, 0.8, 1],
                      transition: {
                        repeat: Infinity,
                        duration: 5,
                        delay: 0.8,
                        ease: "easeInOut",
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
                        loop: {
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                          transition: {
                            repeat: Infinity,
                            duration: 2,
                            delay: 1,
                            ease: "easeInOut",
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
  }, [langState, isMobile]);

  return (
    <motion.div
      ref={ref}
      className={`w-full max-w-7xl mx-auto px-4 py-12 md:py-16 ${
        langState === "fa" ? "font-iran-sans" : "" // Add a class for Persian font if needed
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
      <BentoGrid>
        {features.map((feature, index) => (
          <BentoCard
            key={feature.name}
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
          />
        ))}
      </BentoGrid>
    </motion.div>
  );
}
