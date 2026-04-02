import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  // ✅ Use separate admin storage
  const token = sessionStorage.getItem("adminToken");

  let roles = [];
  try {
    roles = JSON.parse(sessionStorage.getItem("adminRoles") || "[]");
  } catch {
    roles = [];
  }

  const isAdmin = roles
    .map((r) => r.toLowerCase().trim())
    .includes("admin");

  // ❌ Not logged in OR not admin
  if (!token || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Allow access
  return children;
};

export default AdminProtectedRoute;