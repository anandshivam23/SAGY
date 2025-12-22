import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-center text-center py-32 bg-white">
      {/* Decorative Orbs */}
      <div className="absolute top-0 -left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-700"></div>

      <div className="relative z-10 px-6">
        <h1 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter">
          <span className="gradient-text">Sansad Adarsh</span> <br />
          <span className="text-gray-900">Gram Yojana</span>
        </h1>

        <p className="max-w-2xl mx-auto mb-12 text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">
          The next generation of rural governance. Track, monitor, and accelerate
          village development through a unified digital ecosystem.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {user ? (
            <Link
              to="/dashboard"
              className="group bg-gray-900 hover:bg-black text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-2xl hover:shadow-gray-300 flex items-center transform hover:-translate-y-1"
            >
              Access Dashboard
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-2xl font-black text-lg transition-all shadow-xl hover:shadow-blue-200 transform hover:-translate-y-1 active:scale-95"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="bg-white border-2 border-gray-100 hover:border-blue-100 hover:bg-blue-50 text-gray-700 px-12 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-gray-100 transform hover:-translate-y-1 active:scale-95"
              >
                Login
              </Link>
            </>
          )}
        </div>

        <div className="mt-20 flex gap-8 justify-center items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          <span className="font-black text-2xl tracking-widest text-gray-400">DIGITAL INDIA</span>
          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
          <span className="font-black text-2xl tracking-widest text-gray-400">GRAM SWARAJ</span>
          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
          <span className="font-black text-2xl tracking-widest text-gray-400">VISHWAS</span>
        </div>
      </div>
    </section>
  );
}
