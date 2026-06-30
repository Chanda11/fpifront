import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Handshake,
  Users,
  Globe,
  HeartHandshake,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

// ============================================================
// DATA CONFIGURATION – all content can be replaced from admin
// ============================================================
const partnersData = {
  hero: {
    eyebrow: "Strategic Partnerships",
    title: "Our",
    highlighted: "Partners",
    description:
      "Building stronger journalism, media freedom, media literacy and democratic participation through meaningful partnerships that create lasting impact across Zambia.",
    backgroundImage: "/images/hero-bg-1.jpg",
    ctaPrimary: { text: "Partner With Us", link: "/contact" },
    ctaSecondary: { text: "Our Impact", link: "#impact" },
  },
  stats: {
    tag: "Our Impact",
    title: "By the Numbers",
    items: [
      { value: "20+", label: "Strategic Partners" },
      { value: "15+", label: "Joint Projects" },
      { value: "10",  label: "Provinces Reached" },
      { value: "100%", label: "Commitment" },
    ],
  },
  partners: [
    {
      name: "UNESCO",
      description:
        "Supporting media development, freedom of expression and access to information.",
    },
    {
      name: "MISA Zambia",
      description:
        "Advancing media freedom and journalists' rights across Zambia.",
    },
    {
      name: "BBC Media Action",
      description:
        "Strengthening media and communication for positive social change.",
    },
    {
      name: "Internews",
      description:
        "Supporting independent media and access to trusted information.",
    },
    {
      name: "Panos Institute",
      description:
        "Promoting informed public debate and citizen participation.",
    },
    {
      name: "Local Universities",
      description:
        "Collaborating on research, training and media literacy initiatives.",
    },
  ],
  collaboration: [
    {
      icon: Handshake,
      title: "Collaboration",
      text: "Working together to strengthen journalism and civic engagement.",
    },
    {
      icon: Users,
      title: "Capacity Building",
      text: "Training journalists, educators and communities across Zambia.",
    },
    {
      icon: Globe,
      title: "National Impact",
      text: "Creating sustainable programmes that improve access to trusted information.",
    },
  ],
  cta: {
    tag: "Join Us",
    title: "Become A Strategic Partner",
    description:
      "We welcome organisations committed to strengthening media freedom, promoting media literacy and advancing democratic participation throughout Zambia. Together we can create lasting impact for communities across the country.",
    button: { text: "Partner With FPI Zambia", link: "/contact" },
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
const Partners = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-white to-gray-50">
      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${partnersData.hero.backgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C9293A]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/15 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-3xl text-center mx-auto">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="block w-6 h-[2px] bg-[#E8610A] rounded-full"></span>
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/80">
                {partnersData.hero.eyebrow}
              </span>
              <span className="block w-6 h-[2px] bg-[#E8610A] rounded-full"></span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {partnersData.hero.title}{" "}
              <GradText>{partnersData.hero.highlighted}</GradText>
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              {partnersData.hero.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={partnersData.hero.ctaPrimary.link}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9293A] to-[#E8610A] text-white px-6 py-3 rounded-full font-semibold text-sm hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                {partnersData.hero.ctaPrimary.text}
              </Link>
              <Link
                to={partnersData.hero.ctaSecondary.link}
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                {partnersData.hero.ctaSecondary.text}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionBadge text={partnersData.stats.tag} icon={<TrendingUp size={14} />} />
            <h2 className="font-serif text-3xl md:text-4xl font-black">
              {partnersData.stats.title}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partnersData.stats.items.map((stat, idx) => (
              <AnimatedSection key={stat.label} delay={idx * 80}>
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center border border-gray-100">
                  <div className="font-serif text-4xl md:text-5xl font-black text-[#C9293A]">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 text-sm mt-2">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PARTNERS GRID (similar to MVV cards) ========== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#C9293A] mb-4">
              <span className="block w-6 h-[2px] bg-[#C9293A]" />
              Working Together
              <span className="block w-6 h-[2px] bg-[#C9293A]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-black">
              Our Strategic Partners
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Through collaboration with national and international organisations,
              FPI Zambia continues to strengthen independent journalism, media
              literacy and democratic participation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnersData.partners.map((partner, idx) => (
              <AnimatedSection key={partner.name} delay={idx * 80}>
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full border border-gray-100 flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9293A]/20 to-[#E8610A]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <HeartHandshake className="w-10 h-10 text-[#C9293A]" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C9293A] mb-2">
                    Strategic Partner
                  </span>
                  <h3 className="font-serif text-xl font-bold mb-3">{partner.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {partner.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW WE WORK TOGETHER (collaboration) ========== */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#C9293A] mb-4">
              <span className="block w-6 h-[2px] bg-[#C9293A]" />
              Collaboration
              <span className="block w-6 h-[2px] bg-[#C9293A]" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-black">
              How We Work Together
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnersData.collaboration.map((item, idx) => {
              const Icon = item.icon;
              return (
                <AnimatedSection key={item.title} delay={idx * 100}>
                  <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full border border-gray-100 text-center group">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C9293A] to-[#E8610A] flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.text}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION (like About page) ========== */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-r from-[#C9293A]/10 to-[#E8610A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[#C9293A] mb-3">
                <span className="block w-6 h-[2px] bg-[#C9293A]" />
                {partnersData.cta.tag}
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-black leading-tight mb-2">
                {partnersData.cta.title}
              </h2>
              <p className="text-gray-600 max-w-md">{partnersData.cta.description}</p>
            </div>
            <Link
              to={partnersData.cta.button.link}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9293A] to-[#E8610A] text-white px-8 py-3 rounded-full font-semibold hover:-translate-y-1 transition-all duration-300 shadow-lg whitespace-nowrap"
            >
              {partnersData.cta.button.text}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;