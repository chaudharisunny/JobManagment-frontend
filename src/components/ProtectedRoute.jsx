import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
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

  // 🟡 Prevent early wrong redirect
  if (token === null) {
    return null;
  }

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 🔥 IMPORTANT: If admin → DO NOT redirect to user login
  if (normalizedRoles.includes("admin")) {
    return children;
  }

  // ❌ Role not allowed
  if (
    allowedRoles.length > 0 &&
    !normalizedRoles.some((role) => allowedRoles.includes(role))
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;