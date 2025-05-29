import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import {
  FileIcon,
  MagnifyingGlassIcon,
  GlobeIcon,
  CalendarIcon,
  BellIcon,
} from "@radix-ui/react-icons";

export default function Services({ projects, langState }) {
  const features = [
    {
      name: "Save your files",
      description: "We automatically save your files as you type.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
      Icon: FileIcon,
    },
    {
      name: "Full text search",
      description: "Search through all your files in one place.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
      Icon: MagnifyingGlassIcon,
    },
    {
      name: "Multilingual",
      description: "Supports 100+ languages and counting.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
      Icon: GlobeIcon,
    },
    {
      name: "Calendar",
      description: "Use the calendar to filter your files by date.",
      href: "/",
      cta: "Learn more",
      background: <img className="absolute -right-20 -top-20 opacity-60" />,
      className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
      Icon: CalendarIcon,
    },
    {
      name: "Notifications",
      description:
        "Get notified when someone shares a file or mentions you in a comment.",
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
