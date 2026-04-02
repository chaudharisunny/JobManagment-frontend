import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await API.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const token = response?.data?.token;
      const user = response?.data?.user;

      if (!token || !user) {
        throw new Error("Invalid response from server");
      }

      // ✅ Normalize roles
      const roles = (user.roles || []).map((r) =>
        r.toLowerCase().trim()
      );

      // ❌ Block non-admin
      if (!roles.includes("admin")) {
        setError("Access denied: Admins only");
        return;
      }

      // 🔥 ✅ USE SEPARATE ADMIN STORAGE
      sessionStorage.setItem("adminToken", token);
      sessionStorage.setItem("adminRoles", JSON.stringify(roles));
      sessionStorage.setItem("adminUser", JSON.stringify(user));

      // ✅ Direct navigation (NO timeout)
      navigate("/admin/dashboard", { replace: true });

    } catch (err) {
      console.error(err);

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
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black"
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