import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Make sure to import cn utility

export const AuroraBackground = ({ children, className }) => {
  return (
    <div className={cn("relative flex flex-col h-full w-full", className)}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "pointer-events-none absolute -top-[10%] -left-[30%] h-[200%] w-[200%] blur-[100px] rounded-full",
            "[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]",
            "[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]",
            "[background-image:var(--aurora),var(--dark-gradient)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "filter opacity-20 will-change-transform",
            className
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/10 to-gray-950" />
      </div>
      {children}
    </div>
  );
};