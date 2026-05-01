import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import { auth } from "../utils/auth";

const RecruiterLayout = () => {
  const [user, setUser] =
    useState(null);

  const navigate =
    useNavigate();

  useEffect(() => {
    const currentUser =
      auth.user();

    if (!currentUser) {
      navigate("/login", {
        replace: true,
      });

      return;
    }

    setUser(currentUser);
  }, [navigate]);

  const handleLogout =
    () => {
      auth.logout();

      navigate("/login", {
        replace: true,
      });
    };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <main className="flex-1">

        <div >
          <Outlet />
        </div>

      </main>

    </div>
  );
};

export default RecruiterLayout;