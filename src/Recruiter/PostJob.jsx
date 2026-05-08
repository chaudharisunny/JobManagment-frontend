import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../service/api";

const PostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    jobType: "",
    location: "",
    category: "",
    skills: "",
  });

  const [requirements, setRequirements] = useState([""]);

  const [responsibilities, setResponsibilities] = useState([""]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addRequirement = () => {
    setRequirements([...requirements, ""]);
  };

  const addResponsibility = () => {
    setResponsibilities([...responsibilities, ""]);
  };

  const updateRequirement = (index, value) => {
    const data = [...requirements];

    data[index] = value;

    setRequirements(data);
  };

  const updateResponsibility = (index, value) => {
    const data = [...responsibilities];

    data[index] = value;

    setResponsibilities(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,

      skills: formData.skills
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      requirements: requirements.filter(Boolean),

      responsibilities: responsibilities.filter(Boolean),
    };

    try {
      setLoading(true);

      await API.post("/recruiter/newjob", payload);

      alert("Job posted successfully");

      navigate("/recruiter/dashboard/jobs");
    } catch (error) {
      alert("Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Post New Job</h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        >
          <option value="">Select Job Type</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="remote">Remote</option>
          <option value="internship">Internship</option>
        </select>

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (Node.js, React)"
          value={formData.skills}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="border p-3 rounded md:col-span-2"
          required
        />

        {/* Requirements */}
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-2">Requirements</h3>

          {requirements.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              placeholder="Requirement"
              onChange={(e) => updateRequirement(index, e.target.value)}
              className="border p-3 rounded w-full mb-2"
            />
          ))}

          <button
            type="button"
            onClick={addRequirement}
            className="text-blue-600 text-sm"
          >
            + Add Requirement
          </button>
        </div>

        {/* Responsibilities */}
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-2">Responsibilities</h3>

          {responsibilities.map((item, index) => (
            <input
              key={index}
              type="text"
              value={item}
              placeholder="Responsibility"
              onChange={(e) => updateResponsibility(index, e.target.value)}
              className="border p-3 rounded w-full mb-2"
            />
          ))}

          <button
            type="button"
            onClick={addResponsibility}
            className="text-blue-600 text-sm"
          >
            + Add Responsibility
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded md:col-span-2"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
