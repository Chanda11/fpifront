import React from "react";
import {
  Vote,
  Users,
  MessageCircle,
  Lightbulb,
  ArrowRight,
  Heart,
  Target,
  Eye,
} from "lucide-react";

const BG = "/images/claim.jpg";

type SectionProps = React.PropsWithChildren<{
  overlay?: string;
  py?: number;
  center?: boolean;
  id?: string;
}>;

type LightSectionProps = React.PropsWithChildren<{
  py?: number;
  center?: boolean;
  id?: string;
}>;

type GradTextProps = React.PropsWithChildren<{
  size?: string;
}>;

// ---- Reusable components (same) ----
const BgSection = ({ children, overlay = "rgba(10,4,0,0.72)", py = 80, center = false, id = "" }: SectionProps) => (
  <section
    id={id}
    style={{
      position: "relative",
      padding: `${py}px 24px`,
      textAlign: center ? "center" : "left",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    />
    <div style={{ position: "absolute", inset: 0, background: overlay }} />
    <div
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  </section>
);

const LightSection = ({ children, py = 80, center = false, id = "" }: LightSectionProps) => (
  <section
    id={id}
    style={{
      position: "relative",
      padding: `${py}px 24px`,
      textAlign: center ? "center" : "left",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${BG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
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
    }}
  >
    {label}
  </span>
);

const GradText = ({ children, size = "clamp(1.8rem,4.5vw,3.2rem)" }: GradTextProps) => (
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
    }}
  >
    {children}
  </span>
);

// ---- Main Component ----
const ClaimYourSpace = () => {
  const pillars = [
    {
      icon: Vote,
      title: "Civic Education",
      desc: "Providing citizens with knowledge about their rights, responsibilities, and the democratic process.",
    },
    {
      icon: MessageCircle,
      title: "Public Dialogue",
      desc: "Creating safe spaces for open conversation on governance, development, and community priorities.",
    },
    {
      icon: Users,
      title: "Democratic Participation",
      desc: "Encouraging active engagement in elections, policy-making, and local decision‑making.",
    },
    {
      icon: Lightbulb,
      title: "Advocacy & Empowerment",
      desc: "Equipping citizens with the skills to advocate for change and hold leaders accountable.",
    },
  ];

  const stats = [
    { value: "1,000+", label: "Citizens Reached" },
    { value: "30+", label: "Public Dialogues" },
    { value: "50+", label: "Community Workshops" },
    { value: "15+", label: "Districts Engaged" },
  ];

  const audiences = [
    { emoji: "🗳️", title: "Voters", text: "Ordinary citizens who want to make their voices heard in elections and governance." },
    { emoji: "🧑‍🏫", title: "Youth", text: "Young people shaping the future through active participation and advocacy." },
    { emoji: "🏛️", title: "Local Leaders", text: "Community leaders, councillors, and traditional authorities seeking engagement." },
    { emoji: "🤝", title: "Civil Society", text: "Organisations working on democracy, governance, and human rights." },
  ];

  return (
    <div style={{ fontFamily: "'Inter','Helvetica Neue',sans-serif" }}>
      {/* HERO */}
      <BgSection
        overlay="linear-gradient(135deg,rgba(10,3,0,0.88) 0%,rgba(20,5,0,0.80) 60%,rgba(232,97,10,0.35) 100%)"
        py={110}
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
        <div style={{ maxWidth: 760 }}>
          <Pill label="Civic Participation" />
          <h1
            style={{
              fontFamily: "Georgia,serif",
              fontWeight: 900,
              lineHeight: 1.05,
              fontSize: "clamp(2.4rem,6vw,4.5rem)",
              color: "#fff",
              margin: "12px 0 6px",
            }}
          >
            Claim Your Space
          </h1>
          <div style={{ marginBottom: 18 }}>
            <GradText size="clamp(2.6rem,6.5vw,5rem)">Zambia</GradText>
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.62)",
              fontSize: "clamp(14px,1.8vw,17px)",
              lineHeight: 1.75,
              maxWidth: 560,
              marginBottom: 32,
            }}
          >
            Claim Your Space promotes civic participation, democratic engagement,
            and informed public dialogue by empowering citizens with knowledge
            and confidence.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a
              href="/cys/join"
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
              Join a Dialogue <ArrowRight size={16} />
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
                textDecoration: "none",
              }}
            >
              Learn More <Eye size={16} />
            </a>
          </div>
        </div>
      </BgSection>

      {/* MISSION */}
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
              }}
            >
              Empowering Citizens<br />for Democratic Change
            </h2>
            <p
              style={{
                color: "#6B3A2A",
                fontSize: 15,
                lineHeight: 1.75,
                marginBottom: 12,
              }}
            >
              Democracy thrives when citizens are informed, engaged, and
              confident. Claim Your Space breaks down barriers to participation
              and creates opportunities for every Zambian to have a say.
            </p>
            <p
              style={{
                color: "#6B3A2A",
                fontSize: 15,
                lineHeight: 1.75,
                marginBottom: 28,
              }}
            >
              Through public dialogues, civic education, and advocacy training,
              we are building a culture of active citizenship that holds leaders
              accountable and drives inclusive development.
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
                  }}
                >
                  Claim Your Space
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
                  }}
                >
                  Your voice, your power — claim your space in Zambia's democracy.
                </p>
                <p
                  style={{
                    color: "#E8610A",
                    fontSize: 12,
                    fontWeight: 700,
                    marginTop: 14,
                  }}
                >
                  Join the conversation →
                </p>
              </div>
            </div>
          </div>
        </div>
      </LightSection>

      {/* PILLARS */}
      <BgSection
        overlay="linear-gradient(160deg,rgba(10,3,0,0.88) 0%,rgba(201,41,58,0.30) 50%,rgba(10,3,0,0.88) 100%)"
        py={80}
        center
        id="pillars"
      >
        <Pill label="Core Focus" />
        <h2
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 900,
            fontSize: "clamp(1.5rem,3.5vw,2.5rem)",
            color: "#fff",
            margin: "8px 0 40px",
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
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </BgSection>

      {/* STATS */}
      <LightSection py={64} center>
        <Pill label="Our Impact" />
        <h2
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 900,
            fontSize: "clamp(1.5rem,3.5vw,2.5rem)",
            color: "#1A0A00",
            margin: "8px 0 40px",
          }}
        >
          Claim Your Space <GradText size="inherit">by the Numbers</GradText>
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
                }}
              >
                {s.value}
              </div>
              <p
                style={{
                  color: "#6B3A2A",
                  fontSize: 13,
                  marginTop: 6,
                }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </LightSection>

      {/* AUDIENCE */}
      <BgSection
        overlay="linear-gradient(135deg,rgba(10,3,0,.88) 0%,rgba(201,41,58,.45) 60%,rgba(10,3,0,.88) 100%)"
        py={80}
        center
      >
        <Pill label="Who We Serve" />
        <h2
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 900,
            fontSize: "clamp(1.5rem,3.5vw,2.5rem)",
            color: "#fff",
            margin: "8px 0 40px",
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
                }}
              >
                {item.title}
              </h3>
              <p style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.7)" }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </BgSection>

      {/* CTA */}
      <BgSection
        overlay="linear-gradient(135deg,rgba(10,3,0,.92),rgba(201,41,58,.55))"
        py={110}
        center
      >
        <Pill label="Take Action" />
        <h2
          style={{
            fontFamily: "Georgia,serif",
            fontWeight: 900,
            fontSize: "clamp(2rem,5vw,4rem)",
            color: "#fff",
            marginBottom: 20,
          }}
        >
          Claim Your
          <br />
          <GradText size="inherit">Space Today</GradText>
        </h2>
        <p
          style={{
            maxWidth: 700,
            margin: "0 auto 40px",
            color: "rgba(255,255,255,.75)",
            lineHeight: 1.8,
          }}
        >
          Whether you are a first‑time voter, a community organiser, or a
          seasoned activist, there is a place for you. Join our dialogues,
          access resources, and become a champion for democracy in Zambia.
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

export default ClaimYourSpace;