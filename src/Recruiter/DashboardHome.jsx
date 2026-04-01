import {
  Briefcase,
  Users,
  CheckCircle,
  CalendarCheck
} from "lucide-react";

const DashboardHome = () => {

  const dashboardData = [
    {
      title: "Total Jobs",
      icon: <Briefcase size={26} />,
      value: 18,
      info1: "Active Jobs: 10",
      info2: "Closed Jobs: 8",
      change: "+4 this month",
      color: "bg-blue-500"
    },
    {
      title: "Applications",
      icon: <Users size={26} />,
      value: 124,
      info1: "Today: 7",
      info2: "This Week: 23",
      change: "+12% growth",
      color: "bg-green-500"
    },
    {
      title: "Shortlisted",
      icon: <CheckCircle size={26} />,
      value: 32,
      info1: "Pending: 9",
      info2: "Rejected: 56",
      change: "+5 today",
      color: "bg-purple-500"
    },
    {
      title: "Interviews",
      icon: <CalendarCheck size={26} />,
      value: 14,
      info1: "Scheduled: 10",
      info2: "Completed: 4",
      change: "Next: Tomorrow",
      color: "bg-indigo-500"
    }
  ];

  return (
    <div>

      <h2 className="text-2xl font-semibold mb-8">
        Dashboard Overview
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {dashboardData.map((item, index) => (

          <div
            key={index}
            className={`${item.color} rounded-xl p-5 text-white flex flex-col justify-between h-40`}
          >

            <div className="flex justify-between items-center">
              <p className="text-sm opacity-80">{item.title}</p>
              {item.icon}
            </div>

            <div>
              <h3 className="text-3xl font-bold">{item.value}</h3>
              <p className="text-xs opacity-90 mt-1">{item.change}</p>
            </div>

            <div className="text-xs opacity-80 flex justify-between mt-3">
              <span>{item.info1}</span>
              <span>{item.info2}</span>
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default DashboardHome;