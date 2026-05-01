import { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch Jobs
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/admin/alljobs");

      console.log("Jobs API Response:", res.data);

      setJobs(
        res.data?.data ||
        res.data?.jobs ||
        (Array.isArray(res.data) ? res.data : [])
      );
    } catch (err) {
      console.error("Error fetching jobs:", err);

      if (err.response?.status === 401) {
        sessionStorage.clear();
        navigate("/login", { replace: true });
        return;
      }

      setError(
        err.response?.data?.message || "Failed to fetch jobs"
      );
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
      await API.delete(`/admin/jobs/${id}`);

      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);

      if (err.response?.status === 401) {
        sessionStorage.clear();
        navigate("/login", { replace: true });
      } else {
        alert(err.response?.data?.message || "Delete failed");
      }
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
    <div className="p-6 bg-white shadow rounded">

      <h2 className="text-xl font-bold mb-4">
        All Jobs
      </h2>

      {error && (
        <div className="mb-3 text-red-500">
          {error}
        </div>
      )}

      <table className="w-full text-sm">

        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Salary</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job._id} className="border-t">

                <td className="p-2">{job.title}</td>
                <td className="p-2">{job.salary}</td>
                <td className="p-2">{job.location}</td>

                <td className="p-2">
                  {job.createdBy?.company || "N/A"}
                </td>

                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDelete(job._id)}
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