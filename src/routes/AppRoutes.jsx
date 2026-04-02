import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import Login from "../Auth/Login";
import Registration from "../Auth/Registration";

import AdminDashboard from "../Admin/AdminDashboard";
import DashboardHome from "../Admin/DashboardHome";
import AllUsers from "../Admin/AllUsers";
import AllRecruiter from "../Admin/AllRecruiter";
import AllJobs from "../Admin/AllJobs";
import AdminLogin from "../Auth/AdminLogin";

import AdminProtectedRoute from "../components/AdminProtectedRoute";

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

      {/* 🔐 Admin Panel */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      >
        {/* ✅ FIXED */}
        <Route index element={<DashboardHome />} />

        <Route path="dashboard" element={<DashboardHome />} />
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