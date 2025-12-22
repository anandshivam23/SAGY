/* eslint-disable react-refresh/only-export-components */
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
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await api.get("/projects/all");
        setProjects(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Failed to load projects", error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, [refresh]);

  const addProject = async () => {
    try {
      if (!name || !category || category === "Select category") {
        alert("Please provide name and category");
        return;
      }
      await api.post("/projects/add", { name, category, budget, status });
      setOpen(false);
      resetForm();
      setRefresh((r) => r + 1);
    } catch (error) {
      alert("Failed to add project: " + (error.response?.data?.message || error.message));
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await api.delete(`/projects/delete/${id}`);
      setRefresh((r) => r + 1);
    } catch (error) {
      alert("Failed to delete project: " + (error.response?.data?.message || error.message));
    }
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
    try {
      await api.put(`/projects/update/${editData._id}`, {
        name,
        category,
        budget,
        status,
      });
      setOpen(false);
      setEditData(null);
      resetForm();
      setRefresh((r) => r + 1);
    } catch (error) {
      alert("Failed to update project: " + (error.response?.data?.message || error.message));
    }
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setBudget("");
    setStatus("Not Started");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Ongoing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Project Management</h1>
          <p className="text-gray-500 mt-1">Track and update village development initiatives.</p>
        </div>

        {user?.role === "admin" && (
          <button
            onClick={() => {
              setOpen(true);
              resetForm();
              setEditData(null);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            New Project
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
          <p className="text-gray-500 text-lg">No projects found. Use the button above to add one.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-gray-500 uppercase tracking-widest text-left">Project Name</th>
                  <th className="px-6 py-4 text-center text-xs font-black text-gray-500 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-center text-xs font-black text-gray-500 uppercase tracking-widest">Budget</th>
                  <th className="px-6 py-4 text-center text-xs font-black text-gray-500 uppercase tracking-widest">Status</th>
                  {user?.role === "admin" && <th className="px-6 py-4 text-right text-xs font-black text-gray-500 uppercase tracking-widest">Actions</th>}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-900">{p.name}</div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center font-mono font-medium text-gray-600">
                      ₹{p.budget ? parseInt(p.budget).toLocaleString() : '0'}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(p.status)}`}>
                        {p.status}
                      </span>
                    </td>

                    {user?.role === "admin" && (
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditModal(p)}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                          </button>

                          <button
                            onClick={() => deleteProject(p._id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {open &&
        (user.role === "admin" ? (
          <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl transform transition-all scale-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-gray-900">
                  {editData ? "Update Project" : "New Project"}
                </h2>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Project Name</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                    placeholder="e.g. Village Road Construction"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option>Select category</option>
                      <option>Water</option>
                      <option>Roads</option>
                      <option>Health</option>
                      <option>Education</option>
                      <option>Energy</option>
                      <option>Sanitation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Budget (₹)</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                      placeholder="0"
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Current Status</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option>Not Started</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>On Hold</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => setOpen(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={editData ? updateProject : addProject}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all transform active:scale-95"
                >
                  {editData ? "Update Project" : "Create Project"}
                </button>
              </div>
            </div>
          </div>
        ) : null)}
    </div>
  );
}
