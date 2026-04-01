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
import AdminLogin from "../Admin/AdminLogin";

import PublicRoute from "../components/PublicRoute";
import AdminProtectedRoute from "../components/AdminProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* 🌐 Public */}
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobdetails/:id" element={<JobDetails />} />

      {/* 🔐 User Auth */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Registration />
          </PublicRoute>
        }
      />

      {/* 🔐 Admin Login (Protected from logged-in users) */}
      <Route
        path="/admin/login"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />

      {/* 🔐 Admin Panel */}
      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
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