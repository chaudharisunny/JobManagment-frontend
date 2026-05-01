// ==============================
// Login.jsx
// Final Fix: role redirect FIRST
// ==============================

import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../../services/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await API.post("/auth/login", formData);

      const token = res?.data?.token;
      const user = res?.data?.user;

      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      // Normalize roles
      const roles = Array.isArray(user.roles)
        ? user.roles.map((role) =>
            typeof role === "string"
              ? role.toLowerCase().trim()
              : String(role?.name || "")
                  .toLowerCase()
                  .trim()
          )
        : typeof user.roles === "string"
        ? [user.roles.toLowerCase().trim()]
        : [];

      // Save auth data
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("roles", JSON.stringify(roles));
      sessionStorage.setItem("user", JSON.stringify(user));

      console.log("roles:", roles);
      console.log("LOGIN TOKEN:", sessionStorage.getItem("token"));
      console.log("LOGIN ROLES:", sessionStorage.getItem("roles"));
      
      // ✅ IMPORTANT: Role redirect first
      if (roles.includes("admin")) {
        console.log("redirect to admin");
        navigate("/admin/dashboard", { replace: true });
        return;
      }

      if (roles.includes("recruiter")) {
        console.log("redirect to recruiter");
        navigate("/recruiter/dashboard", { replace: true });
        return;
      }

      // Normal user redirect
      const from =
        location.state?.from?.pathname || "/jobs";

      navigate(from, { replace: true });

    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login to Your Account
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-black font-medium"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;