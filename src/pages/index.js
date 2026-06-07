import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SeoHead from "@/components/SeoHead";
import { SITE_URL } from "@/lib/seo";

function useParticlesBg(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, pts = [], raf;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(55, Math.floor((w * h) / 20000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.3 + 0.4,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const r = 155, g = 81, b = 224;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - d / 110) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${r},${g},${b},0.45)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(resize, 120); };
    window.addEventListener("resize", onResize, { passive: true });
    return () => { cancelAnimationFrame(raf); clearTimeout(t); window.removeEventListener("resize", onResize); };
  }, []);
}

const cardBase = {
  display:'flex', flexDirection:'row', alignItems:'center', gap:'12px',
  width:'100%', boxSizing:'border-box', padding:'18px 20px',
  textDecoration:'none', color:'#fff',
  background:'rgba(255,255,255,0.04)',
  border:'1px solid rgba(255,255,255,0.09)',
  borderRadius:'18px', position:'relative', overflow:'hidden',
  transition:'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease',
};
const cardHover = {
  background:'rgba(155,81,224,0.1)',
  border:'1px solid rgba(155,81,224,0.5)',
  boxShadow:'0 12px 40px rgba(155,81,224,0.25)',
  transform:'translateY(-3px) scale(1.015)',
};

export default function LangSelect() {
  const canvasRef = useRef(null);
  const [hovEn, setHovEn] = useState(false);
  const [hovFa, setHovFa] = useState(false);
  useParticlesBg(canvasRef);

  return (
    <div className="ls-root">
      <SeoHead
        title="Heysam — Expert Software Development Studio & Agency"
        description="Heysam is a professional software development studio. We build web apps, websites, and scalable digital products. استودیوی توسعه نرم‌افزار هیسم."
        keywords="software development, web app, heysam, توسعه نرم‌افزار, هیسم"
        canonical={SITE_URL}
        siteName="Heysam"
        altLang={{ en: `${SITE_URL}/en`, fa: `${SITE_URL}/fa` }}
      />
      <div className="ds-page-aura" />
      <canvas ref={canvasRef} className="ls-canvas" />

      <div className="ls-content">
        {/* Glow blob */}
        <div className="ls-glow" />

        {/* Logo mark */}
        <div className="ls-logo-wrap">
          <div className="ls-logo-ring" />
          <div className="ls-logo-ring ls-logo-ring2" />
          <div className="ls-logo-mark">
            <img src="/images/heysam-logo-no-back.png" alt="Heysam" style={{width:'68%',height:'68%',objectFit:'contain'}} />
          </div>
        </div>

        {/* Brand */}
        <h1 className="ls-brand">
          <span className="ds-grad-text">Heysam</span>
        </h1>
        <p className="ls-sub">Software Development Studio</p>

        {/* Divider */}
        <div className="ls-divider" />

        <p className="ls-prompt">Choose your language / <span style={{fontFamily:"'Estedad', sans-serif"}}>زبان خود را انتخاب کنید</span></p>

        {/* Language cards */}
        <div className="ls-cards">
          <Link href="/en"
            style={hovEn ? {...cardBase, ...cardHover} : cardBase}
            onMouseEnter={() => setHovEn(true)}
            onMouseLeave={() => setHovEn(false)}
          >
            <img src="https://flagcdn.com/w40/us.png" alt="US" style={{width:'30px',height:'22px',objectFit:'cover',borderRadius:'4px',flexShrink:0,transition:'transform 0.3s ease',transform: hovEn ? 'scale(1.15) rotate(-5deg)' : 'scale(1)'}} />
            <span style={{fontSize:'17px',fontWeight:700,flexShrink:0}}>English</span>
            <span className="ls-card-desc" style={{fontSize:'12px',color: hovEn ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)',flexShrink:0,marginLeft:'6px',transition:'color 0.3s ease'}}>Continue in English</span>
            <span style={{flex:1}} />
            <span style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.1em',color:'rgba(155,81,224,0.85)',background: hovEn ? 'rgba(155,81,224,0.25)' : 'rgba(155,81,224,0.13)',padding:'3px 9px',borderRadius:'6px',border:'1px solid rgba(155,81,224,0.25)',flexShrink:0,transition:'background 0.3s ease'}}>EN</span>
            <svg style={{opacity: hovEn ? 1 : 0.4, flexShrink:0, marginLeft:'6px', transform: hovEn ? 'translateX(4px)' : 'translateX(0)', transition:'opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)'}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>

          <Link href="/fa"
            style={hovFa ? {...cardBase, ...cardHover} : cardBase}
            onMouseEnter={() => setHovFa(true)}
            onMouseLeave={() => setHovFa(false)}
          >
            <img src="https://flagcdn.com/w40/ir.png" alt="IR" style={{width:'30px',height:'22px',objectFit:'cover',borderRadius:'4px',flexShrink:0,transition:'transform 0.3s ease',transform: hovFa ? 'scale(1.15) rotate(5deg)' : 'scale(1)'}} />
            <span style={{fontSize:'17px',fontWeight:700,flexShrink:0,fontFamily:"'Estedad', sans-serif"}}>فارسی</span>
            <span className="ls-card-desc" style={{fontSize:'12px',color: hovFa ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)',flexShrink:0,marginLeft:'6px',transition:'color 0.3s ease',fontFamily:"'Estedad', sans-serif"}}>ادامه به فارسی</span>
            <span style={{flex:1}} />
            <span style={{fontSize:'10px',fontWeight:700,letterSpacing:'0.1em',color:'rgba(155,81,224,0.85)',background: hovFa ? 'rgba(155,81,224,0.25)' : 'rgba(155,81,224,0.13)',padding:'3px 9px',borderRadius:'6px',border:'1px solid rgba(155,81,224,0.25)',flexShrink:0,transition:'background 0.3s ease'}}>FA</span>
            <svg style={{opacity: hovFa ? 1 : 0.4, flexShrink:0, marginLeft:'6px', transform: hovFa ? 'translateX(4px)' : 'translateX(0)', transition:'opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)'}} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>

        <p className="ls-footer">© {new Date().getFullYear()} Heysam Studio</p>
      </div>

      <style jsx>{`
        .ls-root {
          position: relative;
          min-height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #07060f;
          overflow: hidden;
          font-family: 'Inter', 'Estedad', sans-serif;
        }
        .ls-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        .ls-glow {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(155,81,224,0.18) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 0;
        }
        .ls-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 56px 32px;
          width: 100%;
          max-width: 520px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 28px;
          backdrop-filter: blur(24px) saturate(150%);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(155,81,224,0.08) inset;
          margin: 24px;
        }
        .ls-logo-wrap {
          position: relative;
          width: 96px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .ls-logo-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1.5px solid rgba(155,81,224,0.3);
          animation: ls-pulse 3s ease-in-out infinite;
        }
        .ls-logo-ring2 {
          inset: -10px;
          border-color: rgba(155,81,224,0.12);
          animation-delay: 1s;
        }
        .ls-logo-mark {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3F51B5 0%, #9B51E0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          font-weight: 800;
          color: #fff;
          box-shadow: 0 0 48px rgba(155,81,224,0.5), 0 8px 24px rgba(0,0,0,0.4);
          letter-spacing: -1px;
        }
        .ls-brand {
          font-size: clamp(2.2rem, 8vw, 3.4rem);
          font-weight: 800;
          letter-spacing: -1.5px;
          margin: 0 0 10px;
          line-height: 1;
        }
        .ls-sub {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          margin: 0 0 32px;
        }
        .ls-divider {
          width: 56px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #9B51E0, transparent);
          border-radius: 2px;
          margin-bottom: 32px;
          opacity: 0.6;
        }
        .ls-prompt {
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          margin: 0 0 24px;
          text-align: center;
          line-height: 1.6;
        }
        .ls-cards {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }
        .ls-card-flag {
          font-size: 30px;
          line-height: 1;
          flex-shrink: 0;
        }
        .ls-card-name {
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 0.01em;
          flex-shrink: 0;
        }
        .ls-card-desc {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.01em;
          flex-shrink: 0;
        }
        .ls-card-spacer { flex: 1; }
        .ls-card-hint {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(155,81,224,0.8);
          background: rgba(155,81,224,0.14);
          padding: 3px 9px;
          border-radius: 6px;
          border: 1px solid rgba(155,81,224,0.25);
          flex-shrink: 0;
        }
        .ls-card-arrow {
          opacity: 0.3;
          transition: opacity 0.2s, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          flex-shrink: 0;
        }
        .ls-card:hover .ls-card-arrow { opacity: 0.9; transform: translateX(4px); }
        .ls-card-rtl .ls-card-arrow { transform: scaleX(-1); }
        .ls-card-rtl:hover .ls-card-arrow { transform: scaleX(-1) translateX(-4px); }

        .ls-footer {
          margin-top: 32px;
          font-size: 11px;
          color: rgba(255,255,255,0.2);
          letter-spacing: 0.05em;
        }

        @keyframes ls-pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 1; }
        }

        @media (max-width: 560px) {
          .ls-content { padding: 36px 18px; margin: 14px; border-radius: 24px; }
          .ls-card-desc { display: none; }
        }
      `}</style>
    </div>
  );
}
