import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");

  let roles = [];
  try {
    roles = JSON.parse(sessionStorage.getItem("roles") || "[]");
  } catch {
    roles = [];
  }

  const normalizedRoles = roles.map((r) =>
    r.toLowerCase().trim()
  );

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ❌ Not admin
  if (!normalizedRoles.includes("admin")) {
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Allow access (NO null blocking)
  return children;
};

export default AdminProtectedRoute;