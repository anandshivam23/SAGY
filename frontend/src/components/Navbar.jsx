import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isLanding = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-blue-700 text-white shadow-md">
      <Link to="/" className="text-2xl font-bold tracking-wide hover:text-gray-200 transaction-colors">
        SAGY Portal
      </Link>

      <div className="flex gap-6 items-center text-sm font-medium">
        {/* PUBLIC LINKS (Always visible or conditional based on preference, but usually good to have 'Home') */}
        <Link to="/" className="hover:text-blue-200 transition-colors">Home</Link>
        <Link to="/villages" className="hover:text-blue-200 transition-colors">Villages</Link>
        <Link to="/complaints" className="hover:text-blue-200 transition-colors">Complaints</Link>

        {/* LOGGED IN LINKS */}
        {user ? (
          <>
            {user.role !== "user" && (
              <Link to="/dashboard" className="hover:text-blue-200 transition-colors">Dashboard</Link>
            )}

            {(user.role === "admin" || user.role === "officer") && (
              <Link to="/projects" className="hover:text-blue-200 transition-colors">Projects</Link>
            )}

            {user.role === "admin" && (
              <Link to="/users" className="hover:text-blue-200 transition-colors">Users</Link>
            )}

            <div className="flex items-center gap-4 ml-4">
              <span className="text-gray-200 font-normal">Hi, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-full transition-all shadow-sm"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          /* GUEST LINKS */
          <>
            <Link to="/login" className="hover:text-blue-200 transition-colors">Login</Link>
            <Link
              to="/signup"
              className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-full font-bold transition-all shadow-sm"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
