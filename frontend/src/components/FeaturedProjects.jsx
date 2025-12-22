import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Link } from "react-router-dom";

export default function FeaturedProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get("/projects/all")
            .then((res) => {
                setProjects(res.data.slice(0, 3));
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Ongoing Initiatives</h2>
                    <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
                    <p className="text-gray-600 mt-6 text-xl max-w-2xl mx-auto">Real-time monitoring of critical development works across villages to ensure transparency and timely completion.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {projects.length > 0 ? (
                        projects.map((p) => (
                            <div key={p._id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
                                </div>

                                <div className="flex justify-between items-start mb-6">
                                    <span className="bg-blue-50 text-blue-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-blue-100">
                                        {p.category || "General"}
                                    </span>
                                    <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest ${p.status === 'Completed' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                        }`}>
                                        {p.status}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-black text-gray-800 mb-3 group-hover:text-blue-700 transition-colors leading-tight">{p.name}</h3>
                                <p className="text-gray-500 font-semibold mb-8 flex items-center">
                                    <span className="text-blue-600 mr-2 text-xl font-bold">₹</span>
                                    {p.budget?.toLocaleString('en-IN') || "0"}
                                </p>

                                <div className="mt-auto pt-6 border-t border-gray-50">
                                    <div className="flex justify-between text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">
                                        <span>Completion Progress</span>
                                        <span className="text-blue-600">{p.status === 'Completed' ? '100' : '65'}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden shadow-inner p-0.5">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${p.status === 'Completed' ? 'bg-green-500' : 'bg-gradient-to-r from-blue-600 to-indigo-500'}`}
                                            style={{ width: p.status === 'Completed' ? '100%' : '65%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm animate-pulse">
                                <div className="h-5 bg-gray-200 rounded-full w-1/4 mb-8"></div>
                                <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
                            </div>
                        ))
                    )}
                </div>

                <div className="text-center mt-20">
                    <Link to="/projects" className="inline-flex items-center bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1 active:scale-95 group">
                        Explore Full Dashboard
                        <svg className="w-6 h-6 ml-3 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
