import React, { useEffect, useState } from "react";

interface Province {
  id: number;
  name: string;
}

const Provinces = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [name, setName] = useState("");

  const fetchProvinces = () => {
    fetch("http://localhost:5000/api/provinces")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  const createProvince = async () => {
    if (!name.trim()) return;

    await fetch("http://localhost:5000/api/provinces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });

    setName("");
    fetchProvinces();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Provinces
      </h1>

      <div className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Province Name"
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={createProvince}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Province
        </button>
      </div>

      <div className="bg-white rounded shadow">
        {provinces.map((province) => (
          <div
            key={province.id}
            className="p-4 border-b"
          >
            {province.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Provinces;