import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchJob = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/user/job/${id}`);

      const data = res.data;

      const extractedJob =
        data.job ||
        data.data?.job ||
        data.data ||
        data;

      setJob(extractedJob);

    } catch (err) {
      console.error(err);
      setError("Failed to load job details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  // Navigate to Apply Job Page
  const handleApply = () => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    navigate(`/applyjob/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading job details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold text-gray-800">
          {job.title}
        </h1>

        <p className="text-gray-500 mt-2">
          🏢 {job.createdBy?.company || "Company Name"}
        </p>

        <div className="flex gap-4 mt-4 flex-wrap">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
            {job.jobType}
          </span>

          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
            📍 {job.location}
          </span>

          <span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">
            💰 ₹ {job.salary}
          </span>
        </div>

        {/* Apply Button */}
        <div className="mt-6">
          <button
            onClick={handleApply}
            className="bg-black text-white px-6 py-3 rounded-xl hover:opacity-80 transition"
          >
            Apply Now
          </button>
        </div>

        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">
            Job Description
          </h2>

          <p className="text-gray-600 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-3">
              Required Skills
            </h2>

            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">
            Requirements
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li> ))}
          </ul>
        </div>

         <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">
            Responsiblites
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            {job.responsibilities.map((req, index) => (
              <li key={index}>{req}</li> ))}
          </ul>
        </div>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-6">
          Posted on{" "}
          {job.createdAt
            ? new Date(job.createdAt).toLocaleDateString()
            : "Recently"}
        </p>

      </div>
    </div>
  );
};

export default JobDetails;