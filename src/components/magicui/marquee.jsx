import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "100px 0px",
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!inView) return <div ref={ref} className="h-[200px] w-full" />;

  return (
    <div
      {...props}
      ref={ref}
      className={cn(
        "group flex overflow-hidden p-2",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={{
        "--duration": isMobile ? "40s" : "30s",
        "--gap": isMobile ? "0.5rem" : "1rem",
      }}
    >
      {Array.from({ length: isMobile ? Math.min(2, repeat) : repeat }).map(
        (_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around gap-[--gap]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "[animation-play-state:paused] group-hover:[animation-play-state:running]":
                pauseOnHover && !isMobile,
              "[animation-direction:reverse]": reverse,
            })}
            style={{
              animationDuration: "var(--duration)",
            }}
          >
            {children}
          </div>
        )
      )}
    </div>
  );
}
