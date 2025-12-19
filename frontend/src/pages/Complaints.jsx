import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Complaints() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [open, setOpen] = useState(false);

  const [issue, setIssue] = useState("");
  const [category, setCategory] = useState("");

  const loadComplaints = async () => {
    const res = await api.get("/complaints/all");
    setComplaints(res.data);
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const addComplaint = async () => {
    await api.post("/complaints/add", { issue, category });
    setOpen(false);
    loadComplaints();
  };

  const resolveComplaint = async (id) => {
    await api.put(`/complaints/resolve/${id}`);
    loadComplaints();
  };

  const deleteComplaint = async (id) => {
    await api.delete(`/complaints/delete/${id}`);
    loadComplaints();
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Complaints</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Complaint
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Issue</th>
            <th className="p-2">Category</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((c) => (
            <tr key={c._id}>
              <td className="p-2">{c.issue}</td>
              <td className="p-2">{c.category}</td>
              <td className="p-2">{c.status}</td>

              <td className="p-2 flex gap-4">
                {c.status === "Pending" && (
                  <button
                    onClick={() => resolveComplaint(c._id)}
                    className="text-green-600"
                  >
                    Resolve
                  </button>
                )}

                {user.role === "admin" && (
                  <button
                    onClick={() => deleteComplaint(c._id)}
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

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 shadow">
            <h2 className="text-xl font-bold mb-4">Add Complaint</h2>

            <input
              className="w-full border p-2 mb-3"
              placeholder="Issue"
              onChange={(e) => setIssue(e.target.value)}
            />

            <select
              className="w-full border p-2 mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select Category</option>
              <option>Water</option>
              <option>Roads</option>
              <option>Electricity</option>
              <option>Health</option>
            </select>

            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>

              <button
                onClick={addComplaint}
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
