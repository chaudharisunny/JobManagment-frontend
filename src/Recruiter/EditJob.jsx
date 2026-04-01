import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "",
    skills: "",
    responsibilities: "",
    requirements: "",
  });

  // ✅ Fetch single job
  const fetchJob = async () => {
    try {
      const res = await API.get(`/recruiter/job/${id}`);
      const job = res.data.job || res.data;

      console.log("Fetched Job:", job);

      setJobData({
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        salary: job.salary || "",
        jobType: job.jobType || "",
        skills: Array.isArray(job.skills)
          ? job.skills.join(", ")
          : job.skills || "",
        responsibilities: job.responsibilities || "",
        requirements: job.requirements || "",
      });
    } catch (error) {
      console.error("Fetch Error:", error.response?.data || error.message);
      toast.error("Failed to load job");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [id]);

  // ✅ Handle input change
  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Update job
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Update Clicked");

    try {
      setSubmitting(true);

      const payload = {
        ...jobData,
        skills: jobData.skills
          ? jobData.skills.split(",").map((s) => s.trim())
          : [],
      };

      console.log("Payload:", payload);

      const res = await API.put(`/recruiter/updatejob/${id}`, payload);

      console.log("Response:", res.data);

      toast.success("Job updated successfully");

      // ✅ redirect after success
      setTimeout(() => {
        navigate("/recruiter/manage-jobs");
      }, 800);

    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      toast.error("Failed to update job");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading job data...</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={jobData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="responsibilities"
          placeholder="Responsibilities"
          value={jobData.responsibilities}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="requirements"
          placeholder="Requirements"
          value={jobData.requirements}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={jobData.location}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={jobData.salary}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* ✅ Skills */}
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={jobData.skills}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* ✅ Job Type */}
        <select
          name="jobType"
          value={jobData.jobType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Job Type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="remote">Remote</option>
          <option value="internship">Internship</option>
        </select>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {submitting ? "Updating..." : "Update Job"}
        </button>

      </form>
    </div>
  );
};

export default EditJob;