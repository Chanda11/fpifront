import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  Search,
  Radio,
  Play,
  ExternalLink,
  Calendar,
  Clock3,
  ArrowRight,
  Headphones,
  Mic2,
  Users,
  Shield,
  X,
} from "lucide-react";

/**
 * Each spot now points at a real YouTube video.
 * youtubeId is the only thing you need to change when new episodes go live —
 * everything else (thumbnail, embed, link out) derives from it.
 */
type Spot = {
  id: number;
  title: string;
  station: string;
  date: string;
  duration: string;
  year: string;
  youtubeId: string;
  description: string;
};

const spots: Spot[] = [
  {
    id: 1,
    title: "Fighting Misinformation",
    station: "ZNBC Radio 2",
    date: "18 June 2026",
    duration: "18 Minutes",
    year: "2026",
    youtubeId: "TgCUK9BprvI",
    description:
      "Helping communities identify misinformation and fake news.",
  },
  {
    id: 2,
    title: "Digital Citizenship",
    station: "Radio Phoenix",
    date: "10 June 2026",
    duration: "15 Minutes",
    year: "2026",
    youtubeId: "XDffqk3HA3Y",
    description: "Responsible participation on digital platforms.",
  },
  {
    id: 3,
    title: "Media Freedom",
    station: "Hot FM",
    date: "28 May 2026",
    duration: "20 Minutes",
    year: "2026",
    youtubeId: "FiWRO9zUuFw",
    description: "Understanding the role of independent media.",
  },
  {
    id: 4,
    title: "Fact Checking",
    station: "Breeze FM",
    date: "12 December 2025",
    duration: "16 Minutes",
    year: "2025",
    youtubeId: "RRSKPbO0twM",
    description: "Practical techniques for verifying information.",
  },
];

const thumb = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
const embedUrl = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;

export default function RadioSpots() {
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("All");
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    return spots.filter((spot) => {
      const matchYear = year === "All" || spot.year === year;
      const matchSearch =
        spot.title.toLowerCase().includes(search.toLowerCase()) ||
        spot.station.toLowerCase().includes(search.toLowerCase());
      return matchYear && matchSearch;
    });
  }, [search, year]);

  // Close modal on Escape, lock body scroll while open
  useEffect(() => {
    if (!selectedSpot) return;
    const onKey = (e: { key: string; }) => e.key === "Escape" && setSelectedSpot(null);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modalRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedSpot]);

  const scrollToEpisodes = () => {
    document.getElementById("episodes")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#F8F6F3", minHeight: "100vh" }}>
      {/* =============== HERO =============== */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(11, 26, 46, 0.82), rgba(26, 42, 64, 0.90)), url('https://images.unsplash.com/photo-1590602847861-fc75b43c0b9a?w=1200')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          color: "#fff",
          padding: "80px 24px 70px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(201, 41, 58, 0.15)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(232, 97, 10, 0.1)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 50,
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
          className="hero-grid"
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "rgba(201, 41, 58, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Radio size={20} color="#E8610A" />
              </div>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                FPI Zambia
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.8rem, 7vw, 4.2rem)",
                fontWeight: 900,
                fontFamily: "Georgia, serif",
                lineHeight: 1.05,
                marginBottom: 16,
                letterSpacing: "-0.02em",
              }}
            >
              Radio Spots
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 1.3vw, 1.15rem)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.75)",
                maxWidth: 520,
                marginBottom: 32,
              }}
            >
              Explore educational radio programmes developed by FPI Zambia to
              promote critical thinking, digital literacy and responsible media
              participation.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={scrollToEpisodes} className="btn-primary">
                Latest Broadcast
                <ArrowRight size={18} />
              </button>
              <button className="btn-ghost">About MIL</button>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { value: spots.length, label: "Episodes" },
              { value: 6, label: "Partners" },
              { value: 4, label: "Topics" },
              { value: 2026, label: "Current" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(12px)",
                  borderRadius: 16,
                  padding: 24,
                  border: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "2rem", fontWeight: 900, color: "#fff" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            background: "#F8F6F3",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          }}
        />
      </section>

      {/* =============== SEARCH & EPISODES =============== */}
      <section id="episodes" style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 80px" }}>
        <div
          style={{
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 40,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: "0.85rem", color: "#999" }}>Year:</span>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="year-select"
              aria-label="Filter by year"
            >
              <option>All</option>
              <option>2026</option>
              <option>2025</option>
            </select>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              fontWeight: 900,
              fontFamily: "Georgia, serif",
              color: "#1A1A1A",
              margin: 0,
            }}
          >
            Latest Episodes
          </h2>
          <span style={{ fontSize: "0.9rem", color: "#999" }}>
            {filtered.length} programme{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
          }}
        >
          {filtered.map((spot) => (
            <div key={spot.id} className="episode-card">
              <button
                className="thumb-wrap"
                onClick={() => setSelectedSpot(spot)}
                aria-label={`Play ${spot.title}`}
              >
                <img
                  src={thumb(spot.youtubeId)}
                  alt={`${spot.title} thumbnail`}
                  loading="lazy"
                  className="thumb-img"
                />
                <div className="thumb-overlay">
                  <div className="play-circle">
                    <Play size={22} color="#fff" fill="#fff" />
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px 24px 16px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "0.8rem",
                    }}
                  >
                    <Radio size={14} />
                    {spot.station}
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(8px)",
                    padding: "4px 14px",
                    borderRadius: 50,
                    fontSize: "0.7rem",
                    color: "#fff",
                    fontWeight: 600,
                    letterSpacing: "0.5px",
                  }}
                >
                  {spot.year}
                </div>
              </button>

              <div style={{ padding: "22px 24px 26px" }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontFamily: "Georgia, serif",
                    color: "#1A1A1A",
                    marginBottom: 8,
                    lineHeight: 1.3,
                  }}
                >
                  {spot.title}
                </h3>

                <p style={{ color: "#777", lineHeight: 1.7, marginBottom: 18, fontSize: "0.92rem" }}>
                  {spot.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                    color: "#999",
                    marginBottom: 20,
                    paddingBottom: 16,
                    borderBottom: "1px solid #F0EDE8",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Calendar size={14} />
                    {spot.date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Clock3 size={14} />
                    {spot.duration}
                  </span>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setSelectedSpot(spot)} className="btn-listen">
                    <Play size={16} />
                    Listen
                  </button>

                  <a
                    href={watchUrl(spot.youtubeId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-youtube"
                  >
                    <ExternalLink size={16} />
                    YouTube
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "#999" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: 16 }}>📻</div>
            <h3 style={{ fontSize: "1.3rem", color: "#1A1A1A", marginBottom: 6 }}>
              No programmes found
            </h3>
            <p>Try adjusting your search or filter.</p>
          </div>
        )}
      </section>

      {/* =============== PARTNERS =============== */}
      <section style={{ background: "#fff", padding: "70px 24px", borderTop: "1px solid #EEEAE4", borderBottom: "1px solid #EEEAE4" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(201,41,58,0.06)",
                padding: "6px 18px 6px 14px",
                borderRadius: 50,
                marginBottom: 14,
              }}
            >
              <Mic2 size={16} color="#C9293A" />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#C9293A", letterSpacing: "1px" }}>
                PARTNERS
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontFamily: "Georgia, serif",
                fontWeight: 900,
                color: "#1A1A1A",
                marginBottom: 10,
              }}
            >
              Our Broadcast Partners
            </h2>
            <p style={{ maxWidth: 560, margin: "0 auto", color: "#777", lineHeight: 1.7, fontSize: "1rem" }}>
              FPI Zambia works with community and national radio stations across
              Zambia to spread Media & Information Literacy.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
            {["ZNBC Radio 2", "Radio Phoenix", "Hot FM", "Breeze FM", "Flava FM", "Pan Africa Radio"].map((station) => (
              <div key={station} className="partner-card">
                <Radio size={24} color="#C9293A" style={{ marginBottom: 10, opacity: 0.6 }} />
                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#1A1A1A" }}>{station}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============== WHY RADIO =============== */}
      <section style={{ padding: "70px 24px", background: "#F8F6F3" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: "rgba(232,97,10,0.06)",
                padding: "6px 18px 6px 14px",
                borderRadius: 50,
                marginBottom: 14,
              }}
            >
              <Headphones size={16} color="#E8610A" />
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#E8610A", letterSpacing: "1px" }}>
                WHY RADIO
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontFamily: "Georgia, serif",
                fontWeight: 900,
                color: "#1A1A1A",
                marginBottom: 10,
              }}
            >
              Why Radio Matters
            </h2>
            <p style={{ maxWidth: 560, margin: "0 auto", color: "#777", lineHeight: 1.7, fontSize: "1rem" }}>
              Radio remains one of the most powerful tools for education and
              awareness in Zambia.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 22 }}>
            {[
              { icon: Users, title: "Community Awareness", text: "Delivering trusted information to communities across Zambia.", color: "#C9293A" },
              { icon: Shield, title: "Digital Literacy", text: "Helping citizens safely navigate today's digital world.", color: "#0B2C57" },
              { icon: Search, title: "Fact Checking", text: "Encouraging people to verify information before sharing.", color: "#E8610A" },
              { icon: Radio, title: "Media Freedom", text: "Supporting responsible journalism and informed public dialogue.", color: "#C9293A" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="why-card">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: `${item.color}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 14,
                    }}
                  >
                    <Icon size={20} color={item.color} />
                  </div>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.15rem", marginBottom: 8, color: "#1A1A1A" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "#777", lineHeight: 1.7, fontSize: "0.92rem", margin: 0 }}>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============== CTA =============== */}
      <section style={{ background: "linear-gradient(145deg, #0B1A2E, #1A2A40)", color: "#fff", padding: "70px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", fontFamily: "Georgia, serif", fontWeight: 900, marginBottom: 14 }}>
            Partner With FPI Zambia
          </h2>
          <p style={{ maxWidth: 540, margin: "0 auto 36px", lineHeight: 1.8, color: "rgba(255,255,255,0.65)", fontSize: "1.05rem" }}>
            Are you a community radio station or media organisation interested in
            promoting Media & Information Literacy? We'd love to collaborate.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button className="btn-primary" style={{ padding: "14px 40px" }}>Contact Us</button>
            <button className="btn-ghost" style={{ padding: "14px 40px" }}>Learn More</button>
          </div>
        </div>
      </section>

      {/* =============== MODAL: real YouTube player =============== */}
      {selectedSpot && (
        <div
          onClick={() => setSelectedSpot(null)}
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label={selectedSpot.title}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
            tabIndex={-1}
            className="modal-card"
          >
            <button
              onClick={() => setSelectedSpot(null)}
              className="modal-close"
              aria-label="Close player"
            >
              <X size={18} />
            </button>

            <div className="video-frame">
              <iframe
                key={selectedSpot.id}
                src={embedUrl(selectedSpot.youtubeId)}
                title={selectedSpot.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
              />
            </div>

            <div style={{ padding: "24px 28px 28px" }}>
              <span
                style={{
                  background: "#C9293A",
                  color: "#fff",
                  padding: "3px 14px",
                  borderRadius: 50,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Radio Spot
              </span>

              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.4rem, 3vw, 1.8rem)",
                  marginTop: 14,
                  marginBottom: 6,
                  color: "#1A1A1A",
                }}
              >
                {selectedSpot.title}
              </h2>

              <p style={{ color: "#777", lineHeight: 1.8, marginBottom: 18, fontSize: "0.95rem" }}>
                {selectedSpot.description}
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 14,
                  marginBottom: 22,
                  padding: "12px 18px",
                  background: "#F8F6F3",
                  borderRadius: 10,
                  fontSize: "0.85rem",
                  color: "#666",
                }}
              >
                <span>📻 {selectedSpot.station}</span>
                <span>📅 {selectedSpot.date}</span>
                <span>🕒 {selectedSpot.duration}</span>
              </div>

              <a
                href={watchUrl(selectedSpot.youtubeId)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-listen"
                style={{ textDecoration: "none", justifyContent: "center" }}
              >
                <ExternalLink size={16} />
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }

        .btn-primary {
          padding: 14px 34px;
          background: #C9293A;
          color: #fff;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: all 0.25s;
        }
        .btn-primary:hover { background: #A8232E; transform: scale(1.03); }
        .btn-primary:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        .btn-ghost {
          padding: 14px 34px;
          background: rgba(255,255,255,0.08);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 50px;
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-ghost:hover { background: rgba(255,255,255,0.15); border-color: rgba(255,255,255,0.3); }
        .btn-ghost:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        .search-input {
          width: 100%;
          padding: 14px 20px 14px 46px;
          border-radius: 12px;
          border: 1px solid #E8E3DC;
          font-size: 0.95rem;
          background: #fff;
          outline: none;
          transition: all 0.2s;
        }
        .search-input:focus { border-color: #C9293A; box-shadow: 0 0 0 3px rgba(201,41,58,0.08); }

        .year-select {
          padding: 12px 20px;
          border-radius: 12px;
          border: 1px solid #E8E3DC;
          background: #fff;
          font-size: 0.95rem;
          cursor: pointer;
          outline: none;
          transition: border-color 0.2s;
        }
        .year-select:focus { border-color: #C9293A; }

        .episode-card {
          background: #fff;
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0,0,0,0.04);
          border: 1px solid #EEEAE4;
          transition: all 0.3s;
        }
        .episode-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.08);
          border-color: #D5CFC6;
        }

        .thumb-wrap {
          position: relative;
          overflow: hidden;
          display: block;
          width: 100%;
          padding: 0;
          border: none;
          background: #0B1A2E;
          cursor: pointer;
        }
        .thumb-img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s;
        }
        .thumb-wrap:hover .thumb-img { transform: scale(1.05); }
        .thumb-wrap:focus-visible { outline: 3px solid #C9293A; outline-offset: -3px; }

        .thumb-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(11, 26, 46, 0.0);
          transition: background 0.25s;
        }
        .thumb-wrap:hover .thumb-overlay { background: rgba(11, 26, 46, 0.25); }
        .play-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(201, 41, 58, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(0,0,0,0.35);
          transform: scale(0.92);
          transition: transform 0.25s;
        }
        .thumb-wrap:hover .play-circle { transform: scale(1.05); }

        .btn-listen {
          flex: 1;
          padding: 12px 16px;
          background: #C9293A;
          color: #fff;
          border: none;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: background 0.2s;
        }
        .btn-listen:hover { background: #A8232E; }
        .btn-listen:focus-visible { outline: 2px solid #C9293A; outline-offset: 2px; }

        .btn-youtube {
          flex: 1;
          padding: 12px 16px;
          background: #F0EDE8;
          color: #1A1A1A;
          border: none;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: background 0.2s;
          text-decoration: none;
        }
        .btn-youtube:hover { background: #E5E0D8; }
        .btn-youtube:focus-visible { outline: 2px solid #1A1A1A; outline-offset: 2px; }

        .partner-card {
          background: #F8F6F3;
          border-radius: 14px;
          padding: 24px 16px;
          text-align: center;
          border: 1px solid #EEEAE4;
          transition: all 0.2s;
        }
        .partner-card:hover {
          background: #F0EDE8;
          border-color: #D5CFC6;
          transform: scale(1.02);
        }

        .why-card {
          background: #fff;
          border-radius: 16px;
          padding: 28px 24px;
          border: 1px solid #EEEAE4;
          transition: all 0.25s;
        }
        .why-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.05);
          border-color: #D5CFC6;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 20px;
          backdrop-filter: blur(6px);
          animation: fadeBackdrop 0.2s ease;
        }
        .modal-card {
          background: #fff;
          border-radius: 20px;
          max-width: 640px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 40px 80px rgba(0,0,0,0.3);
          animation: fadeIn 0.25s ease;
          position: relative;
        }
        .modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(0,0,0,0.55);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .modal-close:hover { background: rgba(0,0,0,0.8); }
        .video-frame {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 */
          background: #000;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}