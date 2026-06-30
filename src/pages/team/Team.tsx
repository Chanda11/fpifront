import { useEffect, useRef, useState } from "react";
import {
  Users,
  ArrowRight,
  Briefcase,
} from "lucide-react";

// ============================================================
// DATA CONFIGURATION – all content can be replaced from admin
// ============================================================
const teamData = {
  hero: {
    eyebrow: "Our People",
    title: "Meet Our",
    highlight: "Team",
    description:
      "The dedicated professionals behind FPI Zambia's mission to strengthen media freedom, literacy, and democratic governance.",
    backgroundImage: "/images/activity-1.jpg",
    ctaPrimary: { text: "View All Members", link: "#team-grid" },
    ctaSecondary: { text: "Join Us", link: "#join" },
  },
  intro: {
    tag: "Who We Are",
    title: "Driven by Purpose",
    description:
      "We are a multidisciplinary team of media experts, researchers, advocates, and educators committed to building a more informed and democratic Zambia.",
  },
  teamMembers: [
    {
      id: 1,
      name: "Dr. Sarah Mwansa",
      role: "Executive Director",
      bio: "Leading FPI Zambia's strategic direction and advocacy for media freedom. 15+ years in media development and governance.",
      email: "sarah@fpizambia.org",
      linkedin: "#",
      twitter: "#",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "John Chanda",
      role: "Programs Manager",
      bio: "Oversees all training, research, and community engagement programmes. Former journalist with a passion for media literacy.",
      email: "john@fpizambia.org",
      linkedin: "#",
      twitter: "#",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Grace Banda",
      role: "Research & Policy Lead",
      bio: "Leads research on media freedom, digital rights, and civic participation. Holds a Master's in Development Studies.",
      email: "grace@fpizambia.org",
      linkedin: "#",
      twitter: "#",
      image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Michael Phiri",
      role: "Communications Officer",
      bio: "Manages public engagement, press relations, and digital content. Expert in strategic communications and storytelling.",
      email: "michael@fpizambia.org",
      linkedin: "#",
      twitter: "#",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "Lungowe Simwanza",
      role: "Finance & Admin",
      bio: "Ensures operational efficiency and financial sustainability. Brings 10 years of experience in NGO finance.",
      email: "lungowe@fpizambia.org",
      linkedin: "#",
      twitter: "#",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop&crop=face",
    },
    {
      id: 6,
      name: "Chileshe Kaluba",
      role: "Youth Engagement Officer",
      bio: "Coordinates youth programmes, workshops, and digital literacy initiatives. Passionate about empowering young leaders.",
      email: "chileshe@fpizambia.org",
      linkedin: "#",
      twitter: "#",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face",
    },
  ],
  stats: {
    tag: "Our Impact",
    title: "Team in Numbers",
    items: [
      { number: "6", label: "Core Team" },
      { number: "15+", label: "Network Partners" },
      { number: "20+", label: "Communities Reached" },
      { number: "10+", label: "Years of Service" },
    ],
  },
  join: {
    title: "Join Our Team",
    description:
      "We're always looking for passionate individuals to join our mission. If you believe in media freedom and democratic participation, get in touch.",
    buttonText: "Contact Us",
    link: "mailto:info@fpizambia.org",
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
const SectionBadge = ({ text, icon, light = false }: { text: string; icon?: React.ReactNode; light?: boolean }) => (
  <div
    className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 ${
      light ? "bg-white/10" : "bg-[#C9293A]/10"
    }`}
  >
    {icon && (
      <span className={light ? "text-white" : "text-[#C9293A]"}>{icon}</span>
    )}
    <span
      className={`text-xs font-medium tracking-wide ${
        light ? "text-white" : "text-[#C9293A]"
      }`}
    >
      {text}
    </span>
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


// ============================================================
// MAIN COMPONENT
// ============================================================
const Team = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-white to-gray-50">
      <style>{`
        .gradient-highlight {
          background: linear-gradient(120deg, #E8610A, #F5A623);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          font-style: italic;
          display: inline-block;
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -12px rgba(0,0,0,0.25);
        }
      `}</style>

      {/* ========== HERO – IDENTICAL TO OTHER PAGES ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${teamData.hero.backgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C9293A]/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#F5A623]/15 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="block w-6 h-[2px] bg-[#E8610A] rounded-full"></span>
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/70">
                {teamData.hero.eyebrow}
              </span>
              <span className="block w-6 h-[2px] bg-[#E8610A] rounded-full"></span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              {teamData.hero.title}{" "}
              <span className="gradient-highlight">{teamData.hero.highlight}</span>
            </h1>
            <p className="text-white/70 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
              {teamData.hero.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href={teamData.hero.ctaPrimary.link}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9293A] to-[#E8610A] text-white px-6 py-3 rounded-full font-semibold text-sm hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                {teamData.hero.ctaPrimary.text}
                <ArrowRight size={16} />
              </a>
              <a
                href={teamData.hero.ctaSecondary.link}
                className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                {teamData.hero.ctaSecondary.text}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========== INTRO ========== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 text-[#C9293A] mb-4">
              <span className="block w-6 h-[2px] bg-[#C9293A] rounded-full"></span>
              <span className="text-[10px] font-bold tracking-[0.16em] uppercase">{teamData.intro.tag}</span>
              <span className="block w-6 h-[2px] bg-[#C9293A] rounded-full"></span>
            </div>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#C9293A]/10 to-[#E8610A]/10 mb-6">
              <Users className="w-8 h-8 text-[#C9293A]" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-black mb-4 text-gray-900">
              {teamData.intro.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {teamData.intro.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== TEAM GRID – WITH PHOTOS ========== */}
      <section id="team-grid" className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <SectionBadge text="Team Members" icon={<Users size={14} />} />
            <h2 className="font-serif text-3xl md:text-4xl font-black text-gray-900">
              Meet the Team
            </h2>
            <p className="text-gray-600 mt-2">Passionate professionals driving our mission forward.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.teamMembers.map((member, idx) => (
              <AnimatedSection key={member.id} delay={idx * 80}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col border border-gray-100">
                  {/* Avatar – professional photo */}
                  <div className="relative mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-[#C9293A]/20 shadow-lg hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="text-center flex-1">
                    <h3 className="font-serif text-xl font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#C9293A] text-sm font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>


                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="relative py-20 md:py-28 bg-[#080c1a] overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyek0zNiAxNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <SectionBadge text={teamData.stats.tag} light />
            <h2 className="font-serif text-3xl md:text-4xl font-black text-white">
              {teamData.stats.title}
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {teamData.stats.items.map((stat, idx) => (
              <AnimatedSection key={stat.label} delay={idx * 80}>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="font-serif text-4xl md:text-5xl font-black text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== JOIN SECTION ========== */}
      <section id="join" className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Briefcase className="w-14 h-14 text-[#C9293A] mx-auto mb-4" />
            <h2 className="font-serif text-3xl md:text-5xl font-black mb-4 text-gray-900">
              {teamData.join.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg mb-8 max-w-2xl mx-auto">
              {teamData.join.description}
            </p>
            <a
              href={teamData.join.link}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9293A] to-[#E8610A] text-white px-8 py-3 rounded-full font-semibold hover:-translate-y-1 transition-all duration-300 shadow-lg"
            >
              {teamData.join.buttonText}
              <ArrowRight size={18} />
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Team;