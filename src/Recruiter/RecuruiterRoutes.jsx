import {  Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import RecruiterLayout from "./RecruiterLayout";
import DashboardHome from "./DashboardHome";
import PostJob from "./PostJob";
import ManageJobs from "./ManageJobs";
import Applicants from "./Applicants";
import EditJob from "./EditJob";
import RecruiterProfile from "./RecruiterProfile";

const RecruiterRoutes = () => {
  return (
    <>
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />

        <Route path="jobs" element={<ManageJobs />} />

        <Route path="post-job" element={<PostJob />} />

        <Route path="profile/:id" element={<RecruiterProfile />} />

        <Route path="applicants/:id" element={<Applicants />} />

        <Route path="edit-job/:id" element={<EditJob />} />
      </Route>

      <Route
        path="/recruiter"
        element={<Navigate to="/recruiter/dashboard" replace />}
      />
      </>
  );
};

export default RecruiterRoutes;
