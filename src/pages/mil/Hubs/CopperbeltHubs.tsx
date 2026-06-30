const CopperbeltHubs = () => {
  const hubs = [
    "Ndola",
    "Kitwe",
    "Mufulira",
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4">

        <h1 className="text-5xl font-bold mb-4">
          Copperbelt Province MIL Hubs
        </h1>

        <p className="text-gray-600 text-lg mb-12">
          Media and Information Literacy hubs operating across Copperbelt Province.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {hubs.map((hub) => (
            <div
              key={hub}
              className="bg-white p-8 rounded-2xl shadow hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-bold mb-3">
                {hub}
              </h3>

              <p className="text-gray-600">
                Community Media and Information Literacy Hub.
              </p>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default CopperbeltHubs;