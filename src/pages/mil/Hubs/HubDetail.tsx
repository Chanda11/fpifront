import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin, Users, Calendar } from "lucide-react";

const HubDetail = () => {
  const { slug } = useParams();

  const [hub, setHub] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

fetch(`http://localhost:5000/api/hubs/${slug}`)
  .then((res) => res.json())
      .then((data) => {
        setHub(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 text-center text-xl">
        Loading...
      </div>
    );
  }

  if (!hub || hub.message) {
    return (
      <div className="pt-32 text-center text-xl">
        Hub not found
      </div>
    );
  }

  return (
    <>
      {/* HERO */}
      <section className="bg-blue-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4">

          <h1 className="text-5xl font-bold">
            {hub.name}
          </h1>

          <p className="text-blue-200 mt-4">
            {hub.province?.name}
          </p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">

            <div>
              <h3 className="font-semibold text-blue-200">
                Coordinator
              </h3>

              <p>
                {hub.coordinator || "Not Assigned"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-blue-200">
                Participants
              </h3>

              <p>
                {hub.participants || 0}+
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-blue-200">
                Activities
              </h3>

              <p>
                {hub.events?.length || 0}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* HUB INFO */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <div className="grid md:grid-cols-3 gap-8 mb-12">

            <div className="bg-white rounded-xl shadow p-6">
              <MapPin className="mb-3 text-blue-600" />

              <h3 className="font-bold">
                Location
              </h3>

              <p>
                {hub.location || "Not Available"}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <Users className="mb-3 text-blue-600" />

              <h3 className="font-bold">
                Participants
              </h3>

              <p>
                {hub.participants || 0} Participants
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <Calendar className="mb-3 text-blue-600" />

              <h3 className="font-bold">
                Activities
              </h3>

              <p>
                {hub.events?.length || 0} Activities Conducted
              </p>
            </div>

          </div>

          {/* COORDINATOR */}
          <div className="bg-white rounded-xl shadow p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Hub Coordinator
            </h2>

            <p className="text-gray-600">
              {hub.coordinator || "Not Assigned"}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-3xl font-bold mb-4">
              About this Hub
            </h2>

            <p className="text-gray-600 leading-8">
              {hub.description ||
                "This Media and Information Literacy Hub serves as a community learning space where citizens, youth, educators and media practitioners can access training, resources and opportunities for digital literacy and civic engagement."}
            </p>
          </div>

          {/* EVENTS */}
          <div className="bg-white rounded-xl shadow p-8 mt-8">
            <h2 className="text-3xl font-bold mb-6">
              Hub Activities
            </h2>

            {hub.events?.length > 0 ? (
              <ul className="space-y-3">
                {hub.events.map((event: any) => (
              <li
                key={event.id}
                className="border-b pb-3 flex justify-between items-center"
              >
                <span>{event.title}</span>

                <span className="text-[#C9293A] font-semibold">
                  Activity
                </span>
              </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                No activities added yet.
              </p>
            )}
          </div>

          {/* GALLERY */}
          <div className="bg-white rounded-xl shadow p-8 mt-8">
            <h2 className="text-3xl font-bold mb-6">
              Gallery
            </h2>

            {hub.photos?.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-4">
                {hub.photos.map((photo: any) => (
                  <img
                    key={photo.id}
                    src={photo.url}
                    alt={hub.name}
                    className="rounded-xl h-56 w-full object-cover"
                  />
                ))}
              </div>
            ) : (
          <img
            src="/images/activity-1.jpg"
            alt="MIL Hub"
            className="rounded-xl h-56 w-full object-cover"
          />
            )}
          </div>

        </div>
        <section className="bg-[#080C1A] text-white py-24 mt-20">
          <div className="max-w-4xl mx-auto px-4 text-center">

            <h2 className="text-5xl font-bold mb-6">
              Join the Media & Information Literacy Network
            </h2>

            <p className="text-gray-300 text-lg mb-8">
              MIL Hubs provide safe spaces for learning,
              collaboration, civic engagement and digital literacy
              across Zambia.
            </p>

            <a
              href="/contact"
              className="inline-block bg-[#C9293A] px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Contact Us
            </a>

          </div>
        </section>      
      </section>
    </>
  );
};

export default HubDetail;