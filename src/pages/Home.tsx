import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion, Variants } from "framer-motion";
import {
  Calendar,
  Users,
  MapPin,
  ArrowRight,
  TrendingUp,
  Shield,
  BookOpen,
  Scale,
  FileText,
  Radio,
  Map,
  BookOpenCheck,
  X,
  Target,
  Award,
  User,
  Mail,
} from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

type Activity = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  participants: number;
  category: "training" | "workshop" | "webinar" | "dialogue";
  // New fields for modal
  fullDescription?: string;
  objectives?: string[];
  outcomes?: string[];
  organizer?: string;
  contact?: string;
};

const FALLBACK_ACTIVITIES: Activity[] = [
  {
    id: 1,
    title: "Investigative Journalism Bootcamp",
    description:
      "A five-day intensive training equipping journalists with data-driven investigative reporting techniques, source protection and digital safety practices.",
    image: "/images/act.jpeg",
    date: "12 May 2026",
    location: "Lusaka",
    participants: 28,
    category: "training",
    fullDescription:
      "This immersive bootcamp is designed for working journalists who want to sharpen their investigative skills. Over five days, participants will learn advanced data analysis, source verification, digital security, and ethical storytelling. The programme includes hands-on exercises, case studies, and mentorship from experienced investigators.",
    objectives: [
      "Master data-driven investigative techniques",
      "Understand source protection and digital safety",
      "Learn to verify information in the digital age",
      "Produce a mini-investigation by the end of the bootcamp",
    ],
    outcomes: [
      "Participants will be able to conduct data-driven investigations independently.",
      "Enhanced capacity to handle sensitive information securely.",
      "Improved storytelling and impact reporting.",
    ],
    organizer: "FPI Zambia in partnership with GIJN",
    contact: "training@fpizambia.org",
  },
  {
    id: 2,
    title: "Media Literacy in Schools Workshop",
    description:
      "Hands-on workshop with secondary school teachers on embedding critical thinking and fact-checking skills into the classroom curriculum.",
    image: "/images/school3.jpg",
    date: "29 April 2026",
    location: "Ndola",
    participants: 42,
    category: "workshop",
    fullDescription:
      "This workshop empowers teachers with practical tools and lesson plans to integrate media literacy across subjects. Participants explore techniques to teach critical thinking, evaluate sources, and combat misinformation in the classroom. The curriculum aligns with Zambia's education standards.",
    objectives: [
      "Equip teachers with media literacy teaching strategies",
      "Develop lesson plans that incorporate fact‑checking",
      "Build a network of media‑literate educators",
    ],
    outcomes: [
      "Teachers leave with ready‑to‑use classroom resources.",
      "Increased confidence in addressing misinformation.",
      "Collaboration among schools for future initiatives.",
    ],
    organizer: "FPI Zambia & MoE",
    contact: "education@fpizambia.org",
  },
  {
    id: 3,
    title: "Press Freedom & the Law Webinar",
    description:
      "A panel of media lawyers and editors unpacking recent legal developments affecting freedom of expression and access to information in Zambia.",
    image: "/images/hub.jpeg",
    date: "14 April 2026",
    location: "Online",
    participants: 156,
    category: "webinar",
    fullDescription:
      "This online webinar brings together legal experts, editors, and civil society to discuss the latest court rulings, proposed legislation, and their impact on press freedom. Panellists provide actionable insights for journalists and advocates.",
    objectives: [
      "Analyse recent legal cases affecting media",
      "Understand the Access to Information Bill",
      "Discuss strategies to defend media rights",
    ],
    outcomes: [
      "Journalists better informed about their legal rights.",
      "Strengthened advocacy for legal reforms.",
      "Network of legal contacts for media professionals.",
    ],
    organizer: "FPI Zambia & Media Legal Defence Initiative",
    contact: "legal@fpizambia.org",
  },
  {
    id: 4,
    title: "Community Dialogue: Misinformation & Elections",
    description:
      "An open community forum exploring how misinformation spreads during election seasons and practical steps citizens can take to verify claims.",
    image: "/images/work.jpg",
    date: "2 April 2026",
    location: "Kitwe",
    participants: 64,
    category: "dialogue",
    fullDescription:
      "This community dialogue brings together citizens, traditional leaders, and civil society to discuss the impact of misinformation on electoral processes. Participants learn practical fact‑checking techniques and how to engage responsibly with political content.",
    objectives: [
      "Raise awareness about misinformation risks",
      "Teach practical verification skills",
      "Encourage community‑led fact‑checking",
    ],
    outcomes: [
      "Participants become more critical consumers of information.",
      "Community networks for reporting misinformation.",
      "Reduced spread of harmful falsehoods.",
    ],
    organizer: "FPI Zambia & NCC",
    contact: "community@fpizambia.org",
  },
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600";

const useScrollReveal = () => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sr-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentRef);
    return () => observer.disconnect();
  }, []);

  return ref;
};

const Eyebrow = ({ label, light = false }: { label: string; light?: boolean }) => (
  <div className={`inline-flex items-center gap-2 mb-3 ${light ? "text-blue-200" : "text-blue-700"}`}>
    <span className="block h-[2px] w-5 rounded-full bg-current" />
    <span className="text-[10px] font-bold tracking-[0.16em] uppercase">{label}</span>
    <span className="block h-[2px] w-5 rounded-full bg-current" />
  </div>
);

// Animation variants (unchanged)
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
};

// -----------------------------

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modalActivity, setModalActivity] = useState<Activity | null>(null);

  const activities = FALLBACK_ACTIVITIES;
  const loading = false;
  const error: string | null = null;

  const heroSlides = [
    {
      image: "/images/note.jpg",
      eyebrow: "FPI Zambia",
      title: "Promoting Free Press &",
      highlight: "Good Journalism",
      subtitle: "Defending Human Rights",
      description: "Empowering journalists and defending media freedom across Zambia.",
      cta: "Learn More",
      link: "/about",
    },
    {
      image: "/images/image.png",
      eyebrow: "FPI Zambia",
      title: "Media and Information Literacy",
      description: "Building resilient communities through digital literacy.",
      cta: "Explore Programs",
      link: "/programs/media-literacy",
    },
    {
      image: "/images/advo.jpg",
      eyebrow: "FPI Zambia",
      title: "Advocacy & Policy",
      highlight: "Change the Narrative",
      subtitle: "Stronger Democracy",
      description: "Supporting legal reforms for media freedom and access to information.",
      cta: "Get Involved",
      link: "/contact",
    },
  ];

  const quickAccess = [
    {
      title: "Explore MIL Hubs",
      description: "Discover Media & Information Literacy hubs across Zambia.",
      icon: Map,
      color: "#2563EB",
      link: "/mil/hubs",
    },
    {
      title: "View Brochure",
      description: "Download and learn more about the MIL programme.",
      icon: BookOpenCheck,
      color: "#EA580C",
      link: "/mil/brochure",
    },
    {
      title: "Radio Spots",
      description: "Listen to awareness campaigns and educational broadcasts.",
      icon: Radio,
      color: "#F59E0B",
      link: "/mil/radio-spots",
    },
  ];

  const categories = [
    { id: "all", name: "All", icon: "📋" },
  ];

  const focusAreas = [
    { icon: TrendingUp, title: "Media Development", description: "Strengthening independent journalism and promoting professional media standards across Zambia.", color: "#2563EB" },
    { icon: Shield, title: "Media Freedom", description: "Advocating for freedom of expression, access to information and press freedom.", color: "#EA580C" },
    { icon: BookOpen, title: "Media Literacy", description: "Empowering citizens with critical thinking skills to identify misinformation and disinformation.", color: "#F59E0B" },
    { icon: Scale, title: "Policy Advocacy", description: "Supporting legal and policy reforms that strengthen democracy, transparency and accountability.", color: "#2563EB" },
    { icon: FileText, title: "Research & Publications", description: "Producing reports, studies and publications that inform media development and governance.", color: "#EA580C" },
    { icon: Users, title: "Community Engagement", description: "Building partnerships between journalists, communities, civil society and public institutions.", color: "#F59E0B" },
  ];

  const filteredActivities =
    selectedCategory === "all"
      ? activities
      : activities.filter((a) => a.category === selectedCategory);

  const welcomeRef = useScrollReveal();
  const aboutRef = useScrollReveal();
  const activitiesRef = useScrollReveal();
  const focusRef = useScrollReveal();
  const galleryRef = useScrollReveal();

  // Modal handlers
  const openModal = (activity: Activity) => {
    setModalActivity(activity);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalActivity(null);
    document.body.style.overflow = "auto";
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalActivity) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [modalActivity]);

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "linear-gradient(135deg, #F0F9FF 0%, #FFF7ED 100%)", color: "#1A1A2E" }}>
      <style>{`
        .sr-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .sr-section.sr-visible { opacity: 1; transform: translateY(0); }

        .hero-swiper .swiper-slide {
          position: absolute !important;
          top: 0; left: 0;
          width: 100% !important;
          height: 100% !important;
          pointer-events: none;
          opacity: 0 !important;
          transition: opacity 0.9s ease !important;
        }
        .hero-swiper .swiper-slide-active {
          position: relative !important;
          opacity: 1 !important;
          pointer-events: auto;
          z-index: 1;
        }
        .hero-swiper .swiper-pagination { bottom: 20px !important; }
        .hero-swiper .swiper-pagination-bullet {
          width: 6px !important; height: 6px !important;
          border-radius: 99px !important;
          background: rgba(255,255,255,0.4) !important;
          opacity: 1 !important;
          transition: width 0.3s ease !important;
          margin: 0 4px !important;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          width: 20px !important;
          background: #EA580C !important;
        }
        .hero-swiper .swiper-button-next,
        .hero-swiper .swiper-button-prev {
          width: 36px !important; height: 36px !important;
          border-radius: 999px !important;
          background: rgba(0,0,0,0.2) !important;
          backdrop-filter: blur(4px) !important;
          color: white !important;
        }
        .hero-swiper .swiper-button-next:after,
        .hero-swiper .swiper-button-prev:after { font-size: 12px !important; }
        @media (max-width: 640px) {
          .hero-swiper .swiper-button-next,
          .hero-swiper .swiper-button-prev { display: none !important; }
        }
        .act-swiper .swiper-pagination-bullet { background: #2563EB !important; opacity: 0.35 !important; }
        .act-swiper .swiper-pagination-bullet-active { opacity: 1 !important; }
        .act-swiper .swiper-button-next,
        .act-swiper .swiper-button-prev { color: #2563EB !important; }

        .cat-filter-btn {
          padding: 5px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid #E2E8F0;
          background: #fff;
          color: #374151;
          transition: transform 0.15s, box-shadow 0.15s, background 0.15s, color 0.15s, border-color 0.15s;
        }
        .cat-filter-btn:hover { border-color: #CBD5E1; }
        .cat-filter-btn:focus-visible { outline: 2px solid #2563EB; outline-offset: 2px; }
        .cat-filter-btn.active {
          background: linear-gradient(135deg,#2563EB,#EA580C);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 2px 6px rgba(37,99,235,0.3);
          transform: scale(1.02);
        }

        .media-card {
          background: #fff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .media-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 22px 50px rgba(0,0,0,.12);
        }
        .media-card img { transition: transform 0.5s ease; }
        .media-card:hover img { transform: scale(1.04); }

        .pill-link:focus-visible,
        .pill-link:focus,
        a:focus-visible,
        button:focus-visible {
          outline: 2px solid #2563EB;
          outline-offset: 2px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        @media (prefers-reduced-motion: reduce) {
          .sr-section, .media-card, .media-card img { transition: none !important; }
        }

        /* Modal overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.25s ease;
        }
        .modal-content {
          background: #fff;
          max-width: 720px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 24px;
          padding: 40px;
          position: relative;
          box-shadow: 0 40px 80px rgba(0,0,0,0.3);
          animation: slideUp 0.3s ease;
        }
        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: rgba(0,0,0,0.05);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
          color: #1A1A2E;
        }
        .modal-close:hover {
          background: rgba(0,0,0,0.12);
          transform: scale(1.05);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (max-width: 640px) {
          .modal-content { padding: 24px; }
        }
      `}</style>

      {/* Hero, Quick Access, Welcome, About, etc. – unchanged */}
      {/* ========== HERO CAROUSEL ========== */}
      <div style={{ position: "relative", width: "100%", height: "100vh", minHeight: 500, overflow: "hidden", paddingBottom: 0 }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, zIndex: 10, background: "linear-gradient(90deg, #2563EB, #EA580C, #F59E0B, #EA580C, #2563EB)" }} />
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5500, disableOnInteraction: false }}
          loop
          className="hero-swiper"
          style={{ width: "100%", height: "100%" }}
        >
          {heroSlides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                <img src={slide.image} alt={slide.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(37,99,235,0.35) 0%, rgba(234,88,12,0.3) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.15), transparent)" }} />
                <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "40px 24px" }}>
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} style={{ marginBottom: 16 }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.25)", color: "#FDE047", fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 999 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#EA580C" }} />
                      {slide.eyebrow}
                    </span>
                  </motion.div>
                  <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontWeight: 900, lineHeight: 1.2, color: "#FFFFFF", margin: "0 0 6px", maxWidth: 700 }}>
                    {slide.title}
                  </motion.h1>
                  {slide.highlight && (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} style={{ marginBottom: 10 }}>
                      <span style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)", fontWeight: 900, fontStyle: "italic", background: "linear-gradient(135deg, #FDE047, #FFB347)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>
                        {slide.highlight}
                      </span>
                    </motion.div>
                  )}
                  {slide.subtitle && (
                    <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)", color: "rgba(255,255,255,0.9)", margin: "0 0 8px", fontWeight: 400 }}>
                      {slide.subtitle}
                    </motion.p>
                  )}
                  <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }} style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", maxWidth: 420, lineHeight: 1.6, margin: "0 0 24px" }}>
                    {slide.description}
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.55 }} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                    <Link to={slide.link} className="pill-link" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg, #2563EB, #EA580C)", color: "#fff", fontWeight: 600, fontSize: 12, padding: "8px 20px", borderRadius: 999, textDecoration: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
                      {slide.cta} <ArrowRight size={12} />
                    </Link>
                    <a href="#about" className="pill-link" style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", textDecoration: "underline", textUnderlineOffset: 3 }}>Learn about FPI</a>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ========== QUICK ACCESS ========== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        style={{ padding: "0 24px", marginTop: "40px", position: "relative", zIndex: 5 }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            background: "#ffffff",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
            border: "1px solid rgba(226, 232, 240, 0.6)",
          }}
        >
          {quickAccess.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 12px 40px rgba(0,0,0,0.10)",
                  transition: { type: "spring", stiffness: 300 },
                }}
                style={{
                  position: "relative",
                  padding: "28px 24px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                  background: "#fff",
                  borderRight: index < quickAccess.length - 1 ? "1px solid #F1F5F9" : "none",
                  transition: "background 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#FAFBFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}cc)`,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                />

                <Link
                  to={item.link}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    flex: 1,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: `${item.color}10`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: `1px solid ${item.color}20`,
                      }}
                    >
                      <Icon size={22} color={item.color} strokeWidth={1.8} />
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 700, margin: 0, color: "#1A1A2E", letterSpacing: "-0.01em" }}>
                      {item.title}
                    </p>
                  </div>

                  <p style={{ fontSize: 12, color: "#64748B", margin: 0, lineHeight: 1.6, paddingRight: 4 }}>
                    {item.description}
                  </p>

                  <motion.span
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 11,
                      fontWeight: 600,
                      color: item.color,
                      marginTop: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Explore <ArrowRight size={12} style={{ transition: "transform 0.2s" }} />
                  </motion.span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* ========== WELCOME SECTION ========== */}
      <motion.section
        ref={welcomeRef}
        className="sr-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        style={{ padding: "60px 20px 40px", textAlign: "center" }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <Eyebrow label="Free Press Initiative Zambia" />
          <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 800, fontSize: "clamp(1.5rem, 4vw, 2.2rem)", lineHeight: 1.2, marginBottom: 12 }}>
            Advancing <span style={{ fontStyle: "italic", background: "linear-gradient(135deg,#2563EB,#EA580C)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Free Press</span> & Journalism
          </h2>
          <p style={{ color: "#4B5563", fontSize: 14, lineHeight: 1.6, maxWidth: 520, margin: "0 auto" }}>
            FPI Zambia promotes media freedom and strengthens independent journalism across the country — building a more informed, transparent and accountable society.
          </p>
        </div>
      </motion.section>

      {/* ========== ABOUT FPI ========== */}
      <motion.section
        id="about"
        ref={aboutRef}
        className="sr-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
        style={{ padding: "40px 20px 60px", background: "#fff" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32, alignItems: "center" }}>
            <motion.div variants={cardVariants} style={{ position: "relative" }}>
              <img src="/images/activity-1.jpg" alt="FPI Zambia Training" style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 20, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }} />
              <div style={{ position: "absolute", top: 16, left: 16, background: "linear-gradient(135deg,#2563EB,#EA580C)", color: "#fff", padding: "8px 14px", borderRadius: 14, textAlign: "center" }}>
                <div style={{ fontFamily: "Georgia,serif", fontWeight: 800, fontSize: 22 }}>10+</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.85)" }}>Years of impact</div>
              </div>
            </motion.div>
            <motion.div variants={cardVariants}>
              <Eyebrow label="About FPI" />
              <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 800, fontSize: "clamp(1.3rem, 3vw, 1.8rem)", lineHeight: 1.2, marginBottom: 12 }}>Independent journalism,<br />democratic participation</h2>
              <p style={{ color: "#4B5563", fontSize: 13, lineHeight: 1.7, marginBottom: 12 }}>
                Free Press Initiative Zambia (FPI Zambia) is dedicated to promoting independent journalism, media freedom, media literacy and citizen participation in democratic governance.
              </p>
              <p style={{ color: "#4B5563", fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
                Through training, research, advocacy and community engagement, we empower journalists, civil society organizations and communities.
              </p>
              <Link to="/about" className="pill-link" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg,#2563EB,#EA580C)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "8px 20px", borderRadius: 999, textDecoration: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
                Learn More About FPI <ArrowRight size={12} />
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ========== ACTIVITIES SECTION (unchanged except "Learn More" now opens modal) ========== */}
      <motion.section
        ref={activitiesRef}
        className="sr-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={sectionVariants}
        style={{ padding: "50px 20px", background: "#F8FAFF" }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <Eyebrow label="Latest Initiatives" />
            <h2 style={{ fontFamily: "Georgia,serif", fontWeight: 800, fontSize: "clamp(1.4rem, 3.5vw, 2rem)", marginBottom: 6 }}>Recent Activities</h2>
            <p style={{ color: "#6B7280", fontSize: 13, maxWidth: 460, margin: "0 auto" }}>Trainings, workshops, webinars and dialogues.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginBottom: 32 }}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                aria-pressed={selectedCategory === cat.id}
                className={`cat-filter-btn ${selectedCategory === cat.id ? "active" : ""}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", border: "3px solid #2563EB", borderRightColor: "transparent", animation: "spin 0.8s linear infinite", margin: "0 auto" }} />
              <p style={{ color: "#6B7280", marginTop: 10, fontSize: 12 }}>Loading activities...</p>
            </div>
          )}

          {error && <div style={{ textAlign: "center", color: "#DC2626", padding: 20, fontSize: 13 }}>Error: {error}</div>}

          {!loading && !error && filteredActivities.length === 0 && (
            <div style={{ textAlign: "center", color: "#6B7280", padding: "40px 0", fontSize: 13 }}>
              No activities in this category yet — check back soon.
            </div>
          )}

          {!loading && !error && filteredActivities.length > 0 && (
            <Swiper
              key={selectedCategory}
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
              className="act-swiper"
              style={{ paddingBottom: 50 }}
            >
              {filteredActivities.map((activity) => (
                <SwiperSlide key={activity.id}>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{ y: -6, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", height: "100%", display: "flex", flexDirection: "column" }}
                  >
                    <div style={{ position: "relative", height: 140 }}>
                      <img
                        src={activity.image}
                        alt={activity.title}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).onerror = null;
                          (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                        }}
                      />
                      <span style={{ position: "absolute", top: 8, left: 8, background: "linear-gradient(135deg,#2563EB,#EA580C)", color: "#fff", fontSize: 9, fontWeight: 600, padding: "2px 8px", borderRadius: 20, textTransform: "capitalize" }}>
                        {activity.category}
                      </span>
                    </div>
                    <div style={{ padding: 16, display: "flex", flexDirection: "column", flex: 1 }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, lineHeight: 1.3 }}>{activity.title}</h3>
                      <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5, marginBottom: 12, flex: 1 }}>
                        {activity.description.length > 80
                          ? `${activity.description.substring(0, 80)}...`
                          : activity.description}
                      </p>
                      <div style={{ borderTop: "1px solid #F0F0F0", paddingTop: 10, marginTop: "auto" }}>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, color: "#9CA3AF", fontSize: 10, marginBottom: 8 }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><Calendar size={10} /> {activity.date}</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><MapPin size={10} /> {activity.location}</span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><Users size={10} /> {activity.participants}</span>
                        </div>
                        {/* Updated "Learn More" to open modal */}
                        <button
                          onClick={() => openModal(activity)}
                          className="pill-link"
                          style={{ color: "#2563EB", fontSize: 11, fontWeight: 500, background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, padding: 0 }}
                        >
                          Learn More <ArrowRight size={10} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </motion.section>

      {/* ========== MEDIA HIGHLIGHTS ========== */}
      {/* ... unchanged ... */}

      {/* ========== FOCUS AREAS ========== */}
      {/* ... unchanged ... */}

      {/* ========== GALLERY ========== */}
      {/* ... unchanged ... */}

      {/* ========== MODAL ========== */}
      {modalActivity && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <X size={22} />
            </button>

            <img
              src={modalActivity.image}
              alt={modalActivity.title}
              style={{ width: "100%", height: 200, objectFit: "cover", borderRadius: 12, marginBottom: 20 }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
              }}
            />

            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ background: "linear-gradient(135deg,#2563EB,#EA580C)", color: "#fff", fontSize: 10, fontWeight: 600, padding: "2px 12px", borderRadius: 20, textTransform: "capitalize" }}>
                {modalActivity.category}
              </span>
              <span style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 4 }}>
                <Calendar size={12} /> {modalActivity.date}
              </span>
              <span style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 4 }}>
                <MapPin size={12} /> {modalActivity.location}
              </span>
            </div>

            <h2 style={{ fontFamily: "Georgia,serif", fontSize: "1.6rem", fontWeight: 800, marginBottom: 12 }}>
              {modalActivity.title}
            </h2>

            <p style={{ fontSize: 14, lineHeight: 1.8, color: "#374151", marginBottom: 20 }}>
              {modalActivity.fullDescription || modalActivity.description}
            </p>

            {modalActivity.objectives && modalActivity.objectives.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <Target size={16} /> Objectives
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {modalActivity.objectives.map((obj, i) => (
                    <li key={i} style={{ fontSize: 13, color: "#4B5563", padding: "4px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: "#2563EB" }}>•</span> {obj}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {modalActivity.outcomes && modalActivity.outcomes.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <Award size={16} /> Outcomes
                </h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {modalActivity.outcomes.map((out, i) => (
                    <li key={i} style={{ fontSize: 13, color: "#4B5563", padding: "4px 0", display: "flex", gap: 8 }}>
                      <span style={{ color: "#EA580C" }}>✦</span> {out}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 16, display: "flex", flexWrap: "wrap", gap: 20, fontSize: 13, color: "#6B7280" }}>
              {modalActivity.organizer && (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <User size={14} /> <strong>Organizer:</strong> {modalActivity.organizer}
                </span>
              )}
              {modalActivity.contact && (
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Mail size={14} /> <strong>Contact:</strong> <a href={`mailto:${modalActivity.contact}`} style={{ color: "#2563EB", textDecoration: "none" }}>{modalActivity.contact}</a>
                </span>
              )}
            </div>

            <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={closeModal}
                style={{ background: "linear-gradient(135deg,#2563EB,#EA580C)", color: "#fff", padding: "8px 24px", borderRadius: 999, border: "none", fontWeight: 600, cursor: "pointer", fontSize: 13 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;