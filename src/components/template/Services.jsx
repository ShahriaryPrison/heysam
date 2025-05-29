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
import { AnimatedListDemo } from 

export default function Services({ projects, langState }) {
  const features = [
    {
      name: "UI/UX Design",
      description: "Crafting intuitive and engaging user experiences.",
      href: langState + "/#footer",
      cta: "Learn more",
      // background: <img className="absolute -right-20 -top-20 opacity-60" src="" />,
      background: (
        <Image
          src={Figma}
          className="w-full h-full object-cover absolute"
          width="80"
          height="80"
          alt="figma-gif"
          style={{ objectFit: "cover" }}
        />
      ),
      className: "lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-3",
      Icon: FigmaLogoIcon,
    },
    {
      name: "Frontend Development",
      description: "Building responsive and dynamic web applications.",
      href: langState + "/#footer",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2",
      Icon: CodeIcon,
    },
    {
      name: "Backend Development",
      description: "Creating robust server-side solutions and APIs.",
      href: langState + "/#footer",
      cta: "Learn more",
      background: (
        <div className="p-1">
          <AnimatedListDemo />
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
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
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
        <Image
          src={SeoImage}
          className="w-full h-full object-cover absolute"
          width="500"
          height="500"
          alt="seo-image"
          style={{ objectFit: "cover" }}
        />
      ),
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-3",
      Icon: MagnifyingGlassIcon,
    },
  ];

  return (
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
  );
}
