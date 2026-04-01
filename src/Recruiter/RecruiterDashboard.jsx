import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  Menu
} from "lucide-react";

const RecruiterDashboard = () => {
  const [open, setOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef();

  // ✅ Get token from sessionStorage
  const token = sessionStorage.getItem("token");

  let recruiterName = "Recruiter";
  let recruiterId = null;

  // ✅ Decode token safely
  if (token) {
    try {
      const decoded = jwtDecode(token);

      recruiterName = decoded?.name || "Recruiter";
      recruiterId = decoded?.id || decoded?._id || null;

    } catch (err) {
      console.log("Invalid token");
    }
  }

  const initial = recruiterName.charAt(0).toUpperCase();

  // ✅ Role protection (VERY IMPORTANT)
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (!decoded?.roles?.includes("recruiter")) {
        navigate("/login");
      }

    } catch (err) {
      navigate("/login");
    }
  }, [navigate, token]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    sessionStorage.clear(); // 🔥 FIXED
    navigate("/login");
  };

  // ✅ Profile Navigation
  const handleProfile = () => {
    if (recruiterId) {
      navigate(`/recruiter/profile/${recruiterId}`);
    } else {
      navigate("/recruiter/profile");
    }
    setDropdownOpen(false);
  };

  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 transition";

  const activeStyle = "bg-white/10 text-white";

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 ${
          open ? "w-64" : "w-20"
        }`}
      >
        <div className="p-5 text-xl font-bold border-b border-gray-700">
          {open ? "JobPortal" : "JP"}
        </div>

        <nav className="flex flex-col gap-2 p-3">

          <NavLink
            to="/recruiter/dashboard"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            <LayoutDashboard size={20} />
            {open && "Dashboard"}
          </NavLink>

          <NavLink
            to="/recruiter/post-job"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            <PlusCircle size={20} />
            {open && "Post Job"}
          </NavLink>

          <NavLink
            to="/recruiter/manage-jobs"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ""}`
            }
          >
            <Briefcase size={20} />
            {open && "Manage Jobs"}
          </NavLink>

        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1">

        {/* Navbar */}
        <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">

          <button onClick={() => setOpen(!open)}>
            <Menu size={22} />
          </button>

          <h1 className="text-lg font-semibold">
            Recruiter Dashboard
          </h1>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>

            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 cursor-pointer"
            >
              <span className="text-sm text-gray-600">
                {recruiterName}
              </span>

              <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
                {initial}
              </div>
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">

                <button
                  onClick={handleProfile}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>

              </div>
            )}

          </div>

        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default RecruiterDashboard;