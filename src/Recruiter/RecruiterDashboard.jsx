import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import API from "../service/api";

import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  Menu,
  LogOut,
  User,
} from "lucide-react";

const RecruiterDashboard = () => {

  const [open, setOpen] = useState(true);

  const [dropdownOpen, setDropdownOpen] =
    useState(false);

  // COUNTS
  const [totalJobs, setTotalJobs] =
    useState(0);

  const [totalApplicants, setTotalApplicants] =
    useState(0);

  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  const token =
    sessionStorage.getItem("token");

  const storedUser =
    sessionStorage.getItem("user");

  let recruiterName = "Recruiter";

  let recruiterId = null;

  // USER DATA
  if (storedUser) {
    try {

      const user =
        JSON.parse(storedUser);

      recruiterName =
        user?.name ||
        user?.companyName ||
        "Recruiter";

      recruiterId =
        user?.id ||
        user?._id ||
        null;

    } catch {}
  }

  // TOKEN FALLBACK
  if (
    token &&
    recruiterName === "Recruiter"
  ) {
    try {

      const decoded =
        jwtDecode(token);

      recruiterName =
        decoded?.name ||
        "Recruiter";

      recruiterId =
        decoded?.id ||
        decoded?._id ||
        null;

    } catch {}
  }

  const initial =
    recruiterName
      .charAt(0)
      .toUpperCase();

  // PROTECT ROUTE
  useEffect(() => {

    if (!token) {
      navigate("/login", {
        replace: true,
      });
    }

  }, [token, navigate]);

  // FETCH COUNTS
  useEffect(() => {

    const fetchCounts = async () => {

      try {

        const res =
          await API.get(
            "/recruiter/postjobs"
          );

        const jobs =
          res.data.data ||
          res.data.jobs ||
          res.data ||
          [];

        // TOTAL JOBS
        setTotalJobs(jobs.length);

        // TOTAL APPLICANTS
        let applicants = 0;

        jobs.forEach((job) => {
          applicants +=
            job.applicants?.length || 0;
        });

        setTotalApplicants(applicants);

      } catch (error) {
        console.log(error);
      }
    };

    fetchCounts();

  }, []);

  // CLOSE DROPDOWN
  useEffect(() => {

    const closeMenu = (e) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          e.target
        )
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      closeMenu
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        closeMenu
      );

  }, []);

  // LOGOUT
  const handleLogout = () => {

    sessionStorage.clear();

    navigate("/login", {
      replace: true,
    });
  };

  // PROFILE
  const handleProfile = () => {

  navigate(
    recruiterId
      ? `/recruiter/dashboard/profile/${recruiterId}`
      : "/recruiter/dashboard/profile"
  );

  setDropdownOpen(false);
};
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 transition";

  const activeStyle =
    "bg-white/10 text-white";

  return (
    <div className="flex h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          open
            ? "w-64"
            : "w-20"
        }`}
      >

        <div className="p-5 font-bold border-b border-gray-700">
          {open
            ? "Recruiter"
            : "R"}
        </div>

        <nav className="p-3 space-y-2">

          {/* DASHBOARD */}
          <NavLink
            to="/recruiter/dashboard"
            end
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive
                  ? activeStyle
                  : ""
              }`
            }
          >
            <LayoutDashboard size={20} />

            {open &&
              "Dashboard"}
          </NavLink>

          {/* POST JOB */}
          <NavLink
            to="/recruiter/dashboard/post-job"
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive
                  ? activeStyle
                  : ""
              }`
            }
          >
            <PlusCircle size={20} />

            {open &&
              "Post Job"}
          </NavLink>

          {/* JOBS */}
          <NavLink
            to="/recruiter/dashboard/jobs"
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive
                  ? activeStyle
                  : ""
              }`
            }
          >
            <Briefcase size={20} />

            {open && (
              <div className="flex items-center justify-between w-full">
                <span>
                  Jobs
                </span>

                <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalJobs}
                </span>
              </div>
            )}
          </NavLink>

          {/* APPLICANTS */}
          <NavLink
            to="/recruiter/dashboard/jobs"
            className={({ isActive }) =>
              `${linkStyle} ${
                isActive
                  ? activeStyle
                  : ""
              }`
            }
          >
            <User size={20} />

            {open && (
              <div className="flex items-center justify-between w-full">
                <span>
                  Applicants
                </span>

                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {totalApplicants}
                </span>
              </div>
            )}
          </NavLink>

        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="bg-white px-6 py-4 border-b flex justify-between items-center">

          <button
            onClick={() =>
              setOpen(!open)
            }
          >
            <Menu size={22} />
          </button>

          <h1 className="font-semibold">
            Recruiter Dashboard
          </h1>

          {/* PROFILE */}
          <div
            className="relative"
            ref={dropdownRef}
          >

            <div
              onClick={() =>
                setDropdownOpen(
                  !dropdownOpen
                )
              }
              className="flex items-center gap-3 cursor-pointer"
            >

              <span className="text-sm">
                {recruiterName}
              </span>

              <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
                {initial}
              </div>

            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow z-50">

                <button
                  onClick={handleProfile}
                  className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                >
                  <User size={16} />
                  Profile
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-3 text-red-500 hover:bg-red-50"
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>
            )}

          </div>
        </header>

        {/* PAGE */}
        <main className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default RecruiterDashboard;