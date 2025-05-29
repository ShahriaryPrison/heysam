import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import Figma from "../../../public/images/figma.gif";
import {
  FigmaLogoIcon,
  CodeIcon,
  GlobeIcon,
  GearIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function Services({ projects, langState }) {
  const features = [
    {
      name: "UI/UX Design",
      description: "Crafting intuitive and engaging user experiences.",
      href: langState + "/#footer",
      cta: "Learn more",
      // background: <img className="absolute -right-20 -top-20 opacity-60" src="" />,
      background: (
        <div className="absolute inset-0 overflow-hidden grid grid-cols-3 grid-rows-3 gap-2 p-2">
          {/* Mockup elements */}
          <div className="bg-white/20 rounded-lg col-span-2 row-span-1"></div>
          <div className="bg-pink-500/20 rounded-lg"></div>
          <div className="bg-purple-500/20 rounded-lg"></div>
          <div className="bg-white/30 rounded-lg col-span-1 row-span-2"></div>
          <div className="bg-blue-500/20 rounded-lg col-span-2"></div>
          {/* Floating Figma-like tools */}
          <div className="absolute -right-5 -top-5 w-24 h-8 bg-gray-800/80 rounded-full"></div>
          <div className="absolute right-10 -bottom-5 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg rotate-12"></div>
        </div>
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
        <div className="absolute inset-0 overflow-hidden p-4">
          <div className="relative h-full">
            {/* Code editor mockup */}
            <div className="absolute left-0 top-0 w-full h-8 bg-gray-800/80 rounded-t-lg flex items-center px-3 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="absolute left-0 top-8 w-full h-full bg-gray-900/50 rounded-b-lg p-4 font-mono text-xs">
              <div className="text-blue-400">
                import {"{"} useState {"}"} from 'react';
              </div>
              <div className="text-gray-400">
                export default function Counter() {"{"}
              </div>
              <div className="text-blue-400 ml-4">
                const [count, setCount] = useState(0);
              </div>
              <div className="text-gray-400 ml-4">return (</div>
              <div className="text-yellow-300 ml-8">
                {"<div className='p-4'>"}
              </div>
              <div className="text-yellow-300 ml-12">
                {"<button onClick={() => setCount(c => c + 1)}>"}
              </div>
              <div className="text-yellow-300 ml-16">
                Clicked {"{count}"} times
              </div>
              <div className="text-yellow-300 ml-12">{"</button>"}</div>
              <div className="text-yellow-300 ml-8">{"</div>"}</div>
            </div>
          </div>
        </div>
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
        <div className="absolute inset-0 overflow-hidden p-4">
          <div className="relative h-full">
            {/* Database schema visualization */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
              <div className="absolute left-0 top-0 w-32 h-32 bg-blue-900/30 rounded-lg border border-blue-500/50">
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
              </div>
              <div className="absolute right-0 top-8 w-32 h-32 bg-amber-900/30 rounded-lg border border-amber-500/50">
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
              </div>
              <div className="absolute left-1/2 bottom-0 w-32 h-32 bg-purple-900/30 rounded-lg border border-purple-500/50 -translate-x-1/2">
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
              </div>
              {/* Connection lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M64,32 L128,64"
                  stroke="rgba(59, 130, 246, 0.5)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <path
                  d="M64,64 L96,128"
                  stroke="rgba(217, 119, 6, 0.5)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              </svg>
            </div>
          </div>
        </div>
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
        <div className="absolute inset-0 overflow-hidden p-4">
          <div className="relative h-full">
            {/* CI/CD Pipeline visualization */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
              <div className="flex justify-center space-x-4">
                {["Commit", "Build", "Test", "Deploy"].map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-green-900/30 border border-green-500/50 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-green-500/50"></div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-green-300">{step}</div>
                    {i < 3 && (
                      <div className="h-px w-16 bg-green-500/30 mt-6"></div>
                    )}
                  </div>
                ))}
              </div>
              {/* Server icons */}
              <div className="flex justify-around mt-12">
                {["Dev", "Staging", "Prod"].map((env, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-800/50 rounded-lg border border-gray-500/30 flex flex-col items-center justify-center">
                      <div className="w-10 h-1 bg-gray-500/50 mb-1"></div>
                      <div className="w-8 h-1 bg-gray-500/50 mb-1"></div>
                      <div className="w-6 h-1 bg-gray-500/50"></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-300">{env}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
        <div className="absolute inset-0 overflow-hidden p-4">
          <div className="relative h-full">
            {/* SEO metrics dashboard */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64">
              <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-white/80">Organic Traffic</span>
                  <span className="text-xs text-green-400">↑ 24%</span>
                </div>
                <div className="h-8 bg-gradient-to-r from-green-900/30 to-green-500/30 rounded-full"></div>

                <div className="flex mt-4 space-x-2">
                  <div className="flex-1 bg-white/10 rounded p-2">
                    <div className="text-xs text-white/60">Keywords</div>
                    <div className="text-lg text-white">1,248</div>
                  </div>
                  <div className="flex-1 bg-white/10 rounded p-2">
                    <div className="text-xs text-white/60">Position</div>
                    <div className="text-lg text-amber-400">3.2</div>
                  </div>
                </div>
              </div>

              {/* Search engine icon */}
              <div className="absolute -right-6 -top-6 w-16 h-16 bg-gradient-to-br from-blue-900/30 to-blue-500/30 rounded-full flex items-center justify-center">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full border-2 border-blue-400/50"></div>
                  <div className="absolute top-1/2 left-1/2 w-6 h-1 bg-blue-400/50 transform -translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-3",
      Icon: MagnifyingGlassIcon,
    },
  ];

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16">
        <BentoGrid>
          {features.map((feature) => (
            <BentoCard
              key={feature.name}
              name={feature.name}
              description={feature.description}
              href={feature.href}
              cta={feature.cta}
              background={feature.background}
              className={feature.className + " glass"}
              Icon={feature.Icon}
            />
          ))}
        </BentoGrid>
      </div>
      <div className="mt-16 relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border border-white/10 p-8 md:p-10">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full filter blur-xl"></div>
        </div>

        <div className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Free Project Consultation
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Need help with your project? Let's discuss how we can assist you
              in achieving your goals. We're here to help.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="#footer" // Adjust this to your contact page path
                className="px-8 py-3 bg-white text-purple-900 rounded-lg font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute right-10 top-10 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm"></div>
        <div className="absolute left-12 bottom-12 w-8 h-8 bg-purple-400/20 rounded-full backdrop-blur-sm"></div>
      </div>
    </>
  );
}
