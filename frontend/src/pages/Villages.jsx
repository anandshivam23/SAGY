import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Villages() {
  const { user } = useAuth();
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [population, setPopulation] = useState("");
  const [issues, setIssues] = useState("");
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    api.get("/villages/all")
      .then((res) => {
        setVillages(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setVillages([]))
      .finally(() => setLoading(false));
  }, [refresh]);

  const addVillage = async () => {
    try {
      if (!name) {
        alert("Village name is required");
        return;
      }
      await api.post("/villages/add", { name, population, issues });
      setOpen(false);
      setName("");
      setPopulation("");
      setIssues("");
      setRefresh((r) => r + 1);
    } catch (error) {
      alert("Failed to add village: " + (error.response?.data?.message || error.message));
    }
  };

  const deleteVillage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this village?")) return;
    try {
      await api.delete(`/villages/delete/${id}`);
      setRefresh((r) => r + 1);
    } catch (error) {
      alert("Failed to delete village: " + (error.response?.data?.message || error.message));
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
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Adopted Villages</h1>
          <p className="text-gray-500 mt-1">Manage and monitor village demographics and issues.</p>
        </div>

        {user?.role === "admin" && (
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Add Village
          </button>
        )}
      </div>

      {villages.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
          <p className="text-gray-500 text-lg">No villages found. Start by adding one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {villages.map((v) => (
            <div key={v._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
              </div>

              <h2 className="text-2xl font-black text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{v.name}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  <span className="font-medium text-gray-900">{v.population ? parseInt(v.population).toLocaleString() : 'N/A'}</span>
                  <span className="ml-1 text-sm">residents</span>
                </div>
                {v.issues && (
                  <div className="flex items-start text-gray-600">
                    <svg className="w-5 h-5 mr-3 mt-0.5 text-red-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                    <span className="text-sm italic">{v.issues}</span>
                  </div>
                )}
              </div>

              {user?.role === "admin" && (
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={() => deleteVillage(v._id)}
                    className="text-red-500 hover:text-red-700 font-bold text-sm bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-3xl w-full max-w-md shadow-2xl transform transition-all scale-100">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Add New Village</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Village Name</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                  placeholder="e.g. Rampur"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Population</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium"
                  placeholder="e.g. 5000"
                  type="number"
                  value={population}
                  onChange={(e) => setPopulation(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Key Issues</label>
                <textarea
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all font-medium h-24 resize-none"
                  placeholder="e.g. Water scarcity, Road connectivity"
                  value={issues}
                  onChange={(e) => setIssues(e.target.value)}
                />
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
                onClick={addVillage}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-200 transition-all transform active:scale-95"
              >
                Save Village
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
