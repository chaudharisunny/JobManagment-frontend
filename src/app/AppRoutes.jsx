import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";

/* User Pages */
import Profile from "../pages/Profile";
import AppliedList from "../pages/AppliedList";
import JobDetails from "../pages/JobDetails"; // ✅ Added

import ProtectedRoute from "../components/ProtectedRoute";

/* Admin */
import AdminDashboard from "../Admin/pages/AdminDashboard";
import DashboardHome from "../Admin/pages/DashboardHome";
import AllUsers from "../Admin/pages/AllUsers";
import AllJobs from "../Admin/pages/AllJobs";
import AllRecruiter from "../Admin/pages/AllRecruiter";

/* Recruiter */
import RecruiterDashboard from "../Recruiter/RecruiterDashboard";
import RecruiterHome from "../Recruiter/DashboardHome";
import RecruiterJobs from "../Recruiter/ManageJobs";
import PostJob from "../Recruiter/PostJob";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />

      {/* ✅ Job Details Route Added */}
      <Route
        path="/jobdetails/:id"
        element={<JobDetails />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      {/* User Protected */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applied-jobs"
        element={
          <ProtectedRoute>
            <AppliedList />
          </ProtectedRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<AllUsers />} />
        <Route path="jobs" element={<AllJobs />} />
        <Route path="recruiters" element={<AllRecruiter />} />
      </Route>

      {/* Recruiter */}
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<RecruiterHome />} />
        <Route path="jobs" element={<RecruiterJobs />} />
        <Route path="post-job" element={<PostJob />} />
      </Route>

      {/* Redirect Shortcuts */}
      <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />

      <Route
        path="/recruiter"
        element={<Navigate to="/recruiter/dashboard" replace />}
      />

      {/* Dashboard Shortcut */}
      <Route
        path="/dashboard"
        element={<Navigate to="/profile" replace />}
      />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;