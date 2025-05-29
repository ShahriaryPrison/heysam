import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import {
  FigmaLogoIcon,
  CodeIcon,
  GlobeIcon,
  GearIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Services({ projects, langState }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const features = [
    {
      name: "UI/UX Design",
      description: "Crafting intuitive and engaging user experiences.",
      href: langState + "/#footer",
      cta: "Learn more",
      background: (
        <motion.div
          className="absolute inset-0 overflow-hidden grid grid-cols-3 grid-rows-3 gap-2 p-2"
          initial="hidden"
          animate="hidden"
          whileHover="visible"
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
      name: "Frontend Development",
      description: "Building responsive and dynamic web applications.",
      href: langState + "/#footer",
      cta: "Learn more",
      background: (
        <motion.div
          className="absolute inset-0 overflow-hidden p-4"
          initial="hidden"
          animate="hidden"
          whileHover="visible"
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
              <motion.div
                className="text-blue-400"
                variants={{
                  hidden: { x: 0, opacity: 0.8 },
                  visible: { x: 0, opacity: 1, transition: { delay: 0.5 } },
                }}
              >
                import {"{"} useState {"}"} from 'react';
              </motion.div>
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
            </motion.div>
          </motion.div>
        </motion.div>
      ),
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
      Icon: CodeIcon,
    },
    {
      name: "Backend Development",
      description: "Creating robust server-side solutions and APIs.",
      href: langState + "/#footer",
      cta: "Learn more",
      background: (
        <motion.div
          className="absolute inset-0 overflow-hidden p-4"
          initial="hidden"
          animate="hidden"
          whileHover="visible"
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
                visible: { rotate: 0, opacity: 1, transition: { delay: 0.3 } },
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
                  Users
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
                  Products
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
                  Orders
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
      name: "DevOps",
      description: "Streamlining development and operations for efficiency.",
      href: langState + "/#footer",
      cta: "Learn more",
      background: (
        <motion.div
          className="absolute inset-0 overflow-hidden p-4"
          initial="hidden"
          animate="hidden"
          whileHover="visible"
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full"
              variants={{
                hidden: { y: 0, opacity: 0.8 },
                visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
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
                }}
              >
                {["Commit", "Build", "Test", "Deploy"].map((step, i) => (
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
                }}
              >
                {["Dev", "Staging", "Prod"].map((env, i) => (
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
      name: "SEO Optimization",
      description:
        "Enhancing visibility and searchability of web applications.",
      href: langState + "/#footer",
      cta: "Learn more",
      background: (
        <motion.div
          className="absolute inset-0 overflow-hidden p-4"
          initial="hidden"
          animate="hidden"
          whileHover="visible"
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
                  <span className="text-xs text-white/80">Organic Traffic</span>
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
                    <div className="text-xs text-white/60">Keywords</div>
                    <div className="text-lg text-white">1,248</div>
                  </motion.div>
                  <motion.div
                    className="flex-1 bg-white/10 rounded p-2"
                    whileHover={{ y: -5 }}
                  >
                    <div className="text-xs text-white/60">Position</div>
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
      ref={ref}
      className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16"
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