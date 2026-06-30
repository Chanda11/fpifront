import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Promoting Free Press",
    subtitle: "Good Journalism & Defending Human Rights",
    description: "Empowering journalists and defending media freedom in Zambia",
    image: "/images/hero-bg-1.jpg",
    button: "Learn More",
    link: "/about",
  },
  {
    title: "Media & Information Literacy",
    subtitle: "Empowering Communities Through Knowledge",
    description: "Building critical thinking skills and digital safety awareness",
    image: "/images/hero-bg-2.jpg",
    button: "Explore Programs",
    link: "/programs/media-literacy",
  },
  {
    title: "Capacity Building & Training",
    subtitle: "Strengthening Journalistic Excellence",
    description: "Professional development programs for media practitioners",
    image: "/images/hero-bg-3.jpg",
    button: "Join Training",
    link: "/programs/capacity-building",
  },
];

const HeroCarousel = () => {
  return (
    <div className="min-h-screen h-[100vh] w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* BACKGROUND IMAGE */}
            <div
              className="h-full w-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-black/50 flex items-center justify-center text-center px-4">
                <div className="max-w-4xl animate-fade-in">

                  {/* TITLE */}
                  <h1 className="text-5xl md:text-7xl leading-tight font-bold text-white mb-4">
                    {slide.title}
                  </h1>

                  {/* SUBTITLE */}
                  <h2 className="text-lg md:text-2xl font-medium text-blue-200 mb-4">
                    {slide.subtitle}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className="text-lg text-gray-200 mb-8">
                    {slide.description}
                  </p>

                  {/* BUTTON */}
                  <Link
                    to={slide.link}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-transform hover:scale-105"
                  >
                    {slide.button}
                  </Link>

                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;