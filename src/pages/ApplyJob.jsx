
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const ApplyJob = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleApply = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      if (resume) {
        formData.append("resume", resume);
      }

      await API.post(`/user/applyjob/${id}`, formData);

      alert("Application submitted successfully");
      navigate("/jobs");

    } catch (error) {
      console.error(error);
      alert("Failed to apply");
    } finally {
      setLoading(false);
    }
  };

  // View Resume
  const openResume = () => {
    if (!user?.resume?.url) return;
    window.open(user.resume.url, "_blank");
  };

  // Download Resume
  const downloadResume = () => {
    if (!user?.resume?.url) return;

    const link = document.createElement("a");
    link.href = user.resume.url;
    link.download = "resume.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold mb-6">Apply for Job</h2>

        {/* Existing Resume */}
        {user?.resume?.url ? (
          <div className="mb-6">
            <p className="font-medium mb-2">Existing Resume</p>

            <div className="flex gap-4">

              <button
                onClick={openResume}
                className="text-blue-600 underline"
              >
                View Resume
              </button>

              <button
                onClick={downloadResume}
                className="text-green-600 underline"
              >
                Download Resume
              </button>

            </div>

            <p className="text-sm text-gray-500 mt-2">
              You can use this resume or upload a new one below.
            </p>
          </div>
        ) : (
          <p className="text-red-500 mb-4">
            No resume found. Please upload a resume.
          </p>
        )}

        {/* Upload New Resume */}
        <div className="mb-6">

          <p className="font-medium mb-2">
            Upload New Resume (Optional)
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
          />

          {resume && (
            <p className="text-sm text-gray-600 mt-2">
              Selected file: {resume.name}
            </p>
          )}

        </div>

        {/* Submit Button */}
        <button
          onClick={handleApply}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90"
        >
          {loading ? "Applying..." : "Submit Application"}
        </button>

      </div>

    </div>
  );
};

export default ApplyJob;

