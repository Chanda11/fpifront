import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Hub {
  id: number;
  name: string;
  coordinator?: string;
  province: {
    name: string;
  };
}

const Hubs = () => {
  const [hubs, setHubs] = useState<Hub[]>([]);

  const deleteHub = async (id: number) => {
  const confirmDelete = window.confirm(
    "Delete this hub?"
  );

  if (!confirmDelete) return;

  try {
    await fetch(
      `http://localhost:5000/api/hubs/${id}`,
      {
        method: "DELETE",
      }
    );

    setHubs(
      hubs.filter((hub) => hub.id !== id)
    );
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetch("http://localhost:5000/api/hubs")
      .then((res) => res.json())
      .then((data) => setHubs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          MIL Hubs
        </h1>

        <Link
        to="/admin/hubs/create"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        >
        Add Hub
        </Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full">
<thead>
  <tr className="border-b bg-gray-50">
    <th className="p-3 text-left">Hub</th>
    <th className="p-3 text-left">Province</th>
    <th className="p-3 text-left">Coordinator</th>
    <th className="p-3 text-left">Actions</th>
  </tr>
</thead>

<tbody>
  {hubs.map((hub) => (
    <tr key={hub.id} className="border-b">
      <td className="p-3">{hub.name}</td>

      <td className="p-3">
        {hub.province?.name}
      </td>

      <td className="p-3">
        {hub.coordinator}
      </td>

      <td className="p-3 flex gap-2">
        <Link
          to={`/admin/hubs/${hub.id}/edit`}
          className="bg-yellow-500 text-white px-3 py-1 rounded"
        >
          Edit
        </Link>

        <button
          className="bg-red-600 text-white px-3 py-1 rounded"
          onClick={() => deleteHub(hub.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
        </table>

        {hubs.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No hubs found
          </div>
        )}
      </div>
    </div>
  );
};

export default Hubs;