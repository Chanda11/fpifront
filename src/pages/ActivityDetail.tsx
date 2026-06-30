import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
} from "lucide-react";

type Activity = {
  id: number;
  title: string;
  description: string;
  image?: string;
  date?: string;
  location?: string;
  participants?: number;
  category?: string;
};

const ActivityDetail = () => {
  const { id } = useParams();

  const [activity, setActivity] =
    useState<Activity | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/activities/${id}`
        );

        const data = await res.json();

        setActivity(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading activity...
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Activity not found
      </div>
    );
  }

  const heroImage =
    activity.image || "/images/activity-1.jpg";

  const category =
    activity.category || "Activity";

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-[75vh] flex items-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#080C1A]/80" />

        <div className="relative max-w-7xl mx-auto px-6 text-white">

          <Link
            to="/"
            className="inline-flex items-center text-[#C9A84C] mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Activities
          </Link>

          <span className="inline-block bg-[#C9293A] px-4 py-2 rounded-full text-sm font-semibold mb-6">
            {category}
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 max-w-4xl">
            {activity.title}
          </h1>

          <div className="flex flex-wrap gap-8 text-lg">

            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#C9A84C]" />
              {activity.date || "Date TBA"}
            </div>

            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-[#C9A84C]" />
              {activity.location || "Location TBA"}
            </div>

            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-[#C9A84C]" />
              {activity.participants || 0} Participants
            </div>

          </div>

        </div>
      </section>

      {/* DETAILS */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid lg:grid-cols-3 gap-10">

            {/* INFO CARD */}
            <div>

              <div className="bg-gray-50 rounded-2xl p-8 shadow">

                <h3 className="text-2xl font-bold mb-6">
                  Activity Information
                </h3>

                <div className="space-y-6">

                  <div>
                    <p className="text-gray-500 text-sm">
                      Category
                    </p>

                    <p className="font-semibold">
                      {category}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Date
                    </p>

                    <p className="font-semibold">
                      {activity.date || "TBA"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Location
                    </p>

                    <p className="font-semibold">
                      {activity.location || "TBA"}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Participants
                    </p>

                    <p className="font-semibold">
                      {activity.participants || 0}
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="lg:col-span-2">

              <h2 className="text-4xl font-bold mb-6">
                About This Activity
              </h2>

              <p className="text-lg leading-8 text-gray-700 whitespace-pre-line">
                {activity.description}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* IMPACT */}
      <section className="py-20 bg-gray-50">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-12">
            Activity Impact
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-2xl shadow p-8 text-center">
              <h3 className="text-5xl font-bold text-[#C9293A]">
                {activity.participants || 0}
              </h3>

              <p className="mt-4 text-gray-600">
                Participants Reached
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-8 text-center">
              <h3 className="text-5xl font-bold text-[#C9293A]">
                1
              </h3>

              <p className="mt-4 text-gray-600">
                Community Engaged
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-8 text-center">
              <h3 className="text-5xl font-bold text-[#C9293A]">
                100%
              </h3>

              <p className="mt-4 text-gray-600">
                Commitment to Impact
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* GALLERY */}
      <section className="py-20 bg-white">

        <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-4xl font-bold text-center mb-12">
            Activity Gallery
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[1, 2, 3].map((item) => (
              <img
                key={item}
                src={heroImage}
                alt={activity.title}
                className="h-80 w-full object-cover rounded-2xl shadow-lg"
              />
            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-24 bg-[#080C1A] text-white">

        <div className="max-w-4xl mx-auto px-4 text-center">

          <h2 className="text-5xl font-bold mb-6">
            Explore More Activities
          </h2>

          <p className="text-gray-300 text-lg mb-8">
            Discover how FPI Zambia continues to
            promote media freedom, media literacy,
            journalism excellence and democratic
            participation across Zambia.
          </p>

          <Link
            to="/"
            className="inline-block bg-[#C9293A] hover:bg-red-700 px-8 py-4 rounded-xl font-semibold transition"
          >
            View More Activities
          </Link>

        </div>

      </section>
    </>
  );
};

export default ActivityDetail;