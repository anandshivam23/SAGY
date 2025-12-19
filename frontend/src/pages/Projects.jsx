import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState("Not Started");

  const loadProjects = async () => {
    const res = await api.get("/projects/all");
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const addProject = async () => {
    await api.post("/projects/add", { name, category, budget, status });
    setOpen(false);
    resetForm();
    loadProjects();
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/delete/${id}`);
    loadProjects();
  };

  const openEditModal = (project) => {
    setEditData(project);
    setName(project.name);
    setCategory(project.category);
    setBudget(project.budget);
    setStatus(project.status);
    setOpen(true);
  };

  const updateProject = async () => {
    await api.put(`/projects/update/${editData._id}`, {
      name,
      category,
      budget,
      status,
    });
    setOpen(false);
    setEditData(null);
    resetForm();
    loadProjects();
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setBudget("");
    setStatus("Not Started");
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Projects</h1>

        {user.role === "admin" && (
          <button
            onClick={() => {
              setOpen(true);
              resetForm();
              setEditData(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Project
          </button>
        )}
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Project Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Budget</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((p) => (
            <tr key={p._id}>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">₹{p.budget}</td>
              <td className="p-2">{p.status}</td>

              <td className="p-2 flex gap-4">
                {user.role === "admin" && (
                  <button
                    onClick={() => openEditModal(p)}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                )}

                {user.role === "admin" && (
                  <button
                    onClick={() => deleteProject(p._id)}
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

      {open &&
        (user.role === "admin" ? (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
            <div className="bg-white p-6 rounded w-96 shadow">
              <h2 className="text-xl font-bold mb-4">
                {editData ? "Edit Project" : "Add Project"}
              </h2>

              <input
                className="w-full border p-2 mb-3"
                placeholder="Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <select
                className="w-full border p-2 mb-3"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Select category</option>
                <option>Water</option>
                <option>Roads</option>
                <option>Health</option>
                <option>Education</option>
              </select>

              <input
                className="w-full border p-2 mb-3"
                placeholder="Budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />

              <select
                className="w-full border p-2 mb-3"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option>Not Started</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>

              <div className="flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>

                <button
                  onClick={editData ? updateProject : addProject}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editData ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        ) : null)}
    </div>
  );
}
