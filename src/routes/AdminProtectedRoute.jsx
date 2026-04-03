import { Navigate, useLocation } from "react-router-dom";
import { getToken, getRoles } from "../utils/Auth";

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();

  const token = getToken();
  const roles = getRoles();

  // ✅ Debug (remove later)
  console.log("TOKEN:", token);
  console.log("ROLES:", roles);

  // ✅ Normalize safely
  const normalizedRoles = Array.isArray(roles)
    ? roles.map((r) => String(r).toLowerCase().trim())
    : [];

  // ✅ Flexible admin check
  const isAdmin = normalizedRoles.some((r) =>
    r.includes("admin")
  );

  // 🔥 Prevent false redirect while data loads
  if (token === null) {
    return null; // or loading spinner
  }

  // ❌ Not authorized
  if (!token || !isAdmin) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // ✅ Authorized
  return children;
};

export default AdminProtectedRoute;