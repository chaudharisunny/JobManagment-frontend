import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../utils/auth";
// import AdminSidebar from "../components/AdminSidebar";
// import AdminTopbar from "../components/AdminTopbar";

const AdminLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = auth.user();

    if (!currentUser) {
      navigate("/login", { replace: true });
      return;
    }

    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    auth.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
     

      <main className="flex-1">
        

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;