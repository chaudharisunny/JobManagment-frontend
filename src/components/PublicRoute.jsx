import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
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

  // ❌ Not logged in → allow access
  if (!token) {
    return children;
  }

  // ⚠️ If roles not loaded yet → wait (prevents flash)
  if (roles.length === 0) {
    return null;
  }

  // ✅ Logged in → redirect properly
  if (normalizedRoles.includes("admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (normalizedRoles.includes("recruiter")) {
    return <Navigate to="/recruiter/dashboard" replace />;
  }

  return <Navigate to="/jobs" replace />;
};

export default PublicRoute;