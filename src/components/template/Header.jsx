import Link from "next/link";
import { useState, useEffect } from "react";

function Header({ content, langState }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "about_us",   href: `/${langState}#hero` },
    { id: "projects",   href: `/${langState}/projects` },
    { id: "our_skills", href: `/${langState}#skills` },
    { id: "contact_us", href: `/${langState}#footer` },
  ];

  const isFA = langState === "fa";

  return (
    <nav className={`ds-nav${scrolled ? " scrolled" : ""}`} dir="ltr" style={{ fontFamily: isFA ? "'Estedad', sans-serif" : "'Inter', sans-serif" }}>
      <div className="ds-nav-inner">
        {/* Logo */}
        <a className="ds-logo" href={`/${langState}`}>
          <div className="ds-logo-mark">
            <img src="/images/heysam-logo-no-back.png" alt="Heysam" style={{ width: "68%", height: "68%", objectFit: "contain" }} />
          </div>
          <span className="ds-logo-text">HEYSAM</span>
        </a>

        {/* Desktop links */}
        <div className="ds-nav-links">
          {navItems.map((item) => (
            <a key={item.id} href={item.href}>
              {content[item.id]}
            </a>
          ))}
        </div>

        {/* Lang toggle + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="ds-lang-toggle">
            <Link href="/en">
              <button className={langState === "en" ? "active" : ""}>English</button>
            </Link>
            <Link href="/fa">
              <button className={langState === "fa" ? "active" : ""}>فارسی</button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="menu"
            style={{
              display: "none",
              width: 42, height: 42, borderRadius: 11,
              background: "var(--glass)", border: "1px solid var(--glass-border)",
              color: "var(--ds-text)", cursor: "pointer",
              placeItems: "center",
            }}
            className="ds-mobile-menu-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        style={{
          overflow: "hidden",
          transition: "max-height .3s ease",
          maxHeight: menuOpen ? "320px" : "0",
          borderTop: menuOpen ? "1px solid var(--glass-border)" : "none",
          background: "rgba(11,10,24,0.95)",
        }}
      >
        <nav style={{ padding: "8px 28px 16px" }}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block", padding: "12px 0",
                color: "var(--ds-text-dim)", textDecoration: "none",
                fontSize: 14, fontWeight: 600,
                borderBottom: "1px solid var(--glass-border)",
                fontFamily: isFA ? "'Estedad', sans-serif" : "'Inter', sans-serif",
              }}
            >
              {content[item.id]}
            </a>
          ))}
        </nav>
      </div>

      <style jsx>{`
        @media (max-width: 980px) {
          .ds-mobile-menu-btn { display: grid !important; }
        }
      `}</style>
    </nav>
  );
}

export default Header;
