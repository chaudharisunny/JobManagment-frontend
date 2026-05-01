import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const location = useLocation();

  const token = sessionStorage.getItem("token");

  let roles = [];
  try {
    roles = JSON.parse(sessionStorage.getItem("roles")) || [];
  } catch {
    roles = [];
  }

  console.log("TOKEN:", token);
  console.log("ROLES:", roles);

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (!roles.includes("admin")) {
    return <Navigate to="/jobs" replace />;
  }

  return children;
};

export default AdminProtectedRoute;