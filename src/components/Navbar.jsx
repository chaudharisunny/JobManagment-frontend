// Navbar.jsx

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const menuRef = useRef();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedUser = sessionStorage.getItem("user");
    const storedRoles = sessionStorage.getItem("roles");

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setRoles(JSON.parse(storedRoles || "[]"));
      } catch {
        setUser(null);
        setRoles([]);
      }
    } else {
      setUser(null);
      setRoles([]);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    setRoles([]);
    setMobileMenu(false);

    navigate("/", { replace: true });
  };

  const getDashboardLink = () => {
    if (roles.includes("admin")) return "/admin/dashboard";
    if (roles.includes("recruiter")) return "/recruiter/dashboard";

    return "/profile";
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900">
          JobPortal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">

          <Link
            to="/"
            className="text-gray-700 hover:text-black font-medium"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="text-gray-700 hover:text-black font-medium"
          >
            Jobs
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 hover:text-black font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-black text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="font-semibold text-blue-600"
              >
                {user?.email || user?.username || "User"}
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-xl border z-50">

                  <Link
                    to="/profile"
                    onClick={() => setOpenMenu(false)}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/applied-jobs"
                    onClick={() => setOpenMenu(false)}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Applied Jobs
                  </Link>

                  <Link
                    to={getDashboardLink()}
                    onClick={() => setOpenMenu(false)}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-4">

          <Link
            to="/"
            onClick={() => setMobileMenu(false)}
            className="block text-gray-700 font-medium"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            onClick={() => setMobileMenu(false)}
            className="block text-gray-700 font-medium"
          >
            Jobs
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="block text-gray-700 font-medium"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMobileMenu(false)}
                className="block bg-black text-white px-4 py-2 rounded-lg text-center"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="font-semibold text-blue-600 border-b pb-2">
                {user?.email || user?.username || "User"}
              </div>

              <Link
                to="/profile"
                onClick={() => setMobileMenu(false)}
                className="block text-gray-700"
              >
                My Profile
              </Link>

              <Link
                to="/applied-jobs"
                onClick={() => setMobileMenu(false)}
                className="block text-gray-700"
              >
                Applied Jobs
              </Link>

              <Link
                to={getDashboardLink()}
                onClick={() => setMobileMenu(false)}
                className="block text-gray-700"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="block text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;