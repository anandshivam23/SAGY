import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Villages() {
  const { user } = useAuth();
  const [villages, setVillages] = useState([]);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [population, setPopulation] = useState("");

  const loadVillages = async () => {
    const res = await api.get("/villages/all");
    setVillages(res.data);
  };

  useEffect(() => {
    loadVillages();
  }, []);

  const addVillage = async () => {
    await api.post("/villages/add", { name, population });
    setOpen(false);
    loadVillages();
  };

  const deleteVillage = async (id) => {
    await api.delete(`/villages/delete/${id}`);
    loadVillages();
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Villages</h1>

        {user.role === "admin" && (
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Village
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Village Name</th>
            <th className="p-2">Population</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {villages.map((v) => (
            <tr key={v._id}>
              <td className="p-2">{v.name}</td>
              <td className="p-2">{v.population}</td>

              <td className="p-2">
                {user.role === "admin" && (
                  <button
                    onClick={() => deleteVillage(v._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {open && user.role === "admin" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 shadow">
            <h2 className="text-xl font-bold mb-4">Add Village</h2>

            <input
              className="w-full border p-2 mb-3"
              placeholder="Village Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border p-2 mb-3"
              placeholder="Population"
              onChange={(e) => setPopulation(e.target.value)}
            />

            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={addVillage}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
