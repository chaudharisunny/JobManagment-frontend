// ✅ Get token from sessionStorage
export const getToken = () => {
  return sessionStorage.getItem("token");
};

// ✅ Get roles safely (always returns array)
export const getRoles = () => {
  try {
    const roles = sessionStorage.getItem("roles");
    return roles ? JSON.parse(roles) : [];
  } catch (error) {
    console.error("Error parsing roles:", error);
    return [];
  }
};

// ✅ Save token + roles (IMPORTANT)
export const setAuth = (token, roles) => {
  // ensure roles is always array
  const safeRoles = Array.isArray(roles) ? roles : [roles];

  sessionStorage.setItem("token", token);
  sessionStorage.setItem("roles", JSON.stringify(safeRoles));
};

// ✅ Clear auth (logout)
export const clearAuth = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("roles");
};