import { useEffect, useState } from "react";
import {
  Users,
  Briefcase,
  FileText,
  Activity,
  UserCheck,
  Layers,
} from "lucide-react";
import API from "../services/api";

const DashboardHome = () => {
  const [stats, setStats] = useState({});
  const [lists, setLists] = useState({
    topRecruiters: [],
    activeJobsList: [],
    mostAppliedJobs: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/dashboard", {
          withCredentials: true,
        });

        console.log("FULL API RESPONSE:", res.data);

        setStats(res.data?.stats || {});

        setLists({
          topRecruiters: res.data?.lists?.topRecruiters ?? [],
          activeJobsList: res.data?.lists?.activeJobsList ?? [],
          mostAppliedJobs: res.data?.lists?.mostAppliedJobs ?? [],
        });

        setLoading(false);
      } catch (error) {
        console.error("Dashboard error:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;

  const cards = [
    { title: "Users", value: stats.totalUsers || 0, icon: <Users size={20} />, color: "bg-blue-500" },
    { title: "Recruiters", value: stats.totalRecruiters || 0, icon: <UserCheck size={20} />, color: "bg-indigo-500" },
    { title: "Jobs", value: stats.totalJobs || 0, icon: <Briefcase size={20} />, color: "bg-purple-500" },
    { title: "Active Jobs", value: stats.activeJobs || 0, icon: <Layers size={20} />, color: "bg-yellow-500" },
    { title: "Applications", value: stats.totalApplications || 0, icon: <FileText size={20} />, color: "bg-cyan-500" },
    { title: "Hired", value: stats.hiredCount || 0, icon: <Activity size={20} />, color: "bg-green-500" },
    { title: "Rejected", value: stats.rejectedCount || 0, icon: <Activity size={20} />, color: "bg-red-500" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">{c.title}</p>
              <h2 className="text-2xl font-bold">{c.value}</h2>
            </div>
            <div className={`${c.color} text-white p-3 rounded-xl`}>
              {c.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Lists */}
      <div className="grid md:grid-cols-3 gap-6 mt-10">

        {/* Top Companies */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Top Companies</h2>

          {lists.topRecruiters.length === 0 && (
            <p className="text-gray-400 text-sm">No companies found</p>
          )}

          {lists.topRecruiters.map((company, i) => (
            <div key={i} className="flex justify-between py-2 border-b">
              <span>{company.companyName || company.name}</span>
              <span className="text-gray-400 text-sm">{company.email}</span>
            </div>
          ))}
        </div>

        {/* Active Jobs */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Active Jobs</h2>

          {lists.activeJobsList.length === 0 && (
            <p className="text-gray-400 text-sm">No active jobs</p>
          )}

          {lists.activeJobsList.map((job, i) => (
            <div key={i} className="flex justify-between py-2 border-b">
              <span>{job.title}</span>
              <span className="text-gray-400 text-sm">
                {job.recruiter?.companyName || "N/A"}
              </span>
            </div>
          ))}
        </div>

        {/* Most Applied Jobs */}
        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Most Applied Jobs</h2>

          {lists.mostAppliedJobs.length === 0 && (
            <p className="text-gray-400 text-sm">No application data</p>
          )}

          {lists.mostAppliedJobs.map((job, i) => {
            const title =
              job.jobDetails?.title ||
              job.jobDetails?.[0]?.title ||
              "Unknown Job";

            return (
              <div key={i} className="flex justify-between py-2 border-b">
                <span>{title}</span>
                <span className="text-green-500 font-medium">
                  {job.totalApplications} applied
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;