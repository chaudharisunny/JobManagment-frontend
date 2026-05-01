import { Outlet, NavLink } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-4">
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/dashboard/users">Users</NavLink>
        <NavLink to="/admin/dashboard/jobs">Jobs</NavLink>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;