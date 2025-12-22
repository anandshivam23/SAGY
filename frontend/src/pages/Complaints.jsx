import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Complaints() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/complaints/all")
      .then((res) => {
        setComplaints(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setComplaints([]))
      .finally(() => setLoading(false));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/complaints/add", {
        title,
        description,
      });
      setComplaints([res.data, ...complaints]);
      setTitle("");
      setDescription("");
      alert("Complaint submitted successfully.");
    } catch (err) {
      alert("Failed to submit complaint.");
    }
  };

  const resolveComplaint = async (id) => {
    await api.put(`/complaints/resolve/${id}`);
    const updated = complaints.map((c) =>
      c._id === id ? { ...c, status: "Resolved" } : c
    );
    setComplaints(updated);
  };

  const deleteComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    await api.delete(`/complaints/delete/${id}`);
    setComplaints(complaints.filter((c) => c._id !== id));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Grievance Redressal</h1>
          <p className="text-gray-500 mt-1">Submit and track complaints from the community.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {user && (
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-lg shadow-blue-50 border border-blue-100 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                New Complaint
              </h2>
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                    placeholder="e.g. Water Contamination"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium h-32 resize-none"
                    placeholder="Describe the issue in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 transform hover:-translate-y-0.5 active:scale-95">
                  Submit Complaint
                </button>
              </form>
            </div>
          </div>
        )}

        <div className={user ? "lg:col-span-2 space-y-4" : "lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4"}>
          {complaints.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300 col-span-full">
              <p className="text-gray-500 text-lg">No complaints recorded recently.</p>
            </div>
          ) : (
            complaints.map((c) => (
              <div
                key={c._id}
                className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md relative overflow-hidden ${c.status === "Resolved" ? "opacity-75" : ""}`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full ${c.status === "Resolved" ? "bg-green-500" : "bg-orange-500"}`}></div>

                <div className="pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="font-bold text-lg text-gray-900">{c.title}</h2>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${c.status === "Resolved" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{c.description}</p>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                    {(user?.role === "admin" || user?.role === "officer") &&
                      c.status !== "Resolved" && (
                        <button
                          onClick={() => resolveComplaint(c._id)}
                          className="text-green-600 hover:text-green-700 text-sm font-bold flex items-center gap-1 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          Mark Resolved
                        </button>
                      )}

                    {user?.role === "admin" && (
                      <button
                        onClick={() => deleteComplaint(c._id)}
                        className="text-gray-400 hover:text-red-600 text-sm font-bold flex items-center gap-1 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors ml-auto"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
