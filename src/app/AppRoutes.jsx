import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import Login from "../features/auth/pages/Login";
import Registration from "../features/auth/pages/Registration";

import AdminDashboard from "../Admin/pages/AdminDashboard";
import DashboardHome from "../Admin/pages/DashboardHome";
import AllUsers from "../Admin/pages/AllUsers";
import AllRecruiter from "../Admin/pages/AllRecruiter";
import AllJobs from "../Admin/pages/AllJobs";
import AdminLogin from "../features/auth/pages/AdminLogin";

import AdminProtectedRoute from "../routes/AdminProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* 🌐 Public */}
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobdetails/:id" element={<JobDetails />} />

      {/* 🔐 User Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      {/* 🔐 Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 🔥 IMPORTANT FIX */}
      {/* Redirect /admin → /admin/dashboard */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      {/* 🔐 Admin Panel */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      >
        {/* Default */}
        <Route index element={<DashboardHome />} />

        {/* Nested routes */}
        <Route path="" element={<DashboardHome />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="recruiters" element={<AllRecruiter />} />
        <Route path="jobs" element={<AllJobs />} />
      </Route>

      {/* ❌ Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;