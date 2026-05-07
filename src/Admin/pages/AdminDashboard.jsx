import { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  Users,
  Briefcase,
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

import { auth } from "@/utils/auth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [user, setUser] = useState(null);

  const [userMenu, setUserMenu] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState({
    users: false,
    recruiters: false,
    jobs: false,
  });

  // Load user
  useEffect(() => {
    try {
      const currentUser = auth?.user?.();

      setUser(
        currentUser || {
          name: "Admin",
        },
      );
    } catch (error) {
      setUser({
        name: "Admin",
      });
    }
  }, []);

  // Close profile menu
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => ({
      users: false,
      recruiters: false,
      jobs: false,
      [key]: !prev[key],
    }));
  };

  const handleLogout = () => {
    auth?.logout?.();

    navigate("/admin/login", {
      replace: true,
    });
  };

  const getInitial = (value) => value?.charAt(0)?.toUpperCase() || "A";

  const displayName = user?.name || user?.email || "Admin";

  const navStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  const subNavStyle = ({ isActive }) =>
    `block ml-6 mt-2 px-3 py-2 rounded transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:relative top-0 left-0 z-40 h-screen w-60 bg-gray-900 text-white shadow-lg transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Panel</h2>

          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
            end
            className={navStyle}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {/* Users */}
          <button
            onClick={() => toggleDropdown("users")}
            className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
          >
            <span className="flex gap-2 items-center">
              <Users size={18} />
              Users
            </span>

            {openDropdown.users ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {openDropdown.users && (
            <NavLink to="/admin/dashboard/users" className={subNavStyle}>
              All Users
            </NavLink>
          )}

          {/* Recruiters */}
          <button
            onClick={() => toggleDropdown("recruiters")}
            className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
          >
            <span className="flex gap-2 items-center">
              <Users size={18} />
              Recruiters
            </span>

            {openDropdown.recruiters ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {openDropdown.recruiters && (
            <NavLink to="/admin/dashboard/recruiters" className={subNavStyle}>
              All Recruiters
            </NavLink>
          )}

          {/* Jobs */}
          <button
            onClick={() => toggleDropdown("jobs")}
            className="w-full flex justify-between items-center px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800"
          >
            <span className="flex gap-2 items-center">
              <Briefcase size={18} />
              Jobs
            </span>

            {openDropdown.jobs ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {openDropdown.jobs && (
            <NavLink to="/admin/dashboard/jobs" className={subNavStyle}>
              All Jobs
            </NavLink>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 h-screen overflow-auto">
        {/* Topbar */}
        <div className="sticky top-0 z-30 bg-white border-b px-4 py-3 flex justify-between items-center">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>

          <div
            ref={menuRef}
            className="relative flex items-center gap-3 ml-auto cursor-pointer"
            onClick={() => setUserMenu((prev) => !prev)}
          >
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {getInitial(displayName)}
            </div>

            <span className="hidden sm:block font-semibold text-gray-700">
              {displayName}
            </span>

            {userMenu && (
              <div className="absolute right-0 top-14 bg-white rounded-xl shadow-lg w-44 border overflow-hidden">
                <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 text-left">
                  <User size={16} />
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50 text-left"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
