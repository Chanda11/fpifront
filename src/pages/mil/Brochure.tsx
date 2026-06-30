import {
  Download, FileText, BookOpen, Users, ArrowRight,
  ShieldCheck, Globe, Search, Eye, FileCheck2,
} from "lucide-react";

const BG = "/images/mb.jpg";

// Single source of truth for the brochure file — update here only.
const BROCHURE_PDF = "/documents/mil-brochure.pdf";
const BROCHURE_COVER = "/images/brochure-cover.jpg";

// Reusable section with background image bleed-through
const BgSection = ({
  children, overlay = "rgba(10,4,0,0.72)", py = 80, center = false, id = "",
}: {
  children: React.ReactNode; overlay?: string; py?: number; center?: boolean; id?: string;
}) => (
  <section id={id} style={{ position: "relative", padding: `${py}px 24px`, textAlign: center ? "center" : "left", overflow: "hidden" }}>
    {/* Background photo */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `url(${BG})`,
      backgroundSize: "cover", backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }} />
    {/* Dark tinted overlay */}
    <div style={{ position: "absolute", inset: 0, background: overlay }} />
    {/* Content */}
    <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
      {children}
    </div>
  </section>
);

// Light section — white card feel but image peeks at edges
const LightSection = ({
  children, py = 80, center = false, id = "",
}: {
  children: React.ReactNode; py?: number; center?: boolean; id?: string;
}) => (
  <section id={id} style={{ position: "relative", padding: `${py}px 24px`, textAlign: center ? "center" : "left", overflow: "hidden" }}>
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${BG})`, backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }} />
    <div style={{ position: "absolute", inset: 0, background: "rgba(255,248,240,0.93)" }} />
    <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto" }}>
      {children}
    </div>
  </section>
);

const Pill = ({ label }: { label: string }) => (
  <span style={{
    display: "inline-block", padding: "5px 14px", borderRadius: 999,
    background: "rgba(232,97,10,0.15)", color: "#E8610A",
    fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12
  }}>{label}</span>
);

const GradText = ({ children, size = "clamp(1.8rem,4.5vw,3.2rem)" }: { children: React.ReactNode; size?: string }) => (
  <span style={{
    fontFamily: "Georgia,serif", fontWeight: 900, fontSize: size,
    background: "linear-gradient(120deg,#E8610A,#F5A623)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    display: "inline-block", fontStyle: "italic"
  }}>{children}</span>
);

const Brochure = () => {
  const topics = [
    "Fact Checking", "Digital Citizenship", "Online Safety", "Critical Thinking",
    "Responsible Media Use", "Combating Misinformation", "Information Verification", "Media Awareness",
  ];

  const stats = [
    { value: "500+", label: "Learners Reached" },
    { value: "100+", label: "Workshops Conducted" },
    { value: "25+",  label: "Schools Engaged" },
    { value: "10+",  label: "Districts Reached" },
  ];

  return (
    <div style={{ fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <BgSection overlay="linear-gradient(135deg,rgba(10,3,0,0.88) 0%,rgba(20,5,0,0.80) 60%,rgba(232,97,10,0.35) 100%)" py={110}>
        {/* Top colour bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#C9293A,#E8610A,#F5A623,#E8610A,#C9293A)", zIndex: 2 }} />

        <div style={{ maxWidth: 760 }}>
          <Pill label="Media & Information Literacy" />

          <h1 style={{
            fontFamily: "Georgia,serif", fontWeight: 900, lineHeight: 1.05,
            fontSize: "clamp(2.4rem,6vw,4.5rem)", color: "#fff", margin: "12px 0 6px"
          }}>
            MIL
          </h1>
          <div style={{ marginBottom: 18 }}>
            <GradText size="clamp(2.6rem,6.5vw,5rem)">Brochure</GradText>
          </div>

          <p style={{ color: "rgba(255,255,255,0.62)", fontSize: "clamp(14px,1.8vw,17px)", lineHeight: 1.75, maxWidth: 560, marginBottom: 32 }}>
            Discover FPI Zambia's Media and Information Literacy initiatives, educational
            resources, community programs and opportunities that help citizens navigate
            today's information landscape responsibly.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a
              href={BROCHURE_PDF}
              download
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg,#C9293A,#E8610A)",
                color: "#fff", fontWeight: 700, fontSize: 14,
                padding: "12px 26px", borderRadius: 999, border: "none", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(201,41,58,0.45)", textDecoration: "none"
              }}>
              <Download size={16} /> Download Brochure
            </a>
            <a
              href={BROCHURE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(255,255,255,0.10)", backdropFilter: "blur(6px)",
                color: "#fff", fontWeight: 600, fontSize: 14,
                padding: "12px 26px", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.22)", cursor: "pointer", textDecoration: "none"
              }}>
              <Eye size={16} style={{ marginRight: -2 }} /> View Online
            </a>
          </div>
        </div>
      </BgSection>

      {/* ══ OVERVIEW ══════════════════════════════════════════════ */}
      <LightSection py={80}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 48, alignItems: "center" }}>

          {/* Text */}
          <div>
            <div style={{
              width: 52, height: 52, borderRadius: 14, marginBottom: 20,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg,#C9293A,#E8610A)"
            }}>
              <FileText size={24} color="#fff" />
            </div>

            <Pill label="About the Brochure" />
            <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 900, fontSize: "clamp(1.4rem,3vw,2.2rem)", lineHeight: 1.15, color: "#1A0A00", margin: "8px 0 14px" }}>
              Media &amp; Information<br />Literacy Guide
            </h2>
            <p style={{ color: "#6B3A2A", fontSize: 15, lineHeight: 1.75, marginBottom: 12 }}>
              This brochure introduces our MIL programs, educational campaigns, learning
              resources and community engagement initiatives.
            </p>
            <p style={{ color: "#6B3A2A", fontSize: 15, lineHeight: 1.75, marginBottom: 28 }}>
              It serves as a practical guide for individuals, schools, journalists, community
              leaders and institutions seeking to strengthen their ability to access, evaluate
              and use information responsibly.
            </p>
            <a
              href={BROCHURE_PDF}
              download
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg,#C9293A,#E8610A)",
                color: "#fff", fontWeight: 700, fontSize: 14,
                padding: "11px 24px", borderRadius: 999, border: "none", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(201,41,58,0.3)", textDecoration: "none"
              }}>
              <Download size={15} /> Download Brochure
            </a>
          </div>

          {/* Mockup card — links to the real PDF */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <a
              href={BROCHURE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "100%", maxWidth: 300,
                borderRadius: 24, overflow: "hidden",
                boxShadow: "0 24px 60px rgba(201,41,58,0.25)",
                transform: "rotate(-3deg)",
                transition: "transform 0.4s ease",
                display: "block", textDecoration: "none",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = "rotate(0deg)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = "rotate(-3deg)"}
            >
              {/* Card header */}
              <div style={{ background: "linear-gradient(135deg,#C9293A,#E8610A)", padding: "32px 28px", color: "#fff" }}>
                <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 12 }}>FPI Zambia</p>
                <h3 style={{ fontFamily: "Georgia,serif", fontWeight: 900, fontSize: 28, lineHeight: 1.15, margin: 0 }}>
                  Media &<br />Information<br />Literacy
                </h3>
              </div>
              {/* Card body */}
              <div style={{ background: "#fff", padding: "28px", textAlign: "center" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", margin: "0 auto 16px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "linear-gradient(135deg,rgba(201,41,58,0.1),rgba(232,97,10,0.12))"
                }}>
                  <BookOpen size={32} color="#E8610A" />
                </div>
                <p style={{ color: "#6B3A2A", fontSize: 13, lineHeight: 1.65, margin: 0 }}>
                  Building informed, critical and resilient communities through media literacy.
                </p>
                <p style={{ color: "#E8610A", fontSize: 12, fontWeight: 700, marginTop: 14 }}>
                  Click to open PDF →
                </p>
              </div>
            </a>
          </div>
        </div>
      </LightSection>

      {/* ═════════════ THE BROCHURE (single real document) ═════════════ */}
      <LightSection py={90} center>

        <Pill label="Official Document" />

        <h2
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 900,
            fontSize: "clamp(2rem,4vw,3rem)",
            color: "#1A0A00",
            marginBottom: 20,
          }}
        >
          The MIL Brochure
        </h2>

        <p
          style={{
            maxWidth: 640,
            margin: "0 auto 50px",
            color: "#6B3A2A",
            lineHeight: 1.8,
          }}
        >
          One official document — read it online or save a copy for offline
          reference, workshops and community outreach.
        </p>

        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            background: "#fff",
            borderRadius: 28,
            overflow: "hidden",
            boxShadow: "0 20px 55px rgba(0,0,0,.10)",
            display: "grid",
            gridTemplateColumns: "minmax(0,280px) 1fr",
            textAlign: "left",
          }}
          className="brochure-doc-card"
        >
          {/* Cover thumbnail, falls back gracefully if image is missing */}
          <div style={{ position: "relative", minHeight: 260, background: "linear-gradient(135deg,#C9293A,#E8610A)" }}>
            <img
              src={BROCHURE_COVER}
              alt="FPI Zambia MIL Brochure cover"
              style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
            <div style={{
              position: "absolute", top: 16, left: 16,
              background: "rgba(0,0,0,0.45)", color: "#fff",
              fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "5px 12px", borderRadius: 999,
            }}>
              PDF
            </div>
          </div>

          {/* Details + actions */}
          <div style={{ padding: 32, display: "flex", flexDirection: "column" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              color: "#E8610A", fontSize: 12, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10,
            }}>
              <FileCheck2 size={16} /> Media & Information Literacy
            </div>

            <h3 style={{ fontFamily: "Georgia,serif", fontWeight: 800, fontSize: 22, color: "#1A0A00", marginBottom: 10 }}>
              MIL Brochure — FPI Zambia
            </h3>

            <p style={{ color: "#6B3A2A", fontSize: 14, lineHeight: 1.75, marginBottom: 24, flex: 1 }}>
              A practical guide covering fact-checking, digital citizenship,
              online safety and community engagement — designed for students,
              journalists, schools and community leaders across Zambia.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a
                href={BROCHURE_PDF}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: "1 1 140px",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  textAlign: "center",
                  padding: "13px 18px",
                  background: "#E8610A",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                <Eye size={15} /> View
              </a>

              <a
                href={BROCHURE_PDF}
                download
                style={{
                  flex: "1 1 140px",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  textAlign: "center",
                  padding: "13px 18px",
                  background: "#C9293A",
                  color: "#fff",
                  textDecoration: "none",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                <Download size={15} /> Download
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 620px) {
            .brochure-doc-card { grid-template-columns: 1fr !important; }
          }
        `}</style>

      </LightSection>

      {/* ══ STATS ═════════════════════════════════════════════════ */}
      <BgSection overlay="linear-gradient(135deg,rgba(12,4,0,0.86) 0%,rgba(25,7,0,0.82) 100%)" py={64} center>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 10 }}>Our Impact</p>
        <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 900, fontSize: "clamp(1.5rem,3.5vw,2.5rem)", color: "#fff", margin: "0 0 40px" }}>
          FPI Zambia <GradText size="inherit">by the Numbers</GradText>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16 }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              borderRadius: 20, padding: "28px 16px", textAlign: "center",
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)"
            }}>
              <div style={{
                fontFamily: "Georgia,serif", fontWeight: 900, fontSize: "clamp(2rem,4vw,2.8rem)",
                background: "linear-gradient(120deg,#F5A623,#E8610A)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
              }}>{s.value}</div>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, marginTop: 6 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </BgSection>

      {/* ══ WHAT'S INSIDE ═════════════════════════════════════════ */}
      <LightSection py={80} center>
        <Pill label="Explore the Brochure" />
        <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 900, fontSize: "clamp(1.5rem,3.5vw,2.5rem)", color: "#1A0A00", margin: "8px 0 40px" }}>
          What's Inside?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20, textAlign: "left" }}>
          {[
            { Icon: BookOpen, title: "Educational Resources", desc: "Access learning materials, guides and tools designed to strengthen media literacy skills." },
            { Icon: Users,    title: "Community Programs",    desc: "Learn about outreach activities, workshops, campaigns and public awareness initiatives." },
            { Icon: FileText, title: "Opportunities",         desc: "Discover ways to collaborate, participate and support media literacy initiatives." },
          ].map(({ Icon, title, desc }, i) => (
            <div key={i} style={{
              borderRadius: 20, padding: 24,
              background: "linear-gradient(135deg,#FFF8F0,#FFF0E0)",
              border: "1px solid #FFE0C0",
              boxShadow: "0 3px 16px rgba(201,41,58,0.07)",
              transition: "transform .22s, box-shadow .22s"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(201,41,58,0.16)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 3px 16px rgba(201,41,58,0.07)"; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 13, marginBottom: 16,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg,#C9293A,#E8610A)"
              }}>
                <Icon size={22} color="#fff" />
              </div>
              <h3 style={{ fontFamily: "Georgia,serif", fontWeight: 700, fontSize: 16, color: "#1A0A00", margin: "0 0 8px" }}>{title}</h3>
              <p style={{ color: "#6B3A2A", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </LightSection>

      {/* ═════════════ TARGET AUDIENCE ═════════════ */}

      <LightSection py={80} center>

        <Pill label="Who Should Read It?" />

        <h2
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 900,
            fontSize: "clamp(2rem,4vw,3rem)",
            marginBottom: 50,
          }}
        >
          Designed For Everyone
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
            gap: 25,
          }}
        >

          {[
            { emoji: "🎓", title: "Students", text: "Learn critical thinking and responsible digital participation." },
            { emoji: "📰", title: "Journalists", text: "Strengthen ethical reporting and fact-checking skills." },
            { emoji: "🏫", title: "Schools", text: "Support Media & Information Literacy in classrooms." },
            { emoji: "👨‍👩‍👧‍👦", title: "Communities", text: "Empower citizens to identify misinformation." },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                padding: 35,
                borderRadius: 24,
                boxShadow: "0 10px 30px rgba(0,0,0,.08)",
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 18 }}>{item.emoji}</div>
              <h3 style={{ fontFamily: "Georgia,serif", marginBottom: 12 }}>{item.title}</h3>
              <p style={{ lineHeight: 1.8, color: "#6B3A2A" }}>{item.text}</p>
            </div>
          ))}

        </div>

      </LightSection>

      {/* ══ FEATURED TOPICS ═══════════════════════════════════════ */}
      <BgSection overlay="linear-gradient(160deg,rgba(10,3,0,0.88) 0%,rgba(201,41,58,0.30) 50%,rgba(10,3,0,0.88) 100%)" py={80} center>
        <Pill label="Key Learning Areas" />
        <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 900, fontSize: "clamp(1.5rem,3.5vw,2.5rem)", color: "#fff", margin: "8px 0 32px" }}>
          Featured Topics
        </h2>

        {/* Topic pills */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 48 }}>
          {topics.map((t, i) => (
            <span key={i} style={{
              padding: "8px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
              background: "rgba(232,97,10,0.18)", color: "#F5A623",
              border: "1px solid rgba(232,97,10,0.35)"
            }}>{t}</span>
          ))}
        </div>

        {/* Feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 16, textAlign: "left" }}>
          {[
            { Icon: Search,      title: "Fact Checking",      desc: "Learn practical methods for verifying information and identifying misleading content." },
            { Icon: ShieldCheck, title: "Online Safety",       desc: "Understand digital security, privacy and safe participation in online spaces." },
            { Icon: Globe,       title: "Digital Citizenship", desc: "Develop responsible and ethical behaviours in the digital environment." },
          ].map(({ Icon, title, desc }, i) => (
            <div key={i} style={{
              borderRadius: 20, padding: 24,
              background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              transition: "transform .22s, background .22s"
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(232,97,10,0.18)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.07)"; }}
            >
              <div style={{
                width: 46, height: 46, borderRadius: 12, marginBottom: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg,#C9293A,#E8610A)"
              }}>
                <Icon size={20} color="#fff" />
              </div>
              <h3 style={{ fontFamily: "Georgia,serif", fontWeight: 700, fontSize: 16, color: "#fff", margin: "0 0 8px" }}>{title}</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </BgSection>

      {/* ═════════════ FINAL CTA ═════════════ */}

      <BgSection
        overlay="linear-gradient(135deg,rgba(10,3,0,.92),rgba(201,41,58,.55))"
        py={110}
        center
      >

        <Pill label="Get Started" />

        <h2
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 900,
            fontSize: "clamp(2rem,5vw,4rem)",
            color: "#fff",
            marginBottom: 20,
          }}
        >
          Ready to Strengthen
          <br />
          <GradText size="inherit">Media Literacy?</GradText>
        </h2>

        <p
          style={{
            maxWidth: 700,
            margin: "0 auto 40px",
            color: "rgba(255,255,255,.75)",
            lineHeight: 1.8,
          }}
        >
          Download the official FPI Zambia Media &
          Information Literacy Brochure and discover
          practical tools, educational resources and
          community programmes promoting informed
          citizenship.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >

          <a
            href={BROCHURE_PDF}
            download
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#C9293A",
              padding: "16px 34px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            <Download size={16} /> Download Brochure
          </a>

          <a
            href="/mil"
            style={{
              border: "1px solid rgba(255,255,255,.3)",
              padding: "16px 34px",
              borderRadius: 12,
              textDecoration: "none",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Explore MIL
          </a>

        </div>

      </BgSection>

    </div>
  );
};

export default Brochure;