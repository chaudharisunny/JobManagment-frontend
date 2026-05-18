import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import Login from "../pages/Auth/Login";
import Registration from "../pages/Auth/Registration";

/* User Pages */
import Profile from "../pages/Profile";
import AppliedList from "../pages/AppliedList";
import JobDetails from "../pages/JobDetails";
import ApplyJob from "../pages/ApplyJob";

import ProtectedRoute from "../components/ProtectedRoute";

/* Admin */
import AdminDashboard from "../Admin/pages/AdminDashboard";
import DashboardHome from "../Admin/pages/DashboardHome";
import AllUsers from "../Admin/pages/AllUsers";
import AllJobs from "../Admin/pages/AllJobs";
import AllRecruiter from "../Admin/pages/AllRecruiter";

/* Recruiter */
import RecruiterDashboard from "../Recruiter/RecruiterDashboard";
import RecruiterProfile from "../Recruiter/RecruiterProfile";
import RecruiterHome from "../Recruiter/DashboardHome";
import RecruiterJobs from "../Recruiter/ManageJobs";
import PostJob from "../Recruiter/PostJob";
import Applicants from "../Recruiter/Applicants";
import EditJob from "../Recruiter/EditJob";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      <Route
        path="/jobs"
        element={<Jobs />}
      />

      {/* Job Details */}
      <Route
        path="/jobdetails/:id"
        element={<JobDetails />}
      />

      {/* Apply Job */}
      <Route
        path="/applyjob/:id"
        element={
          <ProtectedRoute>
            <ApplyJob />
          </ProtectedRoute>
        }
      />

      {/* Auth */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Registration />}
      />

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

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<DashboardHome />}
        />

        <Route
          path="users"
          element={<AllUsers />}
        />

        <Route
          path="jobs"
          element={<AllJobs />}
        />

        <Route
          path="recruiters"
          element={<AllRecruiter />}
        />
      </Route>

      {/* ================= RECRUITER ================= */}
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      >

        {/* Dashboard Home */}
        <Route
          index
          element={<RecruiterHome />}
        />

        {/* Manage Jobs */}
        <Route
          path="jobs"
          element={<RecruiterJobs />}
        />

        {/* Post Job */}
        <Route
          path="post-job"
          element={<PostJob />}
        />

        {/* Applicants */}
        <Route
          path="applicants/:id"
          element={<Applicants />}
        />

        {/* Edit Job */}
        <Route
          path="edit-job/:id"
          element={<EditJob />}
        />

        {/* Recruiter Profile */}
        <Route
          path="profile/:id"
          element={<RecruiterProfile />}
        />

      </Route>

      {/* Redirect Shortcuts */}
      <Route
        path="/admin"
        element={
          <Navigate
            to="/admin/dashboard"
            replace
          />
        }
      />

      <Route
        path="/recruiter"
        element={
          <Navigate
            to="/recruiter/dashboard"
            replace
          />
        }
      />

      {/* Dashboard Shortcut */}
      <Route
        path="/dashboard"
        element={
          <Navigate
            to="/profile"
            replace
          />
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
};

export default AppRoutes;