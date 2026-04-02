import { Navigate } from "react-router-dom";
import { getToken, getRoles } from "../utils/Auth";

const AdminProtectedRoute = ({ children }) => {
  const token = getToken();
  const roles = getRoles();

  const isAdmin = roles.some((r) =>
    String(r).toLowerCase().includes("admin")
  );

  // ❌ No token → go to ADMIN login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // ❌ Not admin → ALSO go to ADMIN login (not /login)
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;