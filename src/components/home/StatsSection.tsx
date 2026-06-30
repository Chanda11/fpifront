import { motion } from "framer-motion";

const stats = [
  { number: "500+", label: "Journalists Trained" },
  { number: "50+", label: "Communities Reached" },
  { number: "100+", label: "Workshops Conducted" },
  { number: "25+", label: "Partner Organizations" },
];

const StatsSection = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Our Impact
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <h3 className="text-4xl font-bold text-blue-600">
                {item.number}
              </h3>

              <p className="mt-2 text-gray-600">
                {item.label}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default StatsSection;