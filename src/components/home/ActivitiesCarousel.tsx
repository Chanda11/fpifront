import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const activities = [
  {
    title: "Media Literacy Workshop",
    desc: "Training communities on critical media consumption.",
    image: "/images/activity-1.jpg",
  },
  {
    title: "Press Freedom Dialogue",
    desc: "Engaging stakeholders on journalism rights.",
    image: "/images/activity-2.jpg",
  },
];

const ActivitiesCarousel = () => {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Activities & Programs
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
      >
        {activities.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={item.image}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ActivitiesCarousel;