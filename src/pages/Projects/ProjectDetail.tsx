import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Project {
  id: number;
  title: string;
  description: string;
  content: string;
  image?: string;
  category?: string;
  status?: string;
}

const ProjectDetail = () => {
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 text-center">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 text-center">
        Project not found
      </div>
    );
  }

const heroImage =
  project.image || "/images/activity-1.jpg";

const category =
  project.category || "Project";

const status =
  project.status || "Active";

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

        <span className="inline-block bg-[#C9293A] px-4 py-2 rounded-full text-sm font-semibold mb-4 mr-3">
          {category}
        </span>

        <span className="inline-block bg-[#C9A84C] text-black px-4 py-2 rounded-full text-sm font-semibold mb-4">
          {status}
        </span>

        <h1 className="text-5xl md:text-7xl font-bold mt-6 max-w-5xl">
          {project.title}
        </h1>

        <p className="text-xl text-gray-300 mt-6 max-w-3xl">
          {project.description}
        </p>

      </div>
    </section>

    {/* PROJECT DETAILS */}
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-3 gap-10">

          {/* INFO CARD */}
          <div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow">

              <h3 className="text-2xl font-bold mb-6">
                Project Information
              </h3>

              <div className="space-y-5">

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
                    Status
                  </p>

                  <p className="font-semibold">
                    {status}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Organization
                  </p>

                  <p className="font-semibold">
                    FPI Zambia
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* CONTENT */}
          <div className="lg:col-span-2">

            <h2 className="text-4xl font-bold mb-6">
              About This Project
            </h2>

            <div className="text-lg text-gray-700 leading-8 whitespace-pre-line">
              {project.content}
            </div>

          </div>

        </div>

      </div>

    </section>

    {/* IMPACT */}
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          Project Impact
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-5xl font-bold text-[#C9293A]">
              500+
            </h3>

            <p className="mt-4 text-gray-600">
              Beneficiaries
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-5xl font-bold text-[#C9293A]">
              10+
            </h3>

            <p className="mt-4 text-gray-600">
              Communities
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-5xl font-bold text-[#C9293A]">
              5+
            </h3>

            <p className="mt-4 text-gray-600">
              Partners
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h3 className="text-5xl font-bold text-[#C9293A]">
              100%
            </h3>

            <p className="mt-4 text-gray-600">
              Commitment
            </p>
          </div>

        </div>

      </div>

    </section>

    {/* GALLERY */}
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          Project Gallery
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {[1, 2, 3].map((item) => (
            <img
              key={item}
              src={heroImage}
              alt={project.title}
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
          Supporting Media Freedom & Inclusion
        </h2>

        <p className="text-gray-300 text-lg mb-8">
          Discover more initiatives that are
          creating positive change through media
          literacy, advocacy and citizen engagement.
        </p>

        <a
          href="/"
          className="inline-block bg-[#C9293A] px-8 py-4 rounded-xl font-semibold hover:bg-red-700 transition"
        >
          Explore More Projects
        </a>

      </div>

    </section>
  </>
);
};

export default ProjectDetail;