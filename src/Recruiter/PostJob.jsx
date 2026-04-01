import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const PostJob = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    salary: "",
    jobType: "",
    location: "",
    category: "",
    skills: ""
  });

  const [requirements, setRequirements] = useState([""]);
  const [responsibilities, setResponsibilities] = useState([""]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRequirementChange = (index, value) => {
    const updated = [...requirements];
    updated[index] = value;
    setRequirements(updated);
  };

  const handleResponsibilityChange = (index, value) => {
    const updated = [...responsibilities];
    updated[index] = value;
    setResponsibilities(updated);
  };

  const handleRequirementKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updated = [...requirements];
      updated.splice(index + 1, 0, "");
      setRequirements(updated);
    }
  };

  const handleResponsibilityKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const updated = [...responsibilities];
      updated.splice(index + 1, 0, "");
      setResponsibilities(updated);
    }
  };

  const validateForm = () => {

    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title required";
    if (!formData.description.trim()) newErrors.description = "Description required";
    if (!formData.salary.trim()) newErrors.salary = "Salary required";
    if (!formData.jobType) newErrors.jobType = "Job type required";
    if (!formData.location.trim()) newErrors.location = "Location required";
    if (!formData.category.trim()) newErrors.category = "Category required";
    if (!formData.skills.trim()) newErrors.skills = "Skills required";

    if (requirements.filter(r => r.trim()).length === 0)
      newErrors.requirements = "Add requirement";

    if (responsibilities.filter(r => r.trim()).length === 0)
      newErrors.responsibilities = "Add responsibility";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      salary: formData.salary,
      jobType: formData.jobType,
      location: formData.location,
      category: formData.category,
      skills: formData.skills.split(",").map(skill => skill.trim()),
      requirements: requirements.filter(r => r.trim()),
      responsibilities: responsibilities.filter(r => r.trim())
    };

    try {

      setLoading(true);

      await API.post("/recruiter/newjob", payload);

      alert("Job posted successfully");

      navigate("/recruiter/manage-jobs");

    } catch (error) {

      console.log(error.response?.data || error.message);
      alert("Failed to post job");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      <h2 className="text-2xl font-semibold mb-6">
        Post New Job
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="category"
          placeholder="Category (IT, Design, Marketing)"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="jobType"
          value={formData.jobType}
          onChange={handleChange}
          className="border p-2 rounded"
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
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (Node.js, Express, MongoDB)"
          value={formData.skills}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <div className="md:col-span-2">
          <textarea
            name="description"
            placeholder="Job Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Requirements */}
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-2">Requirements</h3>

          {requirements.map((req, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <span>•</span>

              <input
                type="text"
                value={req}
                placeholder="Enter requirement"
                onChange={(e) =>
                  handleRequirementChange(index, e.target.value)
                }
                onKeyDown={(e) =>
                  handleRequirementKeyDown(e, index)
                }
                className="flex-1 border p-2 rounded"
              />
            </div>
          ))}
        </div>

        {/* Responsibilities */}
        <div className="md:col-span-2">
          <h3 className="font-semibold mb-2">Responsibilities</h3>

          {responsibilities.map((res, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <span>•</span>

              <input
                type="text"
                value={res}
                placeholder="Enter responsibility"
                onChange={(e) =>
                  handleResponsibilityChange(index, e.target.value)
                }
                onKeyDown={(e) =>
                  handleResponsibilityKeyDown(e, index)
                }
                className="flex-1 border p-2 rounded"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded md:col-span-2"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

      </form>

    </div>
  );
};

export default PostJob;