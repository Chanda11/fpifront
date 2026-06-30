import { Link } from "react-router-dom";
import {
  MapPinned,
  BookOpen,
  Radio,
  Video,
  ArrowRight,
} from "lucide-react";

const items = [
  {
    title: "Explore MIL Hubs",
    description:
      "Discover Media & Information Literacy hubs across Zambia.",
    icon: MapPinned,
    color: "#2563EB",
    link: "/mil/hubs",
  },
  {
    title: "View Brochure",
    description:
      "Download the official Media & Information Literacy brochure.",
    icon: BookOpen,
    color: "#EA580C",
    link: "/mil/brochure",
  },
  {
    title: "Radio Spots",
    description:
      "Listen to awareness programmes and community radio campaigns.",
    icon: Radio,
    color: "#16A34A",
    link: "/mil/radio-spots",
  },
  {
    title: "YouTube Channel",
    description:
      "Watch documentaries, interviews and outreach activities.",
    icon: Video,
    color: "#DC2626",
    link: "https://youtube.com/",
    external: true,
  },
];

const QuickAccess = () => {
  return (
    <section className="-mt-16 relative z-20 px-5">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {items.map((item, index) => {
            const Icon = item.icon;

            const card = (
              <div className="group bg-white rounded-3xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4"
                style={{
                  borderColor: item.color,
                }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{
                    background: `${item.color}20`,
                  }}
                >
                  <Icon
                    size={30}
                    color={item.color}
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>

                <p className="text-slate-600 leading-7 mb-6">
                  {item.description}
                </p>

                <div
                  className="inline-flex items-center gap-2 font-semibold"
                  style={{
                    color: item.color,
                  }}
                >
                  Explore

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </div>

              </div>
            );

            if (item.external) {
              return (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {card}
                </a>
              );
            }

            return (
              <Link
                key={index}
                to={item.link}
              >
                {card}
              </Link>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default QuickAccess;