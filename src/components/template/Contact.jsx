import { useReveal } from "@/hooks/useReveal";

const CONTENT = {
  en: {
    eyebrow: "Let's talk",
    title: "Start a project",
    sub: "Tell us what you're building. We usually reply within one business day.",
    telegram_lbl: "Telegram", phone_lbl: "Phone",
    telegram_desc: "Message us on Telegram",
    phone_desc: "Give us a call",
  },
  fa: {
    eyebrow: "گفت‌وگو کنیم",
    title: "شروع یک پروژه",
    sub: "از آنچه می‌سازید برایمان بگویید. معمولاً ظرف یک روز کاری پاسخ می‌دهیم.",
    telegram_lbl: "تلگرام", phone_lbl: "تلفن",
    telegram_desc: "از طریق تلگرام پیام بدید",
    phone_desc: "تماس مستقیم",
  },
};

export default function Contact({ langState }) {
  const isFA = langState === "fa";
  const c = CONTENT[isFA ? "fa" : "en"];
  const infoRef = useReveal();
  const headRef = useReveal();

  return (
    <section
      className="ds-block"
      id="contact"
      style={{ paddingTop: 0, fontFamily: isFA ? "'Estedad', sans-serif" : "'Inter', sans-serif" }}
    >
      <div className="ds-wrap">
        <div className="ds-sec-head reveal" ref={headRef} style={isFA ? { direction: "rtl" } : {}}>
          <div className="left">
            <span className="ds-eyebrow">{c.eyebrow}</span>
            <h2 className="ds-h-section" style={{ marginTop: 16 }}>
              <span className="ds-grad-text">{c.title}</span>
            </h2>
            <p className="ds-lead" style={{ marginTop: 14 }}>{c.sub}</p>
          </div>
        </div>

        <div
          ref={infoRef}
          className="ds-contact-cards reveal"
          style={isFA ? { direction: "rtl" } : {}}
        >
          {/* Telegram */}
          <a
            href="https://t.me/heysamadmin"
            target="_blank"
            rel="noopener noreferrer"
            className="ds-contact-card ds-glass ds-glow-border"
          >
            <div className="ds-contact-card-ico" style={{ background: "rgba(39,161,220,0.12)", borderColor: "rgba(39,161,220,0.3)", color: "#39a3dc" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.9 4.3 18.6 19.6c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.4-5 9.3-8.4c.4-.4-.1-.6-.6-.2L6.2 13.1l-4.9-1.5c-1.1-.3-1.1-1 .2-1.5l19.1-7.4c.9-.3 1.7.2 1.3 1.6z"/>
              </svg>
            </div>
            <div className="ds-contact-card-text">
              <div className="ds-contact-card-label">{c.telegram_lbl}</div>
              <div className="ds-contact-card-value" dir="ltr">@heysamadmin</div>
              <div className="ds-contact-card-desc">{c.telegram_desc}</div>
            </div>
            <svg className="ds-contact-card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>

          {/* Phone */}
          <a
            href="tel:+989944215832"
            className="ds-contact-card ds-glass ds-glow-border"
          >
            <div className="ds-contact-card-ico">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div className="ds-contact-card-text">
              <div className="ds-contact-card-label">{c.phone_lbl}</div>
              <div className="ds-contact-card-value" dir="ltr">+98 994 421 5832</div>
              <div className="ds-contact-card-desc">{c.phone_desc}</div>
            </div>
            <svg className="ds-contact-card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
