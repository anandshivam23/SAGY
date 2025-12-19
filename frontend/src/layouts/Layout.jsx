import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex">

      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 bg-gray-100 min-h-screen">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
}
