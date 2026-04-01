import { useEffect, useState } from "react";
import API from "../services/api";

const JobList = () => {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {

      setLoading(true);

      const res = await API.get("/user/joblist");

      const data = res.data;

      let extractedJobs =
        data.jobs ||
        data.data ||
        (Array.isArray(data) ? data : []);

      if (!Array.isArray(extractedJobs)) {
        extractedJobs = [];
      }

      setJobs(extractedJobs);

    } catch (error) {
      console.error("Error fetching job list:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-2xl font-semibold mb-6">
          My Job Applications
        </h1>

        {loading ? (
          <p>Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">
            No jobs found
          </p>
        ) : (

          <div className="space-y-4">

            {jobs.map((job) => (

              <div
                key={job._id}
                className="bg-white p-5 rounded-lg shadow hover:shadow-md transition"
              >

                <h2 className="text-lg font-semibold">
                  {job.title}
                </h2>

                <p className="text-gray-500 text-sm">
                  {job.createdBy?.company}
                </p>

                <div className="flex gap-4 text-sm mt-2 text-gray-600">
                  <span>📍 {job.location}</span>
                  <span>💰 ₹{job.salary}</span>
                  <span>💼 {job.jobType}</span>
                </div>

                <p className="text-gray-600 mt-3 line-clamp-2">
                  {job.description}
                </p>

                <div className="mt-4">
                  <span className="text-green-600 text-sm font-medium">
                    Applied
                  </span>
                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default JobList;