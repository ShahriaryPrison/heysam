import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ShineBorder } from "./shine-border";
import Link from "next/link";
import { AuroraText } from "./aurora-text";
import { motion } from "framer-motion";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS in a useEffect hook
const BentoGrid = ({ children, className, ...props }) => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}) => (
  <motion.div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className
    )}
    data-aos="fade-up"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.02 }}
    {...props}
  >
    <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
    <div>{background}</div>
    <motion.div
      className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-white bg-clip-text">
        <motion.div
          whileHover={{ rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="h-12 w-12" />
        </motion.div>
      </div>
      <h3 className="text-xl font-semibold">
        <AuroraText>{name}</AuroraText>
      </h3>
      <p className="max-w-lg text-white">{description}</p>
    </motion.div>

    <motion.div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Button
        variant="ghost"
        asChild
        size="sm"
        className="pointer-events-auto text-white button-gradient"
      >
        <Link href={href} >
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </Link>
      </Button>
    </motion.div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </motion.div>
);

export { BentoCard, BentoGrid };
