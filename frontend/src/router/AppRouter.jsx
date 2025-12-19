import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/Dashboard";
import Villages from "../pages/Villages";
import Projects from "../pages/Projects";
import Complaints from "../pages/Complaints";
import Users from "../pages/Users";
import Login from "../pages/Login";
import { AuthProvider, useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Login />;
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          {/* PROTECTED PATHS */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="villages" element={<Villages />} />
            <Route path="projects" element={<Projects />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* PUBLIC LOGIN PAGE */}
          <Route path="/login" element={<Login />} />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
