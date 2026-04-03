import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Users, Briefcase, LayoutDashboard } from "lucide-react";
import { clearAuth } from "../../utils/Auth";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [userMenu, setUserMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState({
    users: false,
    recruiters: false,
    jobs: false,
  });

  const navigate = useNavigate();
  const menuRef = useRef();

  // ✅ Load user safely
  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      setUser(null);
    }
  }, []);

  // ✅ Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Toggle dropdown (only one open at a time)
  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => ({
      users: false,
      recruiters: false,
      jobs: false,
      [key]: !prev[key],
    }));
  };

  // ✅ Logout
  const handleLogout = () => {
    clearAuth();
    sessionStorage.removeItem("user");
    navigate("/admin/login", { replace: true });
  };

  const getInitial = (name) =>
    name?.charAt(0).toUpperCase() || "A";

  // ✅ Active NavLink style
  const navStyle = ({ isActive }) =>
    `p-2 flex gap-2 rounded ${
      isActive ? "bg-gray-800" : "hover:bg-gray-800"
    }`;

  return (
    <div className="flex min-h-screen">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <NavLink to="/admin/dashboard" className={navStyle}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        {/* USERS */}
        <button
          onClick={() => toggleDropdown("users")}
          className="p-2 w-full flex justify-between hover:bg-gray-800 mt-2 rounded"
        >
          <span className="flex gap-2">
            <Users size={18} /> Users
          </span>
        </button>

        {openDropdown.users && (
          <NavLink to="/admin/users" className={navStyle + " ml-4"}>
            All Users
          </NavLink>
        )}

        {/* RECRUITERS */}
        <button
          onClick={() => toggleDropdown("recruiters")}
          className="p-2 w-full flex justify-between hover:bg-gray-800 mt-2 rounded"
        >
          <span className="flex gap-2">
            <Users size={18} /> Recruiters
          </span>
        </button>

        {openDropdown.recruiters && (
          <NavLink to="/admin/recruiters" className={navStyle + " ml-4"}>
            All Recruiters
          </NavLink>
        )}

        {/* JOBS */}
        <button
          onClick={() => toggleDropdown("jobs")}
          className="p-2 w-full flex justify-between hover:bg-gray-800 mt-2 rounded"
        >
          <span className="flex gap-2">
            <Briefcase size={18} /> Jobs
          </span>
        </button>

        {openDropdown.jobs && (
          <NavLink to="/admin/jobs" className={navStyle + " ml-4"}>
            All Jobs
          </NavLink>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-100">

        {/* TOP BAR */}
        <div className="flex justify-end items-center bg-white p-4 shadow relative">
          <div
            ref={menuRef}
            className="relative flex items-center gap-3 cursor-pointer"
            onClick={() => setUserMenu((prev) => !prev)}
          >
            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
              {getInitial(user?.name)}
            </div>
            <span>{user?.name || "Admin"}</span>

            {/* DROPDOWN */}
            {userMenu && (
              <div className="absolute right-0 top-12 bg-white shadow rounded w-40">
                <button className="block w-full px-4 py-2 hover:bg-gray-100">
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;