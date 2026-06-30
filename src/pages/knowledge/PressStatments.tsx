import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  ArrowRight,
  Mail,
  X,
} from "lucide-react";

// ============================================================
// DATA CONFIGURATION – with full content for each statement
// ============================================================
const pressStatementsData = {
  hero: {
    eyebrow: "Official Statements",
    title: "Press Statements",
    description:
      "Official statements, media releases and public responses from FPI Zambia.",
    backgroundImage: "/images/activity-1.jpg",
    ctaPrimary: { text: "View Archive", link: "#archive" },
    ctaSecondary: { text: "Media Enquiries", link: "#media-contact" },
  },
  featured: {
    tag: "Featured Statement",
    title: "FPI Statement on Media Freedom",
    description:
      "FPI Zambia reaffirms its commitment to media freedom, journalist safety and democratic participation.",
  },
  archive: {
    tag: "Archive",
    title: "Statement Archive",
    items: [
      {
        title: "Statement on Media Freedom",
        category: "Media Freedom",
        date: "June 2025",
        content: `FPI Zambia reiterates its unwavering commitment to the protection and promotion of media freedom as a cornerstone of democracy. We call upon all stakeholders to respect the rights of journalists to operate without fear of harassment or intimidation. The recent incidents of attacks on media practitioners are deeply concerning and must be investigated thoroughly. We stand with all journalists and media houses in their pursuit of truth and accountability. We urge the government to create an enabling environment where media can thrive and contribute to national development.`,
      },
      {
        title: "Position on Journalist Safety",
        category: "Journalist Safety",
        date: "May 2025",
        content: `The safety of journalists is paramount to the functioning of a free press. FPI Zambia expresses grave concern over the increasing threats and violence against journalists in the course of their work. We call for the establishment of a national mechanism to monitor and respond to attacks on media professionals. We also encourage media houses to adopt safety protocols and provide training for their staff. Our organization is committed to working with all partners to ensure that journalists can operate safely and without fear.`,
      },
      {
        title: "Digital Rights and Civic Participation",
        category: "Digital Rights",
        date: "April 2025",
        content: `In an increasingly digital world, the protection of online rights and the promotion of civic participation are essential. FPI Zambia emphasizes the need for legislation that safeguards digital privacy, freedom of expression, and access to information. We urge the government to consult widely with civil society and the public on any digital policies that may affect fundamental rights. We also encourage citizens to engage actively in digital spaces to shape the future of our democracy.`,
      },
    ],
  },
  mediaContact: {
    title: "Media Enquiries",
    description:
      "For interviews, comments or media enquiries, please contact FPI Zambia.",
    email: "info@fpizambia.org",
  },
  cta: {
    title: "Stay Informed",
    description:
      "Subscribe to receive press statements and updates on media freedom issues.",
    buttonText: "Subscribe Now",
    link: "#",
  },
};

// ============================================================
// CUSTOM HOOK FOR SCROLL ANIMATION
// ============================================================
function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return {
    ref,
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${delay}ms, transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) ${delay}ms`,
    } as React.CSSProperties,
  };
}

// ============================================================
// SECTION COMPONENTS
// ============================================================
const SectionBadge = ({ text, icon }: { text: string; icon?: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 bg-[#C9293A]/10 rounded-full px-4 py-1.5 mb-6">
    {icon && <span className="text-[#C9293A]">{icon}</span>}
    <span className="text-xs font-medium text-[#C9293A] tracking-wide">{text}</span>
  </div>
);

const AnimatedSection = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const { ref, style } = useFadeUp(delay);
  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};

const GradText = ({ children }: { children: React.ReactNode }) => (
  <span
    style={{
      background: "linear-gradient(120deg, #E8610A, #F5A623)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontStyle: "italic",
      textDecoration: "none",
    }}
  >
    {children}
  </span>
);

// ============================================================
// MAIN COMPONENT
// ============================================================
const PressStatements = () => {
  const [selectedStatement, setSelectedStatement] = useState<typeof pressStatementsData.archive.items[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item: typeof pressStatementsData.archive.items[0]) => {
    setSelectedStatement(item);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStatement(null);
    document.body.style.overflow = "auto";
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isModalOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isModalOpen]);

  return (
    <div className="font-sans bg-gradient-to-b from-white to-gray-50">
      <style>{`
        .sr-section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
        }
        .sr-section.sr-visible { opacity: 1; transform: translateY(0); }
        .gradient-highlight {
          background: linear-gradient(120deg, #E8610A, #F5A623);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-style: italic;
          text-decoration: none !important;
          display: inline-block;
        }
      `}</style>

      {/* ========== HERO – FIXED BACKGROUND ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${pressStatementsData.hero.backgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C9293A]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/15 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="block w-6 h-[2px] bg-[#E8610A] rounded-full"></span>
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/80">
                {pressStatementsData.hero.eyebrow}
              </span>
              <span className="block w-6 h-[2px] bg-[#E8610A] rounded-full"></span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              <GradText>Press Statements</GradText>
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
              {pressStatementsData.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={pressStatementsData.hero.ctaPrimary.link}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9293A] to-[#E8610A] text-white px-6 py-3 rounded-full font-semibold text-sm hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                {pressStatementsData.hero.ctaPrimary.text}
              </a>
              <a
                href={pressStatementsData.hero.ctaSecondary.link}
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                {pressStatementsData.hero.ctaSecondary.text}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FEATURED STATEMENT ========== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="bg-[#080c1a] rounded-2xl p-8 md:p-12 text-white shadow-2xl">
              <span className="text-[#C9A84C] uppercase tracking-wider text-xs font-semibold">
                {pressStatementsData.featured.tag}
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-black mt-3 mb-4">
                {pressStatementsData.featured.title}
              </h2>
              <p className="text-gray-300 text-sm md:text-base max-w-3xl leading-relaxed">
                {pressStatementsData.featured.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== ARCHIVE ========== */}
      <section id="archive" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <SectionBadge text={pressStatementsData.archive.tag} icon={<Calendar size={14} />} />
            <h2 className="font-serif text-3xl md:text-4xl font-black">
              {pressStatementsData.archive.title}
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {pressStatementsData.archive.items.map((item, idx) => (
              <AnimatedSection key={item.title} delay={idx * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full border border-gray-100 flex flex-col">
                  <div className="flex items-center text-[#C9293A] text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {item.date}
                  </div>
                  <span className="inline-block text-[#C9293A] text-xs font-semibold uppercase tracking-wide mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold mb-4 flex-1">{item.title}</h3>
                  <button
                    onClick={() => openModal(item)}
                    className="inline-flex items-center gap-1 text-[#C9293A] font-medium text-sm hover:gap-2 transition group w-fit"
                  >
                    Read Statement <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MEDIA CONTACT ========== */}
      <section id="media-contact" className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Mail className="w-14 h-14 text-[#C9293A] mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-4xl font-black mb-4">
              {pressStatementsData.mediaContact.title}
            </h2>
            <p className="text-gray-600 mb-4 max-w-lg mx-auto">
              {pressStatementsData.mediaContact.description}
            </p>
            <a
              href={`mailto:${pressStatementsData.mediaContact.email}`}
              className="inline-block text-[#C9293A] font-semibold text-lg hover:underline"
            >
              {pressStatementsData.mediaContact.email}
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-20 md:py-28 bg-[#080c1a] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl md:text-5xl font-black mb-4">
              {pressStatementsData.cta.title}
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              {pressStatementsData.cta.description}
            </p>
            <a
              href={pressStatementsData.cta.link}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9293A] to-[#E8610A] text-white px-8 py-3 rounded-full font-semibold hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              {pressStatementsData.cta.buttonText}
              <ArrowRight size={18} />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== MODAL POPUP ========== */}
      {isModalOpen && selectedStatement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 text-sm text-[#C9293A] mb-4">
                <Calendar size={16} />
                <span>{selectedStatement.date}</span>
                <span className="w-1 h-1 bg-[#C9293A] rounded-full" />
                <span className="font-semibold uppercase tracking-wide text-xs">
                  {selectedStatement.category}
                </span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-black mb-4 text-gray-900">
                {selectedStatement.title}
              </h2>

              <div className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedStatement.content}
              </div>

              <button
                onClick={closeModal}
                className="mt-6 px-6 py-2 bg-[#C9293A] text-white rounded-full font-semibold hover:bg-[#a31f2e] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PressStatements;