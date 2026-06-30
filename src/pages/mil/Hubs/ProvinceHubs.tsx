import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import {
  MapPin,
  Users,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Search,
  Building2,
  X,
  Calendar,
  Target,
  Phone,
} from "lucide-react";

type Hub = {
  id: number;
  name: string;
  slug: string;
  location: string;
  coordinator: string;
  participants: number;
  description: string;
  province: { name: string };
  established?: string;
  focusAreas?: string[];
  contact?: string;
};

// One accent palette per province so each region feels distinct
const PROVINCE_THEMES: Record<
  string,
  { gradient: string; soft: string; accent: string; icon: string }
> = {
  lusaka: { gradient: "linear-gradient(135deg,#2563EB,#7C3AED)", soft: "#EEF2FF", accent: "#2563EB", icon: "🏙️" },
  copperbelt: { gradient: "linear-gradient(135deg,#EA580C,#F59E0B)", soft: "#FFF7ED", accent: "#EA580C", icon: "⛏️" },
  eastern: { gradient: "linear-gradient(135deg,#16A34A,#65A30D)", soft: "#F0FDF4", accent: "#16A34A", icon: "🌾" },
  southern: { gradient: "linear-gradient(135deg,#0891B2,#06B6D4)", soft: "#ECFEFF", accent: "#0891B2", icon: "🌊" },
  default: { gradient: "linear-gradient(135deg,#DB2777,#9333EA)", soft: "#FDF4FF", accent: "#DB2777", icon: "📍" },
};

const provinceData: Record<string, Hub[]> = {
  lusaka: [
    { id: 1, name: "Matero MIL Hub", slug: "matero", location: "Matero", coordinator: "FPI Zambia", participants: 450, description: "Providing Media & Information Literacy training for youth and community leaders.", province: { name: "Lusaka" } },
    { id: 2, name: "Lusaka West Hub", slug: "lusaka-west", location: "Lusaka West", coordinator: "FPI Zambia", participants: 380, description: "Community engagement through media literacy and digital citizenship.", province: { name: "Lusaka" } },
    { id: 3, name: "Lusaka East Hub", slug: "lusaka-east", location: "Lusaka East", coordinator: "FPI Zambia", participants: 290, description: "Supporting schools and communities with MIL programmes.", province: { name: "Lusaka" } },
    { id: 4, name: "Chongwe Hub", slug: "chongwe", location: "Chongwe", coordinator: "FPI Zambia", participants: 210, description: "Promoting access to trusted information and digital literacy.", province: { name: "Lusaka" } },
    { id: 5, name: "Kafue Hub", slug: "kafue", location: "Kafue", coordinator: "FPI Zambia", participants: 340, description: "Building resilient communities through media education.", province: { name: "Lusaka" } },
    { id: 6, name: "Mutendere Hub", slug: "mutendere", location: "Mutendere", coordinator: "FPI Zambia", participants: 320, description: "Youth-focused Media & Information Literacy initiatives.", province: { name: "Lusaka" } },
    { id: 7, name: "Lusaka North Hub", slug: "lusaka-north", location: "Lusaka North", coordinator: "FPI Zambia", participants: 280, description: "Empowering communities through responsible media use.", province: { name: "Lusaka" } },
  ],
  copperbelt: [
    { id: 8, name: "Ndola Hub", slug: "ndola", location: "Ndola", coordinator: "FPI Zambia", participants: 400, description: "Digital literacy and community media programmes.", province: { name: "Copperbelt" } },
    { id: 9, name: "Kitwe Hub", slug: "kitwe", location: "Kitwe", coordinator: "FPI Zambia", participants: 370, description: "Fact-checking and media literacy workshops.", province: { name: "Copperbelt" } },
    { id: 10, name: "Mufulira Hub", slug: "mufulira", location: "Mufulira", coordinator: "FPI Zambia", participants: 250, description: "Community engagement through civic education.", province: { name: "Copperbelt" } },
  ],
  eastern: [
    { id: 11, name: "Chipata Hub", slug: "chipata", location: "Chipata", coordinator: "FPI Zambia", participants: 310, description: "Media literacy and digital resilience training.", province: { name: "Eastern" } },
    { id: 12, name: "Petauke Hub", slug: "petauke", location: "Petauke", coordinator: "FPI Zambia", participants: 190, description: "Community awareness and responsible media use.", province: { name: "Eastern" } },
  ],
  southern: [
    { id: 13, name: "Mazabuka Hub", slug: "mazabuka", location: "Mazabuka", coordinator: "FPI Zambia", participants: 260, description: "Promoting Media & Information Literacy among young people.", province: { name: "Southern" } },
  ],
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
    },
  }),
};

const ProvinceHubs = () => {
  const { province } = useParams();
  const [search, setSearch] = useState("");
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [province]);

  useEffect(() => {
    if (!selectedHub) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSelectedHub(null);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedHub]);

  const key = province?.toLowerCase() || "";
  const provinceHubs = provinceData[key] || [];
  const theme = PROVINCE_THEMES[key] || PROVINCE_THEMES.default;
  const displayName = province
    ? province.charAt(0).toUpperCase() + province.slice(1)
    : "Unknown";

  const totalParticipants = useMemo(
    () => provinceHubs.reduce((sum, hub) => sum + hub.participants, 0),
    [provinceHubs]
  );

  const filteredHubs = useMemo(() => {
    if (!search.trim()) return provinceHubs;
    const q = search.toLowerCase();
    return provinceHubs.filter(
      (hub) =>
        hub.name.toLowerCase().includes(q) ||
        hub.location.toLowerCase().includes(q)
    );
  }, [provinceHubs, search]);

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#FAFBFF", minHeight: "100vh", color: "#1A1A2E" }}>
      {/* =============== HERO =============== */}
      <section
        style={{
          background: theme.gradient,
          padding: "64px 24px 90px",
          position: "relative",
          overflow: "hidden",
          color: "#fff",
        }}
      >
        <div style={{ position: "absolute", top: -120, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -100, left: -60, width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Link
            to="/mil/hubs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "rgba(255,255,255,0.85)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              marginBottom: 28,
            }}
          >
            <ArrowLeft size={14} /> All Provinces
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <span style={{ fontSize: 34, lineHeight: 1 }}>{theme.icon}</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(255,255,255,0.16)",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "5px 14px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              <Sparkles size={12} /> MIL Province Hubs
            </span>
          </div>

          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 900,
              fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            {displayName} Province
          </h1>
          <p style={{ maxWidth: 520, fontSize: 15, lineHeight: 1.7, color: "rgba(255,255,255,0.85)", marginBottom: 36 }}>
            Media & Information Literacy hubs working with communities across{" "}
            {displayName} to build critical thinking, digital safety and access
            to trusted information.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <div style={statPillStyle}>
              <Building2 size={16} />
              <div>
                <div style={statValueStyle}>{provinceHubs.length}</div>
                <div style={statLabelStyle}>Active Hubs</div>
              </div>
            </div>
            <div style={statPillStyle}>
              <Users size={16} />
              <div>
                <div style={statValueStyle}>{totalParticipants.toLocaleString()}</div>
                <div style={statLabelStyle}>Participants Reached</div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 48,
            background: "#FAFBFF",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        />
      </section>

      {/* =============== HUBS GRID =============== */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 90px" }}>
        {provinceHubs.length > 0 && (
          <div
            style={{
              position: "relative",
              maxWidth: 380,
              margin: "-32px auto 44px",
              zIndex: 2,
            }}
          >
            <Search size={16} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search hubs in ${displayName}...`}
              aria-label="Search hubs"
              style={{
                width: "100%",
                padding: "14px 18px 14px 44px",
                borderRadius: 14,
                border: "1px solid #E5E7EB",
                background: "#fff",
                fontSize: 13,
                outline: "none",
                boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
              }}
            />
          </div>
        )}

        {provinceHubs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              background: "#fff",
              border: "1px solid #EEF0F4",
              borderRadius: 24,
              padding: "70px 24px",
              boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
            }}
          >
            <div style={{ fontSize: 44, marginBottom: 16 }}>🗺️</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, marginBottom: 8, color: "#1A1A2E" }}>
              No hubs found for "{province}"
            </h2>
            <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 26 }}>
              We haven't listed any MIL hubs for this province yet. Explore the
              provinces below instead.
            </p>
            <Link
              to="/mil/hubs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: PROVINCE_THEMES.default.gradient,
                color: "#fff",
                padding: "12px 26px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              View All Provinces <ArrowRight size={14} />
            </Link>
          </div>
        ) : filteredHubs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#6B7280", fontSize: 13 }}>
            No hubs match “{search}”. Try a different search.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {filteredHubs.map((hub, i) => (
              <motion.div
                key={hub.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={cardVariants}
                whileHover={{ y: -6 }}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "1px solid #EEF0F4",
                  boxShadow: "0 4px 16px rgba(15,23,42,0.05)",
                  display: "flex",
                  flexDirection: "column",
                  transition: "box-shadow 0.25s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 20px 44px rgba(15,23,42,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(15,23,42,0.05)")}
              >
                <div style={{ height: 6, background: theme.gradient }} />

                <div style={{ padding: "24px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: theme.soft,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                      fontSize: 20,
                    }}
                  >
                    {theme.icon}
                  </div>

                  <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 6, fontFamily: "Georgia, serif", color: "#1A1A2E" }}>
                    {hub.name}
                  </h3>

                  <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.6, marginBottom: 18, flex: 1 }}>
                    {hub.description}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 10,
                      fontSize: 11.5,
                      color: theme.accent,
                      marginBottom: 18,
                    }}
                  >
                    <span style={badgeStyle(theme.soft, theme.accent)}>
                      <MapPin size={11} /> {hub.location}
                    </span>
                    <span style={badgeStyle(theme.soft, theme.accent)}>
                      <Users size={11} /> {hub.participants.toLocaleString()} reached
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #F1F2F6", paddingTop: 16 }}>
                    <span style={{ fontSize: 11.5, color: "#9CA3AF" }}>
                      Coordinated by <strong style={{ color: "#374151" }}>{hub.coordinator}</strong>
                    </span>
                    <button
                      onClick={() => setSelectedHub(hub)}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 12,
                        fontWeight: 700,
                        color: theme.accent,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      Details <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* =============== HUB DETAIL MODAL =============== */}
      {selectedHub && (
        <div
          onClick={() => setSelectedHub(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedHub.name}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15,23,42,0.55)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            zIndex: 9999,
            animation: "hubFadeBackdrop 0.2s ease",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 24,
              maxWidth: 520,
              width: "100%",
              maxHeight: "88vh",
              overflowY: "auto",
              boxShadow: "0 40px 90px rgba(0,0,0,0.3)",
              animation: "hubFadeIn 0.25s ease",
              position: "relative",
            }}
          >
            <div style={{ height: 84, background: theme.gradient, position: "relative" }}>
              <button
                onClick={() => setSelectedHub(null)}
                aria-label="Close details"
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "none",
                  background: "rgba(255,255,255,0.2)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
              <div
                style={{
                  position: "absolute",
                  bottom: -28,
                  left: 28,
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                }}
              >
                {theme.icon}
              </div>
            </div>

            <div style={{ padding: "44px 28px 32px" }}>
              <span
                style={{
                  display: "inline-block",
                  background: theme.soft,
                  color: theme.accent,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  padding: "4px 12px",
                  borderRadius: 999,
                  marginBottom: 12,
                }}
              >
                {selectedHub.province.name} Province
              </span>

              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: 800,
                  fontSize: 22,
                  color: "#1A1A2E",
                  marginBottom: 10,
                }}
              >
                {selectedHub.name}
              </h2>

              <p style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.75, marginBottom: 22 }}>
                {selectedHub.description} This hub runs regular sessions for
                community members, students and local leaders, covering topics
                such as identifying misinformation, safe digital practices and
                how to access verified, trustworthy information sources.
                Activities are delivered in partnership with local schools,
                civil society groups and community radio stations to ensure
                the programme reaches as many people as possible.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                  marginBottom: 22,
                }}
              >
                <div style={detailStatStyle(theme.soft)}>
                  <MapPin size={15} color={theme.accent} />
                  <div>
                    <div style={detailStatLabel}>Location</div>
                    <div style={detailStatValue}>{selectedHub.location}</div>
                  </div>
                </div>
                <div style={detailStatStyle(theme.soft)}>
                  <Users size={15} color={theme.accent} />
                  <div>
                    <div style={detailStatLabel}>Participants Reached</div>
                    <div style={detailStatValue}>{selectedHub.participants.toLocaleString()}</div>
                  </div>
                </div>
                <div style={detailStatStyle(theme.soft)}>
                  <Calendar size={15} color={theme.accent} />
                  <div>
                    <div style={detailStatLabel}>Coordinator</div>
                    <div style={detailStatValue}>{selectedHub.coordinator}</div>
                  </div>
                </div>
                <div style={detailStatStyle(theme.soft)}>
                  <Target size={15} color={theme.accent} />
                  <div>
                    <div style={detailStatLabel}>Focus</div>
                    <div style={detailStatValue}>Media & Info Literacy</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#F8FAFC",
                  border: "1px solid #EEF0F4",
                  borderRadius: 14,
                  padding: "14px 16px",
                  marginBottom: 24,
                  fontSize: 12.5,
                  color: "#6B7280",
                }}
              >
                <Phone size={15} color={theme.accent} />
                For partnership or visit enquiries, reach out via the FPI
                Zambia contact page and reference this hub by name.
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => setSelectedHub(null)}
                  style={{
                    padding: "13px 20px",
                    borderRadius: 12,
                    border: "1px solid #E5E7EB",
                    background: "#fff",
                    color: "#374151",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes hubFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes hubFadeBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
};

const statPillStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.25)",
  borderRadius: 16,
  padding: "12px 18px",
  backdropFilter: "blur(6px)",
};

const statValueStyle: React.CSSProperties = {
  fontFamily: "Georgia, serif",
  fontWeight: 900,
  fontSize: 20,
  lineHeight: 1.1,
};

const statLabelStyle: React.CSSProperties = {
  fontSize: 10.5,
  color: "rgba(255,255,255,0.75)",
};

const badgeStyle = (bg: string, color: string): React.CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  background: bg,
  color,
  padding: "5px 10px",
  borderRadius: 999,
  fontWeight: 600,
});

const detailStatStyle = (bg: string): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  gap: 10,
  background: bg,
  borderRadius: 12,
  padding: "12px 14px",
});

const detailStatLabel: React.CSSProperties = {
  fontSize: 10.5,
  color: "#6B7280",
  marginBottom: 2,
};

const detailStatValue: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: "#1A1A2E",
};

export default ProvinceHubs;