import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import {
    FigmaLogoIcon,
  CodeIcon,
  GlobeIcon,
  GearIcon,
  BellIcon,
} from "@radix-ui/react-icons";

export default function Services({ projects, langState }) {
  const features = [
    {
      name: "UI/UX Design",
      description: "Crafting intuitive and engaging user experiences.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
      Icon: FigmaLogoIcon,
    },
    {
      name: "Frontend Development",
      description: "Building responsive and dynamic web applications.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
      Icon: CodeIcon,
    },
    {
      name: "Backend Development",
      description: "Creating robust server-side solutions and APIs.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
      Icon: GlobeIcon,
    },
    {
      name: "DevOps",
      description: "Streamlining development and operations for efficiency.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
      Icon: GearIcon,
    },
    {
      name: "SEO Optimization",
      description:
        "Enhancing visibility and searchability of web applications.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
      Icon: BellIcon,
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
