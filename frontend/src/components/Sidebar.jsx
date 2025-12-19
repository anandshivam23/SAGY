import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/villages", label: "Villages" },
    { to: "/projects", label: "Projects" },
    { to: "/complaints", label: "Complaints" },
    { to: "/users", label: "Users" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-4 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">SAGY</h1>

      <ul className="space-y-4 text-lg">
        {links.map((item, index) => (
          <li
            key={index}
            className={`${
              location.pathname === item.to ? "text-yellow-400" : ""
            }`}
          >
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
