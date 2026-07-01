import React from "react";
import {
  Users,
  MessageCircle,
  Globe,
  ShieldCheck,
  ArrowRight,
  Heart,
  Target,
  Eye,
} from "lucide-react";

const BG = "/images/school1.jpg";

// ─── Mobile-safety styles ──────────────────────────────────────
// 1. backgroundAttachment:"fixed" is intentionally NOT used anywhere
//    below — it fails to render / crops badly on many mobile browsers
//    (especially iOS Safari).
// 2. The hero uses 100dvh (dynamic viewport height) with a 100vh
//    fallback, so it fills the visible screen correctly even as the
//    mobile browser's address bar shows/hides — plain 100vh alone
//    can cause the hero to be taller than the visible area on phones,
//    making it look "cut off" until you scroll.
const MobileFix = () => (
  <style>{`
    .funsani-bg {
      background-position: center top !important;
      background-repeat: no-repeat;
    }
    .funsani-hero {
      min-height: 100vh;
      min-height: 100dvh;
    }
    @media (max-width: 480px) {
      .funsani-hero {
        padding-top: 90px !important;
        padding-bottom: 60px !important;
      }
    }
  `}</style>
);

// ---- Reusable layout components ----
const BgSection = ({
  children,
  overlay = "rgba(10,4,0,0.72)",
  py = 80,
  center = false,
  id = "",
  className = "",
  fill = false,
}: {
  children: React.ReactNode;
  overlay?: string;
  py?: number;
  center?: boolean;
  id?: string;
  className?: string;
  fill?: boolean;
}) => (
  <section
    id={id}
    className={className}
    style={{
      position: "relative",
      padding: `${py}px 24px`,
      textAlign: center ? "center" : "left",
      overflow: "hidden",
      width: "100%",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...(fill
        ? { flex: 1, flexDirection: "column" as const }
        : {}),
    }}
  >
    <div
      className="funsani-bg"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <div style={{ position: "absolute", inset: 0, background: overlay }} />
    <div
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {children}
    </div>
  </section>
);

const LightSection = ({
  children,
  py = 80,
  center = false,
  id = "",
}: {
  children: React.ReactNode;
  py?: number;
  center?: boolean;
  id?: string;
}) => (
  <section
    id={id}
    style={{
      position: "relative",
      padding: `${py}px 24px`,
      textAlign: center ? "center" : "left",
      overflow: "hidden",
      width: "100%",
      boxSizing: "border-box",
    }}
  >
    <div
      className="funsani-bg"
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(255,248,240,0.93)",
      }}
    />
    <div
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {children}
    </div>
  </section>
);

const Pill = ({ label }: { label: string }) => (
  <span
    style={{
      display: "inline-block",
      padding: "5px 14px",
      borderRadius: 999,
      background: "rgba(232,97,10,0.15)",
      color: "#E8610A",
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      marginBottom: 12,
      textDecoration: "none",
    }}
  >
    {label}
  </span>
);

const GradText = ({
  children,
  size = "clamp(1.8rem,4.5vw,3.2rem)",
}: {
  children: React.ReactNode;
  size?: string;
}) => (
  <span
    style={{
      fontFamily: "Georgia,serif",
      fontWeight: 900,
      fontSize: size,
      background: "linear-gradient(120deg,#E8610A,#F5A623)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      display: "inline-block",
      fontStyle: "italic",
      textDecoration: "none",
    }}
  >
    {children}
  </span>
);

// ---- Main Component ----
const Funsani = () => {
  const pillars = [
    {
      icon: Globe,
      title: "Access to Information",
      desc: "Empowering communities with the knowledge they need to make informed decisions and hold leaders accountable.",
    },
    {
      icon: Users,
      title: "Citizen Engagement",
      desc: "Creating platforms for citizens to participate in governance, voice concerns, and shape public policy.",
    },
    {
      icon: ShieldCheck,
      title: "Inclusive Governance",
      desc: "Promoting transparency, equity, and inclusion in decision-making processes at all levels.",
    },
    {
      icon: MessageCircle,
      title: "Community Dialogues",
      desc: "Facilitating open conversations that bridge divides and build consensus on key community issues.",
    },
  ];

  const stats = [
    { value: "1,200+", label: "Citizens Reached" },
    { value: "45+", label: "Community Dialogues" },
    { value: "30+", label: "Partner Organisations" },
    { value: "18+", label: "Districts Engaged" },
  ];

  const audiences = [
    { emoji: "👥", title: "Citizens", text: "Everyday people seeking a voice in the decisions that affect their lives." },
    { emoji: "🏛️", title: "Local Leaders", text: "Traditional leaders, councillors, and local government officials." },
    { emoji: "📢", title: "Civil Society", text: "NGOs and community-based organisations working on governance." },
    { emoji: "🧑‍🎓", title: "Youth", text: "Young activists and future leaders building their civic skills." },
  ];

  return (
    <div
      style={{
        fontFamily: "'Inter','Helvetica Neue',sans-serif",
        width: "100%",
        overflowX: "hidden",
        textDecoration: "none",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MobileFix />

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <BgSection
        overlay="linear-gradient(135deg,rgba(10,3,0,0.88) 0%,rgba(20,5,0,0.80) 60%,rgba(232,97,10,0.35) 100%)"
        py={110}
        className="funsani-hero"
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              "linear-gradient(90deg,#C9293A,#E8610A,#F5A623,#E8610A,#C9293A)",
            zIndex: 2,
          }}
        />
        <div style={{ maxWidth: 760, width: "100%", margin: "0 auto" }}>
          <Pill label="Community Empowerment" />
          <h1
            style={{
              fontFamily: "Georgia,serif",
              fontWeight: 900,
              lineHeight: 1.05,
              fontSize: "clamp(2.2rem,6vw,4.5rem)",
              color: "#fff",
              margin: "12px 0 6px",
              textDecoration: "none",
            }}
          >
            Funsani
          </h1>
          <div style={{ marginBottom: 18 }}>
            <GradText size="clamp(2.2rem,6.5vw,5rem)">Zambia</GradText>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: "clamp(14px,1.8vw,17px)",
              lineHeight: 1.75,
              maxWidth: 560,
              marginBottom: 32,
              marginLeft: "auto",
              marginRight: "auto",
              textDecoration: "none",
            }}
          >
            Funsani is a community empowerment initiative that promotes access
            to information, citizen engagement, and inclusive participation in
            governance.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <a
              href="/funsani/join"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg,#C9293A,#E8610A)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                padding: "12px 26px",
                borderRadius: 999,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(201,41,58,0.45)",
              }}
            >
              Get Involved <ArrowRight size={16} />
            </a>
            <a
              href="#mission"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(6px)",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                padding: "12px 26px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.22)",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Learn More <Eye size={16} />
            </a>
          </div>
        </div>
      </BgSection>

      {/* ══ MISSION ════════════════════════════════════════════════ */}
      <LightSection py={80} id="mission">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg,#C9293A,#E8610A)",
              }}
            >
              <Heart size={24} color="#fff" />
            </div>
            <Pill label="Our Mission" />
            <h2
              style={{
                fontFamily: "Georgia,serif",
                fontWeight: 900,
                fontSize: "clamp(1.4rem,3vw,2.2rem)",
                lineHeight: 1.15,
                color: "#1A0A00",
                margin: "8px 0 14px",
                textDecoration: "none",
              }}
            >
              Empowering Communities<br />for Inclusive Governance
            </h2>
            <p
              style={{
                color: "#6B3A2A",
                fontSize: 15,
                lineHeight: 1.75,
                marginBottom: 12,
                textDecoration: "none",
              }}
            >
              Funsani works to bridge the gap between citizens and decision‑makers.
              We believe that informed and engaged communities are the bedrock of
              a healthy democracy.
            </p>
            <p
              style={{
                color: "#6B3A2A",
                fontSize: 15,
                lineHeight: 1.75,
                marginBottom: 28,
                textDecoration: "none",
              }}
            >
              Through public dialogues, information campaigns, and capacity‑building
              workshops, we equip Zambians to actively shape the policies and
              programmes that affect their lives.
            </p>
            <a
              href="#pillars"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg,#C9293A,#E8610A)",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                padding: "11px 24px",
                borderRadius: 999,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(201,41,58,0.3)",
              }}
            >
              Our Pillars <ArrowRight size={15} />
            </a>
          </div>

          {/* Mockup Card */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "100%",
                maxWidth: 300,
                borderRadius: 24,
                overflow: "hidden",
                boxShadow: "0 24px 60px rgba(201,41,58,0.25)",
                transform: "rotate(-3deg)",
                transition: "transform 0.4s ease",
                background: "#fff",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget as HTMLDivElement).style.transform =
                  "rotate(0deg)"
              }
              onMouseLeave={(e) =>
                (e.currentTarget as HTMLDivElement).style.transform =
                  "rotate(-3deg)"
              }
            >
              <div
                style={{
                  background: "linear-gradient(135deg,#C9293A,#E8610A)",
                  padding: "32px 28px",
                  color: "#fff",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: 12,
                    textDecoration: "none",
                  }}
                >
                  FPI Zambia
                </p>
                <h3
                  style={{
                    fontFamily: "Georgia,serif",
                    fontWeight: 900,
                    fontSize: 28,
                    lineHeight: 1.15,
                    margin: 0,
                    textDecoration: "none",
                  }}
                >
                  Funsani
                </h3>
              </div>
              <div style={{ padding: "28px", textAlign: "center" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(135deg,rgba(201,41,58,0.1),rgba(232,97,10,0.12))",
                  }}
                >
                  <Target size={32} color="#E8610A" />
                </div>
                <p
                  style={{
                    color: "#6B3A2A",
                    fontSize: 13,
                    lineHeight: 1.65,
                    margin: 0,
                    textDecoration: "none",
                  }}
                >
                  Your voice, your power — together we build a better Zambia.
                </p>
                <p
                  style={{
                    color: "#E8610A",
                    fontSize: 12,
                    fontWeight: 700,
                    marginTop: 14,
                    textDecoration: "none",
                  }}
                >
                  Join the conversation →
                </p>
              </div>
            </div>
          </div>
        </div>
      </LightSection>

      {/* ══ PILLARS ════════════════════════════════════════════════ */}
      <BgSection
        overlay="linear-gradient(160deg,rgba(10,3,0,0.88) 0%,rgba(201,41,58,0.30) 50%,rgba(10,3,0,0.88) 100%)"
        py={80}
        center
        id="pillars"
      >
        <div style={{ width: "100%" }}>
          <Pill label="Core Focus" />
          <h2
            style={{
              fontFamily: "Georgia,serif",
              fontWeight: 900,
              fontSize: "clamp(1.5rem,3.5vw,2.5rem)",
              color: "#fff",
              margin: "8px 0 40px",
              textDecoration: "none",
            }}
          >
            Our Pillars
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
              gap: 20,
              textAlign: "left",
            }}
          >
            {pillars.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 20,
                  padding: 24,
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                  transition: "transform .22s, background .22s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(232,97,10,0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(255,255,255,0.07)";
                }}
              >
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    marginBottom: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "linear-gradient(135deg,#C9293A,#E8610A)",
                  }}
                >
                  <Icon size={20} color="#fff" />
                </div>
                <h3
                  style={{
                    fontFamily: "Georgia,serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#fff",
                    margin: "0 0 8px",
                    textDecoration: "none",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: 13,
                    lineHeight: 1.7,
                    margin: 0,
                    textDecoration: "none",
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BgSection>

      {/* ══ STATS ════════════════════════════════════════════════════ */}
      <LightSection py={64} center>
        <Pill label="Our Impact" />
        <h2
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 900,
            fontSize: "clamp(1.5rem,3.5vw,2.5rem)",
            color: "#1A0A00",
            margin: "8px 0 40px",
            textDecoration: "none",
          }}
        >
          Funsani <GradText size="inherit">by the Numbers</GradText>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
            gap: 16,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                borderRadius: 20,
                padding: "28px 16px",
                textAlign: "center",
                background: "#fff",
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                border: "1px solid rgba(201,41,58,0.08)",
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia,serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem,4vw,2.8rem)",
                  background: "linear-gradient(120deg,#E8610A,#F5A623)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textDecoration: "none",
                }}
              >
                {s.value}
              </div>
              <p
                style={{
                  color: "#6B3A2A",
                  fontSize: 13,
                  marginTop: 6,
                  textDecoration: "none",
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </LightSection>

      {/* ══ AUDIENCE ═══════════════════════════════════════════════ */}
      <BgSection
        overlay="linear-gradient(135deg,rgba(10,3,0,.88) 0%,rgba(201,41,58,.45) 60%,rgba(10,3,0,.88) 100%)"
        py={80}
        center
      >
        <div style={{ width: "100%" }}>
          <Pill label="Who We Serve" />
          <h2
            style={{
              fontFamily: "Georgia,serif",
              fontWeight: 900,
              fontSize: "clamp(1.5rem,3.5vw,2.5rem)",
              color: "#fff",
              margin: "8px 0 40px",
              textDecoration: "none",
            }}
          >
            Designed for Everyone
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
              gap: 25,
            }}
          >
            {audiences.map((item, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(8px)",
                  padding: 35,
                  borderRadius: 24,
                  border: "1px solid rgba(255,255,255,0.12)",
                  transition: "transform .22s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(-4px)"
                }
                onMouseLeave={(e) =>
                  (e.currentTarget as HTMLDivElement).style.transform =
                    "translateY(0)"
                }
              >
                <div style={{ fontSize: 48, marginBottom: 18 }}>{item.emoji}</div>
                <h3
                  style={{
                    fontFamily: "Georgia,serif",
                    marginBottom: 12,
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BgSection>

      {/* ══ CTA ════════════════════════════════════════════════════ */}
      <BgSection
        overlay="linear-gradient(135deg,rgba(10,3,0,.92),rgba(201,41,58,.55))"
        py={110}
        center
        fill
      >
        <Pill label="Take Action" />
        <h2
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 900,
            fontSize: "clamp(2rem,5vw,4rem)",
            color: "#fff",
            marginBottom: 20,
            textDecoration: "none",
          }}
        >
          Join the
          <br />
          <GradText size="inherit">Funsani Movement</GradText>
        </h2>
        <p
          style={{
            maxWidth: 700,
            margin: "0 auto 40px",
            color: "rgba(255,255,255,.75)",
            lineHeight: 1.8,
            textDecoration: "none",
          }}
        >
          Whether you are a citizen, a community leader, or an organisation,
          your voice matters. Together we can build a more inclusive,
          transparent, and responsive Zambia.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
        </div>
      </BgSection>
    </div>
  );
};

export default Funsani;