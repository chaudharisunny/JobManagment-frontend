import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";
import { toast } from "react-toastify";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // FETCH JOBS
  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await API.get("/recruiter/postjobs");

      console.log("FETCH JOBS RESPONSE:", res.data);

      // HANDLE DIFFERENT RESPONSE STRUCTURES
      if (Array.isArray(res.data)) {
        setJobs(res.data);
      } else if (Array.isArray(res.data.jobs)) {
        setJobs(res.data.jobs);
      } else if (Array.isArray(res.data.data)) {
        setJobs(res.data.data);
      } else {
        setJobs([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  // VIEW APPLICANTS
  const viewApplicants = (jobId) => {
    console.log("VIEW APPLICANTS:", jobId);

    if (!jobId) {
      toast.error("Invalid Job ID");
      return;
    }

    navigate(`/recruiter/dashboard/applicants/${jobId}`);
  };

  // EDIT JOB
  const editJob = (jobId) => {
    console.log("EDIT JOB:", jobId);

    if (!jobId) {
      toast.error("Invalid Job ID");
      return;
    }

    navigate(`/recruiter/dashboard/edit-job/${jobId}`);
  };

  // DELETE JOB
  const deleteJob = async (jobId) => {
    console.log("DELETE JOB:", jobId);

    if (!jobId) {
      toast.error("Invalid Job ID");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const res = await API.delete(`/recruiter/deletejob/${jobId}`);

      console.log("DELETE RESPONSE:", res.data);

      toast.success("Job deleted successfully");

      // REMOVE FROM UI
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to delete job"
      );
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="p-4">

      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold">
          Manage Jobs
        </h1>

        <button
          type="button"
          onClick={() => navigate("/recruiter/create-job")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <p className="text-gray-500">
          No jobs found.
        </p>
      ) : (
        <div className="overflow-x-auto">

          <table className="w-full border border-gray-300">

            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">
                  Title
                </th>

                <th className="border p-3 text-left">
                  Type
                </th>

                <th className="border p-3 text-left">
                  Location
                </th>

                <th className="border p-3 text-left">
                  Salary
                </th>

                <th className="border p-3 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr
                  key={job._id}
                  className="hover:bg-gray-50"
                >
                  <td className="border p-3">
                    {job.title}
                  </td>

                  <td className="border p-3">
                    {job.jobType}
                  </td>

                  <td className="border p-3">
                    {job.location}
                  </td>

                  <td className="border p-3">
                    ₹ {job.salary}
                  </td>

                  <td className="border p-3">

                    <div className="flex gap-2 justify-center flex-wrap">

                      <button
                        type="button"
                        onClick={() =>
                          viewApplicants(job._id)
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Applicants
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          editJob(job._id)
                        }
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteJob(job._id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}
    </div>
  );
};

export default ManageJobs;