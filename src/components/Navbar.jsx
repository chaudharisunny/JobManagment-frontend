import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 important
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 🔥 Use SAME storage as admin
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }

    setLoading(false); // ✅ done loading
  }, []);

  const handleLogout = () => {
    sessionStorage.clear(); // 🔥 match admin
    navigate("/");
  };

  // 🔥 Prevent UI flash
  if (loading) return null;

  return (
    <nav className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          JobPortal
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-600 hover:text-black font-medium transition"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="text-gray-600 hover:text-black font-medium transition"
          >
            Jobs
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-black font-medium transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">

              {/* Username */}
              <button
                onClick={() => setOpen(!open)}
                className="font-medium text-gray-700"
              >
                {user?.name || "Account"}
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg border">

                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/appliedjobs"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Applied Jobs
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;