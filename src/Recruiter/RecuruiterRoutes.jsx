import RecruiterDashboard from "./RecruiterDashboard";
import DashboardHome from "../Recruiter/DashboardHome";
import PostJob from "./PostJob";
import ManageJobs from "./ManageJobs";
import Applicants from "./Applicants";
import EditJob from "./EditJob";
import RecruiterProfile from "./RecruiterProfile";

const recruiterRoutes = [
  {
    path: "/recruiter",
    element: <RecruiterDashboard />,
    children: [
      { path: "dashboard", element: <DashboardHome /> },
      { path: "profile/:id", element: <RecruiterProfile/> },
      { path: "post-job", element: <PostJob/> },
      { path: "manage-jobs", element: <ManageJobs /> },
      { path: "applicants/:id", element: <Applicants /> },
      { path: "edit-job/:id", element: <EditJob /> },
    ],
  },
];

export default recruiterRoutes;