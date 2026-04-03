import AdminDashboard from "./AdminDashboard";
import DashboardHome from "./DashboardHome";
import AllUsers from "./AllUsers";
import AllRecruiter from "./AllRecruiter";
import AllJobs from "./AllJobs";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLogin from "./AdminLogin";

const adminRoutes = [
  // ✅ PUBLIC LOGIN
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  // 🔐 PROTECTED ROUTES
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <DashboardHome /> },
      { path: "users", element: <AllUsers /> },
      { path: "recruiters", element: <AllRecruiter /> },
      { path: "jobs", element: <AllJobs /> },
    ],
  },
];

export default adminRoutes;