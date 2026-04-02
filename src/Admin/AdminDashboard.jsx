import { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  LayoutDashboard,
} from "lucide-react";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [userMenu, setUserMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState({
    users: false,
    recruiters: false,
    jobs: false,
  });

  const navigate = useNavigate();

  // ✅ Load admin user only (FIXED)
  useEffect(() => {
    const storedUser = sessionStorage.getItem("adminUser");

    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      setUser(null);
    }
  }, []);

  // ✅ Loader
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  // ✅ Toggle dropdown
  const toggleDropdown = (key) => {
    setOpenDropdown((prev) => ({
      users: false,
      recruiters: false,
      jobs: false,
      [key]: !prev[key],
    }));
  };

  // ✅ Logout (ONLY admin data clear)
  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    sessionStorage.removeItem("adminRoles");

    navigate("/admin/login", { replace: true });
  };

  const getInitial = (name) =>
    name?.charAt(0).toUpperCase() || "A";

  return (
    <div className="flex min-h-screen">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <NavLink
          to="/admin/dashboard"
          className="p-2 w-full flex gap-2 hover:bg-gray-800 rounded"
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        {/* USERS */}
        <button
          onClick={() => toggleDropdown("users")}
          className="p-2 w-full flex justify-between hover:bg-gray-800 mt-2"
        >
          <span className="flex gap-2">
            <Users size={18} /> Users
          </span>
        </button>

        {openDropdown.users && (
          <NavLink
            to="/admin/users"
            className="ml-6 p-2 block hover:bg-gray-800 rounded"
          >
            All Users
          </NavLink>
        )}

        {/* RECRUITERS */}
        <button
          onClick={() => toggleDropdown("recruiters")}
          className="p-2 w-full flex justify-between hover:bg-gray-800 mt-2"
        >
          <span className="flex gap-2">
            <Users size={18} /> Recruiters
          </span>
        </button>

        {openDropdown.recruiters && (
          <NavLink
            to="/admin/recruiters"
            className="ml-6 p-2 block hover:bg-gray-800 rounded"
          >
            All Recruiters
          </NavLink>
        )}

        {/* JOBS */}
        <button
          onClick={() => toggleDropdown("jobs")}
          className="p-2 w-full flex justify-between hover:bg-gray-800 mt-2"
        >
          <span className="flex gap-2">
            <Briefcase size={18} /> Jobs
          </span>
        </button>

        {openDropdown.jobs && (
          <NavLink
            to="/admin/jobs"
            className="ml-6 p-2 block hover:bg-gray-800 rounded"
          >
            All Jobs
          </NavLink>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 bg-gray-100">

        {/* TOP BAR */}
        <div className="flex justify-end items-center bg-white p-4 shadow relative">
          <div
            onClick={() => setUserMenu(!userMenu)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full">
              {getInitial(user?.name)}
            </div>
            <span>{user?.name || "Admin"}</span>
          </div>

          {userMenu && (
            <div className="absolute right-4 top-14 bg-white shadow rounded w-40">
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

        {/* PAGE CONTENT */}
        <div className="p-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;