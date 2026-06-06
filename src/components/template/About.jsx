import { useReveal } from "@/hooks/useReveal";

const CONTENT = {
  en: {
    eyebrow: "About Us",
    title: "A studio that ships.",
    sub: "HeySam pairs senior engineering with sharp design to turn ambitious ideas into shipped, scalable software.",
    points: [
      { h: "Senior by default", p: "Every project is led by engineers who have shipped at scale — no hand-offs to juniors." },
      { h: "Design-engineering loop", p: "Designers and engineers work in one room, so what you see is what gets built." },
      { h: "Built to scale", p: "Architecture decisions made for your ten-thousandth user, not just your tenth." },
    ],
    cap: "building products that scale",
  },
  fa: {
    eyebrow: "درباره ما",
    title: "استودیویی که نتیجه می‌دهد.",
    sub: "در هیسم، طراحی دقیق و توسعه حرفه‌ای دست در دست هم پیش می‌روند تا ایده‌های شما به محصولی واقعی، کاربردی و ماندگار تبدیل شوند.",
    points: [
      { h: "تیم متخصص", p: "هر پروژه با نظارت مهندسانی پیش می‌رود که تجربه ساخت محصولات واقعی و در مقیاس بزرگ را دارند." },
      { h: "طراحی و توسعه یکپارچه", p: "طراح و توسعه‌دهنده از ابتدا کنار هم کار می‌کنند تا آنچه می‌بینید، دقیقاً همان چیزی باشد که تحویل می‌گیرید." },
      { h: "توسعه آینده‌نگر", p: "معماری نرم‌افزار را با دیدی بلندمدت می‌چینیم تا با رشد کسب‌وکار شما، سیستم هم رشد کند." },
    ],
    cap: "از ایده تا محصول، کنارتان هستیم",
  },
};

const CHECK = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

export default function About({ langState }) {
  const textRef = useReveal();
  const visualRef = useReveal();
  const isFA = langState === "fa";
  const c = CONTENT[isFA ? "fa" : "en"];

  return (
    <section
      id="about"
      className="ds-block"
      style={{ paddingTop: 0, fontFamily: isFA ? "'Estedad', sans-serif" : "'Inter', sans-serif" }}
    >
      <div className="ds-wrap">
        <div className="ds-about-grid" style={isFA ? { direction: "rtl" } : {}}>
          {/* Text side */}
          <div ref={textRef} className="reveal">
            <span className="ds-eyebrow">{c.eyebrow}</span>
            <h2 className="ds-h-section" style={{ marginTop: 16, color: "var(--ds-text)" }}>{c.title}</h2>
            <p className="ds-lead" style={{ marginTop: 14 }}>{c.sub}</p>
            <div className="ds-about-points">
              {c.points.map((pt) => (
                <div key={pt.h} className="ds-about-point">
                  <span className="dot">{CHECK}</span>
                  <p><b>{pt.h}.</b> {pt.p}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div ref={visualRef} className="ds-about-visual reveal" style={{ transitionDelay: "0.16s" }}>
            <div className="ds-about-visual-inner">
              {/* Glass orb background */}
              <div className="ds-hero-orb">
                <div className="ds-glass-orb" />
              </div>
              <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
                <div className="ds-about-big-num" dir={isFA ? "rtl" : "ltr"}>{isFA ? "۵+ سال" : "5+yr"}</div>
                <p className="ds-about-cap">{c.cap}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
