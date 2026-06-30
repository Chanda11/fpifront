import { Mail, Phone, MapPin, ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Inter', system-ui, sans-serif";
const INK   = "#080c1a";
const RED   = "#C9293A";
const GOLD  = "#C9A84C";

const quickLinks = [
  { label: "About Us",  to: "/about"    },
  { label: "Our Team",  to: "/team"     },
  { label: "Partners",  to: "/partners" },
  { label: "Contact",   to: "/contact"  },
];

const programs = [
  { label: "Advocacy",          to: "/programs/advocacy"          },
  { label: "Media Literacy",    to: "/programs/media-literacy"    },
  { label: "Research",          to: "/programs/research"          },
  { label: "Capacity Building", to: "/programs/capacity-building" },
];

// Full address updated
const contactItems = [
  { icon: <MapPin size={14} />,  text: "Unit 2, Makishi Road, Rhodes Park, Lusaka" },
  { icon: <Phone size={14} />,   text: "+260 95 4723936", link: "tel:+260954723936" },
  { icon: <Mail  size={14} />,   text: "info@fpizambia.org", link: "mailto:info@fpizambia.org" },
  { icon: <MessageCircle size={14} />, text: "WhatsApp", link: "https://wa.me/260954723936" },
];

const stats = [
  { num: "500+", label: "Journalists" },
  { num: "13+",  label: "MIL Hubs"   },
  { num: "10+",  label: "Years"      },
];

// ─── PARTNERS & SPONSORS (separate arrays) ──────────────────────────────────
const partners = [
  { name: "BBC Media Action", logo: "https://via.placeholder.com/140x60?text=BBC+Media" },
  { name: "Young Women in Action (YWA)", logo: "https://via.placeholder.com/140x60?text=YWA" },
  { name: "The Carter Center", logo: "https://via.placeholder.com/140x60?text=Carter+Center" },
  { name: "Bloggers of Zambia", logo: "https://via.placeholder.com/140x60?text=Bloggers+ZM" },
  { name: "Chapter One Foundation", logo: "https://via.placeholder.com/140x60?text=Chapter+One" },
  { name: "Internews", logo: "https://via.placeholder.com/140x60?text=Internews" },
  { name: "Disability Rights Watch (DRW)", logo: "https://via.placeholder.com/140x60?text=DRW" },
  { name: "MISA Zambia", logo: "https://via.placeholder.com/140x60?text=MISA" },
];

const sponsors = [
  { name: "Global Fokus", logo: "https://via.placeholder.com/140x60?text=Global+Fokus" },
  { name: "Danish Minorities Center", logo: "https://via.placeholder.com/140x60?text=Danish+Minorities" },
  { name: "SIDA", logo: "https://via.placeholder.com/140x60?text=SIDA" },
  { name: "UNESCO", logo: "https://via.placeholder.com/140x60?text=UNESCO" },
];

// ─── animation hook ──────────────────────────────────────────────────────────
function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(22px)",
      transition: `opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms`,
    } as React.CSSProperties,
  };
}

// ─── nav link ──────────────────────────────────────────────────────────────────
function NavLink({ to, label }: { to: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to={to}
      style={{
        fontSize: 13,
        color: hovered ? "#fff" : "rgba(255,255,255,0.42)",
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 0",
        transform: hovered ? "translateX(4px)" : "translateX(0)",
        transition: "color .2s, transform .2s",
        fontFamily: SANS,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          width: hovered ? 20 : 14,
          height: 1,
          background: RED,
          flexShrink: 0,
          display: "block",
          transition: "width .2s",
        }}
      />
      {label}
    </Link>
  );
}

// ─── stat badge ──────────────────────────────────────────────────────────────
function StatBadge({ num, label, delay }: { num: string; label: string; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const anim = useFadeUp(delay);
  return (
    <div
      ref={anim.ref}
      style={{
        ...anim.style,
        textAlign: "center",
        padding: "0.8rem .5rem",
        background: hovered ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
        borderRadius: 6,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "background .2s, transform .2s",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontFamily: SERIF, fontSize: "1rem", fontWeight: 900, color: RED, lineHeight: 1 }}>
        {num}
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", marginTop: 2, lineHeight: 1.3 }}>
        {label}
      </div>
    </div>
  );
}

// ─── PARTNER LOGO COMPONENT – uses useFadeUp correctly ──────────────────────
function PartnerLogo({ item, delay, type }: { item: { name: string; logo: string }; delay: number; type: "partner" | "sponsor" }) {
  const anim = useFadeUp(delay);

  return (
    <div
      ref={anim.ref}
      style={{
        ...anim.style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0.3rem 0.8rem",
        background: "rgba(255,255,255,0.04)",
        borderRadius: 6,
        border: "0.5px solid rgba(255,255,255,0.06)",
        height: 50,
        minWidth: 90,
        maxWidth: 150,
        flex: "1 1 auto",
        transition: "background 0.2s, transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "scale(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <img
        src={item.logo}
        alt={item.name}
        style={{
          maxWidth: "100%",
          maxHeight: "32px",
          objectFit: "contain",
          filter: "grayscale(0.6) brightness(1.2) contrast(0.8)",
          opacity: 0.7,
          transition: "opacity 0.2s, filter 0.2s",
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          const parent = e.currentTarget.parentNode as HTMLElement;
          const fallback = document.createElement("span");
          fallback.textContent = item.name;
          fallback.style.color = "rgba(255,255,255,0.5)";
          fallback.style.fontSize = "11px";
          fallback.style.fontWeight = "500";
          fallback.style.letterSpacing = "0.03em";
          fallback.style.textAlign = "center";
          parent.appendChild(fallback);
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLImageElement).style.opacity = "1";
          (e.target as HTMLImageElement).style.filter = "grayscale(0) brightness(1) contrast(1)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLImageElement).style.opacity = "0.7";
          (e.target as HTMLImageElement).style.filter = "grayscale(0.6) brightness(1.2) contrast(0.8)";
        }}
      />
    </div>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
const Footer = () => {
  const col1 = useFadeUp(100);
  const col2 = useFadeUp(200);
  const col3 = useFadeUp(300);
  const col4 = useFadeUp(400);
  const [ctaHovered, setCtaHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);
  const [whatsappHover, setWhatsappHover] = useState(false);

  return (
    <footer style={{ background: INK, color: "#fff", fontFamily: SANS, overflow: "hidden" }}>
      {/* top accent bar */}
      <div
        style={{
          height: 3,
          background: `linear-gradient(90deg, ${RED}, ${GOLD}, ${RED}, ${GOLD})`,
          backgroundSize: "300% 100%",
          animation: "gradientShift 4s ease infinite",
        }}
      />

      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-col-border {
            border-right: none !important;
            border-bottom: 0.5px solid rgba(255,255,255,0.07) !important;
          }
          .footer-col-padding {
            padding: 1.8rem !important;
          }
          .footer-stats-row {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .footer-copyright {
            flex-direction: column !important;
            text-align: center !important;
            padding: 1rem 1.5rem !important;
          }
          .footer-cta-buttons {
            flex-direction: column !important;
          }
          .footer-partners-sponsors {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .footer-partner-col, .footer-sponsor-col {
            max-width: 100% !important;
            flex: 1 1 auto !important;
          }
          .footer-partners-row {
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
          .footer-partner-item {
            flex: 0 0 45% !important;
            max-width: 140px !important;
          }
        }
      `}</style>

      {/* ── MAIN GRID ──────────────────────────────────────────────────────── */}
      <section
        className="footer-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1.2fr",
          borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* COLUMN 1: Brand + Contact + Stats */}
        <div
          ref={col1.ref}
          className="footer-col-border footer-col-padding"
          style={{
            ...col1.style,
            padding: "2.5rem",
            borderRight: "0.5px solid rgba(255,255,255,0.07)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          <div>
            <img src="/logo.png" alt="FPI Zambia" style={{ height: 50, width: "auto", display: "block", marginBottom: "1rem" }} />
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", margin: 0, maxWidth: 220 }}>
              Promoting media freedom, strengthening journalism and advancing democratic participation in Zambia.
            </p>
          </div>

          <div className="footer-stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
            {stats.map((s, i) => (
              <StatBadge key={s.label} num={s.num} label={s.label} delay={300 + i * 100} />
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {contactItems.map((item) => {
              const isLink = item.link && (item.text !== "Unit 2, Makishi Road, Rhodes Park, Lusaka");
              return (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.4)",
                    padding: "2px 0",
                    cursor: isLink ? "pointer" : "default",
                    transition: "color .2s, transform .2s",
                  }}
                  onMouseEnter={(e) => {
                    if (isLink) {
                      e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                      e.currentTarget.style.transform = "translateX(3px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isLink) {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }
                  }}
                >
                  {isLink ? (
                    <a
                      href={item.link}
                      target={item.text === "WhatsApp" ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 10, color: "inherit", textDecoration: "none", width: "100%" }}
                    >
                      <span style={{ color: item.text === "WhatsApp" ? "#25D366" : GOLD, display: "flex", flexShrink: 0 }}>
                        {item.icon}
                      </span>
                      {item.text}
                    </a>
                  ) : (
                    <>
                      <span style={{ color: GOLD, display: "flex", flexShrink: 0 }}>{item.icon}</span>
                      {item.text}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: Quick Links */}
        <div
          ref={col2.ref}
          className="footer-col-border footer-col-padding"
          style={{
            ...col2.style,
            padding: "2.5rem",
            borderRight: "0.5px solid rgba(255,255,255,0.07)",
          }}
        >
          <p style={{ fontFamily: SERIF, fontSize: "0.95rem", fontWeight: 700, color: "#fff", margin: "0 0 1.25rem" }}>
            Quick Links
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {quickLinks.map((l) => <NavLink key={l.to} {...l} />)}
          </div>
        </div>

        {/* COLUMN 3: Programs */}
        <div
          ref={col3.ref}
          className="footer-col-border footer-col-padding"
          style={{
            ...col3.style,
            padding: "2.5rem",
            borderRight: "0.5px solid rgba(255,255,255,0.07)",
          }}
        >
          <p style={{ fontFamily: SERIF, fontSize: "0.95rem", fontWeight: 700, color: "#fff", margin: "0 0 1.25rem" }}>
            Programs
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {programs.map((l) => <NavLink key={l.to} {...l} />)}
          </div>
        </div>

        {/* COLUMN 4: CTA */}
        <div
          ref={col4.ref}
          className="footer-col-padding"
          style={{
            ...col4.style,
            padding: "2.5rem",
            background: ctaHovered ? "rgba(201,41,58,0.12)" : "rgba(201,41,58,0.06)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.2rem",
            transition: `background .3s, ${col4.style.transition}`,
          }}
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
        >
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.6rem" }}>
              Connect
            </div>
            <h3 style={{ fontFamily: SERIF, fontSize: "1.2rem", fontWeight: 900, lineHeight: 1.2, color: "#fff", margin: "0 0 0.5rem" }}>
              Let's work together
            </h3>
            <p style={{ fontSize: 12, lineHeight: 1.7, color: "rgba(255,255,255,0.4)", margin: 0 }}>
              Reach out to partner, collaborate, or support our mission.
            </p>
          </div>

          <div className="footer-cta-buttons" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Link
              to="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: btnHovered ? 12 : 8,
                background: btnHovered ? "#b02030" : RED,
                color: "#fff",
                padding: "0.6rem 1.2rem",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                textDecoration: "none",
                width: "100%",
                transform: btnHovered ? "translateY(-2px)" : "translateY(0)",
                transition: "background .2s, transform .2s, gap .2s",
              }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
            >
              Contact Us <ArrowRight size={13} />
            </Link>

            <a
              href="https://wa.me/260954723936"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: whatsappHover ? 12 : 8,
                background: whatsappHover ? "#1da851" : "#25D366",
                color: "#fff",
                padding: "0.6rem 1.2rem",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                textDecoration: "none",
                width: "100%",
                transform: whatsappHover ? "translateY(-2px)" : "translateY(0)",
                transition: "background .2s, transform .2s, gap .2s",
              }}
              onMouseEnter={() => setWhatsappHover(true)}
              onMouseLeave={() => setWhatsappHover(false)}
            >
              <MessageCircle size={14} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ========== PARTNERS & SPONSORS – TWO COLUMNS WITH ANIMATION ========== */}
      <section
        style={{
          padding: "1.8rem 2.5rem",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div style={{ textAlign: "center", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
          Our Partners & Sponsors
        </div>

        <div className="footer-partners-sponsors" style={{ display: "flex", gap: "2rem", justifyContent: "center", alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Partners Column */}
          <div className="footer-partner-col" style={{ flex: "1 1 300px", maxWidth: "600px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: GOLD, marginBottom: "0.8rem", letterSpacing: "0.04em", textAlign: "center" }}>
              Partners
            </div>
            <div className="footer-partners-row" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              {partners.map((item, idx) => (
                <PartnerLogo key={item.name} item={item} delay={idx * 80} type="partner" />
              ))}
            </div>
          </div>

          {/* Sponsors Column */}
          <div className="footer-sponsor-col" style={{ flex: "1 1 300px", maxWidth: "600px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: GOLD, marginBottom: "0.8rem", letterSpacing: "0.04em", textAlign: "center" }}>
              Sponsors & Supporters
            </div>
            <div className="footer-partners-row" style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
              {sponsors.map((item, idx) => (
                <PartnerLogo key={item.name} item={item} delay={idx * 80 + 200} type="sponsor" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COPYRIGHT ───────────────────────────────────────────────────────── */}
      <section
        className="footer-copyright"
        style={{
          padding: "1rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", margin: 0 }}>
          © {new Date().getFullYear()} FPI Zambia. All rights reserved.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
          Built with purpose <ArrowRight size={12} />
        </div>
      </section>
    </footer>
  );
};

export default Footer;