import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";

const CONTENT = {
  fa: {
    contact:    { title: "تماس با ما",       email: "ایمیل",         phone: "تلفن" },
    quickLinks: { title: "لینک‌های سریع",    about: "درباره ما",    skills: "مهارت‌ها", projects: "پروژه‌ها", contact: "تماس با ما" },
    social:     { title: "شبکه‌های اجتماعی" },
    rights:     "تمامی حقوق محفوظ است ©",
  },
  en: {
    contact:    { title: "Contact Us",        email: "Email",         phone: "Phone" },
    quickLinks: { title: "Quick Links",       about: "About Us",     skills: "Skills",    projects: "Projects",  contact: "Contact Us" },
    social:     { title: "Social Media" },
    rights:     "All rights reserved ©",
  },
};

const SOCIAL_LINKS = [
  { href: "https://t.me/MoShirv", label: "Telegram", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.01 9.474c-.148.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.04 14.605l-2.967-.924c-.644-.204-.657-.644.136-.953l11.57-4.461c.537-.194 1.006.131.783.981z"/>
    </svg>
  )},
  { href: "https://www.instagram.com/heysam.build", label: "Instagram", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )},
  { href: "https://github.com/ShahriaryPrison", label: "GitHub", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )},
  { href: "https://www.linkedin.com/company/heytham/", label: "LinkedIn", icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )},
];

function Footer({ langState = "fa" }) {
  const [emailCopied, setEmailCopied] = useState(false);
  const isFA = langState === "fa";
  const content = CONTENT[isFA ? "fa" : "en"];

  const col1Ref = useReveal();
  const col2Ref = useReveal();
  const col3Ref = useReveal();

  const copyEmail = () => {
    navigator.clipboard.writeText("m.shirvani1173@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <footer
      id="footer"
      className="ds-footer"
      dir={isFA ? "rtl" : "ltr"}
      style={{ fontFamily: isFA ? "'Estedad', sans-serif" : "'Inter', sans-serif" }}
    >
      <div className="ds-wrap">
        <div className="ds-foot-grid">
          {/* Column 1 — Contact */}
          <div ref={col1Ref} className="ds-foot-col reveal" style={{ transitionDelay: "0ms" }}>
            <h4>{content.contact.title}</h4>

            <div className="ds-info-row" style={{ marginBottom: 16 }}>
              <div className="ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>
                </svg>
              </div>
              <div>
                <div className="k">{content.contact.email}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <a href="mailto:m.shirvani1173@gmail.com" className="v" style={{ fontSize: 14 }}>
                    m.shirvani1173@gmail.com
                  </a>
                  <button
                    onClick={copyEmail}
                    style={{
                      fontSize: 11, border: "1px solid var(--glass-border)", padding: "2px 8px",
                      borderRadius: 6, background: "transparent", color: "var(--ds-text-dim)", cursor: "pointer",
                    }}
                  >
                    {emailCopied ? (isFA ? "کپی شد!" : "Copied!") : (isFA ? "کپی" : "Copy")}
                  </button>
                </div>
              </div>
            </div>

            <div className="ds-info-row">
              <div className="ico">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <div className="k">{content.contact.phone}</div>
                <a href="tel:+989944215832" className="v" dir="ltr" style={{ fontSize: 14 }}>+98 994 421 5832</a>
              </div>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div ref={col2Ref} className="ds-foot-col reveal" style={{ transitionDelay: "80ms" }}>
            <h4>{content.quickLinks.title}</h4>
            <a href={`/${langState}#hero`}>{content.quickLinks.about}</a>
            <a href={`/${langState}#skills`}>{content.quickLinks.skills}</a>
            <a href={`/${langState}/projects`}>{content.quickLinks.projects}</a>
            <a href={`/${langState}#footer`}>{content.quickLinks.contact}</a>
          </div>

          {/* Column 3 — Social */}
          <div ref={col3Ref} className="ds-foot-col reveal" style={{ transitionDelay: "160ms" }}>
            <h4>{content.social.title}</h4>
            <div className="ds-socials">
              {SOCIAL_LINKS.map(({ href, label, icon }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer">
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="ds-foot-bottom">
          <span>
            <span className="ds-grad-text" style={{ fontWeight: 700 }}>HEYSAM</span>
          </span>
          <span>{content.rights} {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
