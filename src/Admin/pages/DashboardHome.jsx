// ===============================================
// ADMIN DashboardHome.jsx (Dynamic + Clean)
// src/Admin/pages/DashboardHome.jsx
// ===============================================

import { useEffect, useState } from "react";
import { Users, Briefcase, UserCheck, FileText } from "lucide-react";
import API from "@/services/api";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/admin/dashboard");

        setStats({
          totalUsers: res.data?.stats?.totalUsers || 0,

          totalRecruiters: res.data?.stats?.totalRecruiters || 0,

          totalJobs: res.data?.stats?.totalJobs || 0,

          totalApplications: res.data?.stats?.totalApplications || 0,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: "Users",
      value: stats.totalUsers,
      icon: <Users size={22} />,
      color: "bg-blue-500",
    },
    {
      title: "Recruiters",
      value: stats.totalRecruiters,
      icon: <UserCheck size={22} />,
      color: "bg-green-500",
    },
    {
      title: "Jobs",
      value: stats.totalJobs,
      icon: <Briefcase size={22} />,
      color: "bg-purple-500",
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      icon: <FileText size={22} />,
      color: "bg-orange-500",
    },
  ];

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-sm">{item.title}</p>

              <h2 className="text-3xl font-bold">{item.value}</h2>
            </div>

            <div className={`${item.color} text-white p-3 rounded-lg`}>
              {item.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
