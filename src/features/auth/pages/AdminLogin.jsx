import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { setAuth } from "../../../utils/Auth";
import API from "../../../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const { data } = await API.post("/auth/login", formData);

      // ✅ Handle both possible backend formats
      const token = data?.token || data?.data?.token;
      const user = data?.user || data?.data?.user;

      if (!token || !user) {
        throw new Error("Invalid server response");
      }

      // ✅ Normalize roles (SAFE)
      const roles = (user.roles || []).map((r) =>
        String(r).toLowerCase().trim()
      );

      // ✅ Flexible admin check (FIXED BUG)
      const isAdmin = roles.some((r) => r.includes("admin"));

      if (!isAdmin) {
        throw new Error("Access denied: Admins only");
      }

      // ✅ Save auth
      setAuth(token, roles);

      // ✅ Save minimal user
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          email: user.email,
        })
      );

      // ✅ Redirect
      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-black outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            {loading ? "Logging in..." : "Login as Admin"}
          </button>

        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Not an admin?{" "}
          <Link to="/login" className="text-black font-medium">
            User Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default AdminLogin;