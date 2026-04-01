import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import ApplyJob from "../pages/ApplyJob";
import Profile from "../pages/Profile";
import JobList from "../pages/JobList";

import Login from "../Auth/Login";
import Registration from "../Auth/Registration";

import PublicRoute from "../components/PublicRoute"; // ✅ ADD THIS

const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "/jobs", element: <Jobs /> },
  { path: "/jobdetails/:id", element: <JobDetails /> },
  { path: "/addjob", element: <AddJob /> },
  { path: "/applyjob/:id", element: <ApplyJob /> },
  { path: "/profile", element: <Profile /> },
  { path: "/appliedjobs", element: <JobList /> },

  // ✅ FIXED ROUTES
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Registration />
      </PublicRoute>
    ),
  },
];

export default publicRoutes;