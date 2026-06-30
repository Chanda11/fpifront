import { useEffect, useRef, useState } from "react";
import { Mail, Calendar } from "lucide-react";

// ============================================================
// DATA CONFIGURATION – all content (interactive parts removed)
// ============================================================
const newslettersData = {
  hero: {
    title: "Newsletters",
    subtitle:
      "Stay informed with the latest updates, achievements, research insights, and activities from FPI Zambia.",
    backgroundImage: "/images/news.jpg",
  },
  intro: {
    tag: "Stay Connected",
    title: "Our Latest Newsletters",
    description:
      "Get monthly updates on media freedom, journalism training, advocacy campaigns, research publications, and community impact.",
  },
  newsletters: [
    {
      id: 1,
      title: "FPI Zambia Newsletter – June 2025",
      date: "June 2025",
      description:
        "Highlights from training programs, partnerships, advocacy activities, and the launch of the SheRise initiative.",
      featured: true,
    },
    {
      id: 2,
      title: "FPI Zambia Newsletter – March 2025",
      date: "March 2025",
      description:
        "Updates on media literacy campaigns, community engagement initiatives, and the Claim Your Space project.",
      featured: false,
    },
    {
      id: 3,
      title: "FPI Zambia Newsletter – January 2025",
      date: "January 2025",
      description:
        "Program achievements, strategic priorities, upcoming events, and new research publications.",
      featured: false,
    },
    {
      id: 4,
      title: "FPI Zambia Newsletter – October 2024",
      date: "October 2024",
      description:
        "Coverage of the national media freedom symposium, capacity building workshops, and policy dialogues.",
      featured: false,
    },
  ],
  subscribe: {
    tag: "Never Miss an Update",
    title: "Subscribe to Our Newsletter",
    description:
      "Receive monthly insights on media freedom, journalism development, research, events, and opportunities directly in your inbox.",
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
    }}
  >
    {children}
  </span>
);

// ============================================================
// MAIN COMPONENT
// ============================================================
const Newsletters = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-white to-gray-50">
      {/* ========== HERO – FIXED BACKGROUND ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${newslettersData.hero.backgroundImage})` }}
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
                Knowledge Hub
              </span>
              <span className="block w-6 h-[2px] bg-[#E8610A] rounded-full"></span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              <GradText>Newsletters</GradText>
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl leading-relaxed">
              {newslettersData.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* ========== INTRO ========== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <SectionBadge text={newslettersData.intro.tag} icon={<Mail size={14} />} />
            <h2 className="font-serif text-3xl md:text-4xl font-black mb-4">
              {newslettersData.intro.title}
            </h2>
            <p className="text-gray-600 text-lg">{newslettersData.intro.description}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== NEWSLETTER GRID – TWO COLUMNS ========== */}
      <section id="newsletter-list" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#C9293A] mb-4">
              <span className="block w-6 h-[2px] bg-[#C9293A]" />
              Recent Issues
              <span className="block w-6 h-[2px] bg-[#C9293A]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-black">Browse Our Archive</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {newslettersData.newsletters.map((newsletter, idx) => (
              <AnimatedSection key={newsletter.id} delay={idx * 100}>
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100">
                  {/* Newsletter image placeholder – gradient with envelope icon */}
                  <div className="relative h-48 bg-gradient-to-br from-[#C9293A]/20 to-[#E8610A]/20 flex items-center justify-center">
                    <Mail className="w-16 h-16 text-[#C9293A] opacity-60" />
                    {newsletter.featured && (
                      <span className="absolute top-4 right-4 bg-[#C9293A] text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center text-[#C9293A] text-sm mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      {newsletter.date}
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-3">
                      {newsletter.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-1">
                      {newsletter.description}
                    </p>
                    {/* Buttons removed */}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SUBSCRIPTION (text only) ========== */}
      <section id="subscribe" className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#C9293A] mb-4">
              <span className="block w-6 h-[2px] bg-[#C9293A]" />
              {newslettersData.subscribe.tag}
              <span className="block w-6 h-[2px] bg-[#C9293A]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-black mb-4">
              {newslettersData.subscribe.title}
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {newslettersData.subscribe.description}
            </p>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Newsletters;