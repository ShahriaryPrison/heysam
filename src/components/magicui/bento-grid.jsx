import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

const BentoGrid = ({ children, className }) => (
  <div
    className={cn(
      "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
      className
    )}
  >
    {children}
  </div>
);

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}) => (
  <div
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "border border-white/10 bg-white/[0.03]",
      "transition-all duration-300 hover:border-purple-500/30 hover:bg-white/[0.06]",
      className
    )}
  >
    {/* Decorative background */}
    <div className="absolute inset-0 pointer-events-none">
      {background}
    </div>

    {/* Hover overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    {/* Content */}
    <div className="pointer-events-none relative z-10 flex flex-col gap-2 p-6 transition-transform duration-300 group-hover:-translate-y-10">
      <Icon className="h-10 w-10 text-purple-300 mb-1" />
      <h3 className="text-xl font-semibold text-gradient">{name}</h3>
      <p className="max-w-lg text-white/70 text-sm leading-relaxed">{description}</p>
    </div>

    {/* CTA */}
    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-10">
      <Link
        href={href}
        className="pointer-events-auto text-white button-gradient px-4 py-2 rounded-lg text-sm inline-flex items-center gap-2"
      >
        {cta}
        <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
      </Link>
    </div>

    {/* Bottom hover dark overlay */}
    <div className="pointer-events-none absolute inset-0 transition-all duration-300 group-hover:bg-black/5" />
  </div>
);

export { BentoCard, BentoGrid };
