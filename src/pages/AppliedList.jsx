// AppliedList.jsx

import { useEffect, useState } from "react";
import API from "../utils/API";

const AppliedList = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppliedJobs = async () => {
    try {
      const res = await API.get("/apply/my-jobs");
      setAppliedJobs(res.data.jobs || []);
    } catch (error) {
      console.log("Failed to fetch applied jobs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Applied Jobs</h1>

      {appliedJobs.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-xl text-center">
          No jobs applied yet.
        </div>
      ) : (
        <div className="grid gap-6">
          {appliedJobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-bold">{job.title}</h2>

              <p className="text-gray-600 mt-1">
                {job.company}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                {job.location}
              </p>

              <p className="text-green-600 font-medium mt-3">
                Applied Successfully
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedList;