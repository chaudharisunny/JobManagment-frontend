import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/Profile";
import ApplyJob from "../pages/ApplyJob";
import AddJob from "../pages/AddJob";
import JobList from "../pages/JobList";

const privateRoutes = [
  {
    path: "/profile",
    element: (
      <ProtectedRoute allowedRoles={["user", "recruiter", "admin"]}>
        <Profile />
      </ProtectedRoute>
    ),
  },

  {
    path: "/applyjob/:id",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <ApplyJob />
      </ProtectedRoute>
    ),
  },

  {
    path: "/appliedjobs",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <JobList />
      </ProtectedRoute>
    ),
  },

  {
    path: "/addjob",
    element: (
      <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
        <AddJob />
      </ProtectedRoute>
    ),
  },
];

export default privateRoutes;