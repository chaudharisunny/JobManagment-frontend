import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000";

const Applicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Normalize Resume URL
  const getResumeUrl = (resume) => {
    if (!resume) return null;

    let url = null;

    if (typeof resume === "string") url = resume;
    else if (resume?.url) url = resume.url;
    else if (Array.isArray(resume)) url = resume[0];

    if (!url) return null;

    if (url.startsWith("http")) return url;

    return `${BASE_URL}/${url.replace(/^\/+/, "")}`;
  };

  // ✅ Fetch Applicants
  const fetchApplicants = async () => {
    try {
      const res = await API.get(`/recruiter/applicants/${id}`);

      let data = [];

      if (Array.isArray(res.data)) data = res.data;
      else if (Array.isArray(res.data.applicants)) data = res.data.applicants;
      else if (Array.isArray(res.data.applications)) data = res.data.applications;
      else if (Array.isArray(res.data.data)) data = res.data.data;

      setApplicants(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applicants");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  // ✅ Update Status (FIXED)
  const updateStatus = async (appId, newStatus) => {
    try {
      // 🔥 Confirm before reject
      if (newStatus === "rejected") {
        const confirmReject = window.confirm(
          "Are you sure you want to reject this applicant?"
        );
        if (!confirmReject) return;
      }

      await API.put(`/recruiter/application/${appId}/status`, {
        status: newStatus,
      });

      setApplicants((prev) => {
        if (newStatus === "rejected") {
          return prev.filter((app) => app._id !== appId);
        }

        return prev.map((app) =>
          app._id === appId ? { ...app, status: newStatus } : app
        );
      });

      toast.success(`Status changed to ${newStatus}`);
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to update status");
    }
  };

  // ✅ Download handler
  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  if (loading) return <p className="p-4">Loading applicants...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Job Applicants</h1>

      {applicants.length === 0 ? (
        <p>No applicants found.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Resume</th>
              <th className="p-3 border">Applied Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {applicants.map((app) => {
              const user = app.applicant || app.user || {};
              const resumeUrl = getResumeUrl(user.resume);

              return (
                <tr key={app._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{user.name || "N/A"}</td>
                  <td className="p-3 border">{user.email || "N/A"}</td>

                  {/* ✅ Resume */}
                  <td className="p-3 border">
                    {resumeUrl ? (
                      <>
                        <button
                          onClick={() =>
                            window.open(
                              resumeUrl,
                              "_blank",
                              "noopener,noreferrer"
                            )
                          }
                          className="text-blue-500 underline mr-2"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDownload(resumeUrl)}
                          className="text-green-600 underline"
                        >
                          Download
                        </button>
                      </>
                    ) : (
                      <span className="text-red-500 text-sm">
                        No Resume
                      </span>
                    )}
                  </td>

                  <td className="p-3 border">
                    {app.createdAt
                      ? new Date(app.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="p-3 border capitalize">
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        app.status === "hired"
                          ? "bg-green-600"
                          : app.status === "shortlisted"
                          ? "bg-blue-500"
                          : app.status === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {app.status || "applied"}
                    </span>
                  </td>

                  <td className="p-3 border space-x-2">
                    <button
                      onClick={() => updateStatus(app._id, "hired")}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Hired
                    </button>

                    <button
                      onClick={() => updateStatus(app._id, "rejected")}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>

                    <button
                      onClick={() => updateStatus(app._id, "shortlisted")}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Shortlisted
                    </button>

                    <button
                      onClick={() => updateStatus(app._id, "pending")}
                      className="bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Pending
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Applicants;