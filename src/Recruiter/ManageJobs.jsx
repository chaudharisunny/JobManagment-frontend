import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const res = await API.get("/recruiter/postjobs");

      console.log("API Response:", res.data);

      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else if (res.data.jobs) {
        setJobs(res.data.jobs);
      } else if (res.data.data) {
        setJobs(res.data.data);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const viewApplicants = (jobId) => {
    if (!jobId) {
      toast.error("Invalid Job ID");
      return;
    }
    navigate(`/recruiter/applicants/${jobId}`);
  };

  const editJob = (jobId) => {
    navigate(`/recruiter/edit-job/${jobId}`);
  };

  const deleteJob = async (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/recruiter/deletejob/${jobId}`);
      toast.success("Job deleted successfully");

      // remove deleted job from state
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-500">No jobs found.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Salary</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50">
                <td className="p-2 border">{job.title}</td>
                <td className="p-2 border">{job.jobType}</td>
                <td className="p-2 border">{job.location}</td>
                <td className="p-2 border">{job.salary}</td>

                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => viewApplicants(job._id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Applicants
                  </button>

                  <button
                    onClick={() => editJob(job._id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteJob(job._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageJobs;

