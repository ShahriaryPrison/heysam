import { useState, useEffect, memo } from "react";
import { IconCloud } from "@/components/magicui/icon-cloud";
import simplifiedSkills from "@/data/skillData";
import Link from "next/link";
import { AuroraText } from "../magicui/aurora-text";
import { useReveal } from "@/hooks/useReveal";

/* Static skill grid – shown on mobile to avoid canvas lag */
function SkillGrid() {
  return (
    <div className="grid grid-cols-5 gap-3 p-4">
      {simplifiedSkills.slice(0, 20).map((skill) => (
        <div
          key={skill.alt}
          className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
        >
          <img
            src={skill.src}
            alt={skill.alt}
            className="w-7 h-7"
            loading="lazy"
            decoding="async"
          />
          <span className="text-white/50 text-[9px] text-center leading-none truncate w-full text-center">
            {skill.alt}
          </span>
        </div>
      ))}
    </div>
  );
}

const IconCloudDemo = ({ content, langState }) => {
  const [isMobile, setIsMobile]   = useState(false);
  const [mounted,  setMounted]    = useState(false);
  const [radius,   setRadius]     = useState(250);
  const textRef = useReveal();
  const cloudRef = useReveal();

  useEffect(() => {
    setMounted(true);
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setRadius(Math.min(300, window.innerWidth / 2.5));
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      id="skills"
      className={`relative flex flex-col ${
        langState === "en" ? "lg:flex-row-reverse" : "lg:flex-row"
      } items-center justify-center gap-8 w-full max-w-7xl mx-auto px-4 py-12 md:py-16`}
    >
      {/* ── Text card ── */}
      <div
        ref={textRef}
        className="reveal relative z-10 w-full lg:max-w-sm"
        style={{ transitionDelay: "0.1s" }}
      >
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">
            <AuroraText>{content.title}</AuroraText>
          </h3>
          {content.description && (
            <p className="text-white/70 mb-6 leading-relaxed text-sm">
              {content.description}
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${langState}/skills`}
              className="button-gradient px-5 py-2 text-white rounded-lg font-bold text-sm inline-flex justify-center items-center"
            >
              {content.button}
            </Link>
            {content.secondButton && (
              <Link
                href="#footer"
                className="glass px-5 py-2 text-white rounded-lg font-bold text-sm inline-flex justify-center items-center"
              >
                {content.secondButton}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ── Cloud / static grid ── */}
      <div
        ref={cloudRef}
        className="reveal relative z-10 w-full flex items-center justify-center"
        style={{ transitionDelay: "0.25s" }}
      >
        {!mounted ? (
          <div className="w-full h-[360px] flex items-center justify-center text-white/40 text-sm">
            Loading…
          </div>
        ) : isMobile ? (
          <SkillGrid />
        ) : (
          <div className="w-full h-[420px] flex items-center justify-center">
            <IconCloud
              images={simplifiedSkills}
              className="w-full h-full"
              config={{ radius, speed: 0.4, initialAngle: langState === "en" ? 0 : 180 }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(IconCloudDemo);
