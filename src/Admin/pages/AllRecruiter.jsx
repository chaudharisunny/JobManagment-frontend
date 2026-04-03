import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";


// ✅ Axios Instance

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const AllRecruiter = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Recruiters
  const fetchRecruiters = async () => {
    try {
      const res = await API.get("/admin/recruiters");

      console.log("Recruiters API:", res.data);

      setRecruiters(
        res.data?.data ||
        res.data?.recruiters ||
        (Array.isArray(res.data) ? res.data : [])
      );
    } catch (err) {
      console.error("Error fetching recruiters:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  // ✅ Delete Recruiter
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this recruiter?")) return;

    try {
      await API.delete(`/recruiters/${id}`);
      setRecruiters((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Recruiters...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Recruiters</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Company</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {recruiters.length > 0 ? (
            recruiters.map((r) => (
              <tr key={r._id} className="text-center border-t">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.email}</td>
                <td className="p-2">{r.company}</td>

                <td className="p-2">
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No Recruiters Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllRecruiter;