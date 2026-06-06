import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

const ICONS = {
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  infinity: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z"/>
    </svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
    </svg>
  ),
  spark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  compass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
    </svg>
  ),
};

// Index-based colors so FA/EN tags both get correct colors
const CARD_COLORS = [
  { dot: "#6573d6", bg: "rgba(101,115,214,0.12)", border: "rgba(101,115,214,0.28)" },
  { dot: "#38bdf8", bg: "rgba(56,189,248,0.10)",  border: "rgba(56,189,248,0.25)" },
  { dot: "#34d399", bg: "rgba(52,211,153,0.10)",  border: "rgba(52,211,153,0.25)" },
  { dot: "#f472b6", bg: "rgba(244,114,182,0.10)", border: "rgba(244,114,182,0.25)" },
  { dot: "#b985f0", bg: "rgba(185,133,240,0.12)", border: "rgba(185,133,240,0.28)" },
  { dot: "#fb923c", bg: "rgba(251,146,60,0.10)",  border: "rgba(251,146,60,0.25)" },
  { dot: "#facc15", bg: "rgba(250,204,21,0.10)",  border: "rgba(250,204,21,0.25)" },
];

function SvcCard({ item, index, delay, isFA }) {
  const ref = useReveal();
  const glowRef = useRef(null);
  const num = String(index + 1).padStart(2, "0");
  const color = CARD_COLORS[index % CARD_COLORS.length];

  function handleMouseMove(e) {
    const glow = glowRef.current;
    if (!glow) return;
    const rect = e.currentTarget.getBoundingClientRect();
    glow.style.left = `${e.clientX - rect.left}px`;
    glow.style.top  = `${e.clientY - rect.top}px`;
  }

  return (
    <div
      ref={ref}
      className="ds-svc reveal"
      style={{ transitionDelay: delay }}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className="ds-svc-glow" />
      <span className="ds-svc-num" aria-hidden="true">{num}</span>

      {/* Badge always LTR so it stays on the LEFT */}
      <div className="ds-svc-toprow">
        <span
          className="ds-svc-badge"
          style={{ "--badge-dot": color.dot, "--badge-bg": color.bg, "--badge-border": color.border }}
        >
          <span className="ds-svc-badge-dot" />
          {item.tag}
        </span>
      </div>

      <div className="ds-svc-ico">{ICONS[item.icon]}</div>

      <h3>{item.title}</h3>
      <p>{item.desc}</p>

      <div className="ds-svc-arrow" aria-hidden="true">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16">
          <line x1="4" y1="16" x2="16" y2="4"/>
          <polyline points="8,4 16,4 16,12"/>
        </svg>
      </div>
    </div>
  );
}

const SERVICES = {
  en: {
    eyebrow: "What we do",
    title: "Services",
    sub: "End-to-end product engineering.",
    items: [
      { tag: "Frontend",  title: "Frontend Development", desc: "Building responsive, dynamic and accessible web applications with pixel-perfect attention to detail.", icon: "code" },
      { tag: "Backend",   title: "Backend Development",  desc: "Robust, secure server-side solutions and APIs that scale.", icon: "server" },
      { tag: "DevOps",    title: "DevOps",               desc: "Streamlining development & operations with CI/CD, containers and observability.", icon: "infinity" },
      { tag: "Design",    title: "UI / UX Design",       desc: "Crafting intuitive, engaging experiences people love to use.", icon: "pen" },
      { tag: "AI",        title: "AI Solutions",         desc: "Intelligent automation and data-driven products powered by modern ML.", icon: "spark" },
      { tag: "SEO",       title: "SEO Optimization",     desc: "Enhancing visibility and searchability of your web applications.", icon: "search" },
      { tag: "Advisory",  title: "IT Consulting",        desc: "Strategic guidance from planning straight through to production.", icon: "compass" },
    ],
  },
  fa: {
    eyebrow: "چه می‌کنیم",
    title: "خدمات",
    sub: "مهندسی محصول از ابتدا تا انتها.",
    items: [
      { tag: "فرانت‌اند",    title: "توسعه فرانت‌اند",            desc: "ساخت اپلیکیشن‌های وب واکنش‌گرا، پویا و قابل‌دسترس با دقتی پیکسلی.", icon: "code" },
      { tag: "بک‌اند",       title: "توسعه بک‌اند",               desc: "راهکارها و APIهای سمت‌سرور قدرتمند، امن و مقیاس‌پذیر.", icon: "server" },
      { tag: "دواپس",        title: "دواپس",                      desc: "بهینه‌سازی توسعه و عملیات با CI/CD، کانتینر و مانیتورینگ.", icon: "infinity" },
      { tag: "طراحی",        title: "طراحی رابط و تجربه کاربری", desc: "خلق تجربه‌هایی کاربرپسند و جذاب که کاربران دوستشان دارند.", icon: "pen" },
      { tag: "هوش مصنوعی",  title: "راهکارهای هوش مصنوعی",      desc: "اتوماسیون هوشمند و محصولات داده‌محور مبتنی بر یادگیری ماشین.", icon: "spark" },
      { tag: "سئو",          title: "بهینه‌سازی سئو",            desc: "افزایش دیده‌شدن و رتبه‌ی جست‌وجوی اپلیکیشن‌های وب شما.", icon: "search" },
      { tag: "مشاوره",       title: "مشاوره فناوری اطلاعات",     desc: "راهنمایی راهبردی از برنامه‌ریزی تا مرحله‌ی تولید.", icon: "compass" },
    ],
  },
};

export default function Services({ langState }) {
  const headRef = useReveal();
  const isFA = langState === "fa";
  const lang = isFA ? "fa" : "en";
  const { eyebrow, title, sub, items } = SERVICES[lang];

  return (
    <section
      className="ds-block"
      id="services"
      style={{ fontFamily: isFA ? "'Estedad', sans-serif" : "'Inter', sans-serif" }}
    >
      <div className="ds-wrap">
        <div className="ds-sec-head reveal" ref={headRef} style={isFA ? { direction: "rtl" } : {}}>
          <div className="left">
            <span className="ds-eyebrow">{eyebrow}</span>
            <h2 className="ds-h-section" style={{ marginTop: 16 }}>
              <span className="ds-grad-text">{title}</span>
            </h2>
            <p className="ds-lead" style={{ marginTop: 14 }}>{sub}</p>
          </div>
        </div>

        <div className="ds-bento" style={isFA ? { direction: "rtl" } : {}}>
          {items.map((item, i) => (
            <SvcCard
              key={item.title}
              item={item}
              index={i}
              isFA={isFA}
              delay={`${i * 60}ms`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
