import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}) => {
  const location = useLocation();

  const token = sessionStorage.getItem("token");

  let roles = [];

  try {
    const storedRoles =
      sessionStorage.getItem("roles");

    roles = storedRoles
      ? JSON.parse(storedRoles)
      : [];
  } catch {
    roles = [];
  }

  // ensure array
  if (!Array.isArray(roles)) {
    roles = [];
  }

  // not logged in
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // role access check
  if (allowedRoles.length > 0) {
    const hasAccess = roles.some((role) => {
      if (typeof role !== "string") return false;

      return allowedRoles.includes(
        role.toLowerCase()
      );
    });

    if (!hasAccess) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;