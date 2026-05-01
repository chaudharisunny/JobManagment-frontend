import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "./AdminDashboard";
import DashboardHome from "./DashboardHome";
import AllUsers from "./AllUsers";
import AllRecruiter from "./AllRecruiter";
import AllJobs from "./AllJobs";

const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <DashboardHome />,
      },

      {
        path: "users",
        element: <AllUsers />,
      },

      {
        path: "recruiters",
        element: <AllRecruiter />,
      },

      {
        path: "jobs",
        element: <AllJobs />,
      },
    ],
  },
];

export default adminRoutes;