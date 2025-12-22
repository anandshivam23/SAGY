import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../layouts/Layout";

// Pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Villages from "../pages/Villages";
import Projects from "../pages/Projects";
import Complaints from "../pages/Complaints";
import Users from "../pages/Users";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* PUBLIC */}
      <Route
        path="/"
        element={
          <Layout>
            <Landing />
          </Layout>
        }
      />
      <Route
        path="/villages"
        element={
          <Layout>
            <Villages />
          </Layout>
        }
      />
      <Route
        path="/complaints"
        element={
          <Layout>
            <Complaints />
          </Layout>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* PROTECTED */}
      {user && user.role !== "user" && (
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      )}

      {user && (user.role === "admin" || user.role === "officer") && (
        <Route
          path="/projects"
          element={
            <Layout>
              <Projects />
            </Layout>
          }
        />
      )}

      {user && user.role === "admin" && (
        <Route
          path="/users"
          element={
            <Layout>
              <Users />
            </Layout>
          }
        />
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
