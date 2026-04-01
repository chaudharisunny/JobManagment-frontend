import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [isRedirecting, setIsRedirecting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectByRole = (roles) => {
    const rolePriority = ["admin", "recruiter", "user"];
    const normalizedRoles = roles.map((r) => r.toLowerCase().trim());

    const primaryRole = rolePriority.find((r) =>
      normalizedRoles.includes(r)
    );

    switch (primaryRole) {
      case "admin":
        navigate("/admin/dashboard", { replace: true });
        break;
      case "recruiter":
        navigate("/recruiter/dashboard", { replace: true });
        break;
      default:
        navigate("/jobs", { replace: true });
    }
  };

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

      const roles = (user.roles || []).map((r) =>
        r.toLowerCase().trim()
      );

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("roles", JSON.stringify(roles));
      sessionStorage.setItem("user", JSON.stringify(user));

      setIsRedirecting(true);

      redirectByRole(roles);
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

  // ❌ REMOVE TOKEN REDIRECT LOGIC (THIS WAS THE BUG)

  if (isRedirecting) return null;

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

        <form onSubmit={handleSubmit} className="space-y-5">
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
            className="w-full bg-black text-white py-3 rounded-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-black font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;