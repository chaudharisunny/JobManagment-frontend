import { Navigate } from "react-router-dom";
import { getToken, getRoles } from "../utils/Auth";

const AdminProtectedRoute = ({ children }) => {
  const token = getToken();
  let roles = getRoles();

  // ✅ Ensure roles is always array
  if (!Array.isArray(roles)) {
    roles = [roles];
  }

  // ✅ Normalize roles safely
  const normalizedRoles = roles.map((r) =>
    String(r).toLowerCase().trim()
  );

  const isAdmin = normalizedRoles.includes("admin");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Not admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allow access
  return children;
};

export default AdminProtectedRoute;