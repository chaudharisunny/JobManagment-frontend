import { useEffect, useState } from "react";
import API from "../../services/api";


// ✅ Axios Instance


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Jobs
  const fetchJobs = async () => {
    try {
      const res = await API.get("/admin/alljobs");

      console.log("Jobs API:", res.data);

      setJobs(
        res.data?.data ||
        res.data?.jobs ||
        (Array.isArray(res.data) ? res.data : [])
      );
    } catch (err) {
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ✅ Delete Job
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await API.delete(`/jobs/${id}`);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Jobs...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Jobs</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Salary</th>
            <th className="p-2">Location</th>
            <th className="p-2">Company</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.length > 0 ? (
            jobs.map((j) => (
              <tr key={j._id} className="text-center border-t">
                <td className="p-2">{j.title}</td>
                <td className="p-2">{j.salary}</td>
                <td className="p-2">{j.location}</td>

                {/* ✅ IMPORTANT: depends on populate */}
                <td className="p-2">
                  {j.createdBy?.company || "N/A"}
                </td>

                <td className="p-2">
                  <button
                    onClick={() => handleDelete(j._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No Jobs Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllJobs;