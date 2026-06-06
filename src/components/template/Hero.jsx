import Link from "next/link";
import { useEffect, useRef } from "react";
import { useReveal } from "@/hooks/useReveal";

function toFaDigits(n) {
  return String(n).replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);
}

function StatItem({ stat, isFA = false, delay = 0 }) {
  const wrapRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const numEl = el.querySelector(".stat-num");
    if (!numEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        observer.disconnect();

        const duration = 1600;
        const target = stat.val;
        const suffix = isFA ? "+" : "+";
        let startTime = null;
        let rafId;

        const fmt = (n) => isFA ? toFaDigits(n) + suffix : n + suffix;

        const tick = (ts) => {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          numEl.textContent = fmt(Math.floor(eased * target));
          if (progress < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            numEl.textContent = fmt(target);
          }
        };

        rafId = requestAnimationFrame(tick);
        el._rafId = rafId;
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (el._rafId) cancelAnimationFrame(el._rafId);
    };
  }, [isFA]);

  return (
    <div ref={wrapRef} className="ds-stat">
      <div className="num ds-grad-text stat-num">{isFA ? "۰+" : "0+"}</div>
      <div className="lbl">{stat.lbl}</div>
    </div>
  );
}

const STATS = {
  en: [
    { val: 20, suffix: "+", lbl: "Projects Delivered" },
    { val: 20, suffix: "+", lbl: "Happy Clients" },
    { val: 6, suffix: "+", lbl: "Years of Experience" },
    { val: 30, suffix: "+", lbl: "Technologies Mastered" },
  ],
  fa: [
    { val: 20, suffix: "+", lbl: "پروژه تحویل‌شده" },
    { val: 20, suffix: "+", lbl: "مشتری راضی" },
    { val: 6, suffix: "+", lbl: "سال تجربه" },
    { val: 30, suffix: "+", lbl: "فناوری تخصصی" },
  ],
};

function useParticles(canvasRef, heroRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, pts = [], raf;
    let resizing = false;
    const mouse = { x: -999, y: -999 };

    function resize() {
      if (resizing) return;
      resizing = true;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const newW = hero.offsetWidth;
      const newH = hero.offsetHeight;
      if (newW === 0 || newH === 0) { resizing = false; return; }
      w = newW; h = newH;
      // Only set intrinsic canvas size, not CSS size (canvas fills via CSS inset:0)
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(60, Math.floor((w * h) / 18000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.5,
      }));
      resizing = false;
    }

    function draw() {
      if (w === 0 || h === 0) { raf = requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, w, h);
      const r = 155, g = 81, b = 224;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / 120) * 0.11})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (md < 150) {
          ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - md / 150) * 0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    let resizeTimer;
    const onResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(resize, 100); };
    const onMove = (e) => { const rc = hero.getBoundingClientRect(); mouse.x = e.clientX - rc.left; mouse.y = e.clientY - rc.top; };
    const onLeave = () => { mouse.x = -999; mouse.y = -999; };

    window.addEventListener("resize", onResize, { passive: true });
    hero.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);
}

function useTilt(wrapRef, cardRef) {
  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const onMove = (e) => {
      const rc = card.getBoundingClientRect();
      const px = (e.clientX - rc.left) / rc.width - 0.5;
      const py = (e.clientY - rc.top) / rc.height - 0.5;
      card.style.transform = `rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-4px)`;
    };
    const onLeave = () => { card.style.transform = ""; };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);
}

function Hero({ content, langState }) {
  const textRef = useReveal();
  const cardRef = useReveal();
  const heroRef = useRef(null);
  const canvasRef = useRef(null);
  const tiltWrapRef = useRef(null);
  const tiltCardRef = useRef(null);
  const isFA = langState === "fa";
  const stats = STATS[isFA ? "fa" : "en"];

  useParticles(canvasRef, heroRef);
  useTilt(tiltWrapRef, tiltCardRef);

  return (
    <>
      <section
        ref={heroRef}
        className="ds-hero"
        style={{ fontFamily: isFA ? "'Estedad', sans-serif" : "'Inter', sans-serif" }}
      >
        <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }} />

        <div className="ds-hero-wrap" style={isFA ? { direction: "rtl" } : {}}>
          {/* Text side */}
          <div ref={textRef} className="reveal" style={{ transitionDelay: "0.1s" }}>
            <span className="ds-eyebrow">
              {isFA ? "استودیوی توسعه نرم‌افزار" : "Software Development Studio"}
            </span>
            <h1>
              {isFA ? (
                <>ما راهکارهای<br />نرم‌افزاری<br /><span className="ds-grad-text">خارق‌العاده</span> می‌سازیم.</>
              ) : (
                <>We Craft <span className="ds-grad-text">Extraordinary</span> Software Solutions.</>
              )}
            </h1>
            <p className="ds-lead">{content.body}</p>
            <div className="ds-hero-actions">
              <Link href={`/${langState}/projects`} className="ds-btn ds-btn-primary">
                {content.button}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
              {content.secondButton && (
                <Link href={`/${langState}#footer`} className="ds-btn ds-btn-ghost">
                  {content.secondButton}
                </Link>
              )}
            </div>
          </div>

          {/* Card side */}
          <div ref={tiltWrapRef} className="ds-hero-card-wrap">
            <div ref={cardRef} className="reveal" style={{ transitionDelay: "0.3s", width: "100%" }}>
              <div ref={tiltCardRef} className="ds-hero-card ds-glow-border">
                <div className="ds-hero-card-art">
                  <div className="ds-hero-card-logo">
                    <img src="/images/heysam-logo-no-back.png" alt="Heysam" style={{ width: "72%", height: "72%", objectFit: "contain" }} />
                  </div>
                </div>
                <h3>{isFA ? "هیسم" : "Heysam"}</h3>
                <p className="ds-sub">{isFA ? "توسعه نرم‌افزار" : "Software Development"}</p>
                <div className="ds-hero-card-meta">
                  <div className="ds-hero-card-row">
                    <span className="k">{isFA ? "خدمت" : "Service"}</span>
                    <span className="v">{isFA ? "توسعه" : "Development"}</span>
                  </div>
                  <div className="ds-hero-card-row">
                    <span className="k">{isFA ? "تأسیس" : "Founded"}</span>
                    <span className="v">{isFA ? "۱۳۹۸" : "2019"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div className="ds-stats">
        <div className="ds-stats-inner">
          <div className="ds-stats-grid">
            {stats.map((s, i) => (
              <StatItem key={s.lbl} stat={s} isFA={isFA} delay={i * 100} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
