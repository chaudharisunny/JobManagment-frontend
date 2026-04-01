import { useEffect, useState } from "react";
import API from "../services/api";

const BASE_URL = "http://localhost:3000";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await API.get("/user/profile");
      setUser(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!user) return null;

  // ✅ Normalize resume URL
  const resumeUrl =
    typeof user.resume === "string"
      ? user.resume
      : user?.resume?.url || null;

  // ✅ Create safe full URL (fix missing "/")
  const fullUrl = resumeUrl
    ? resumeUrl.startsWith("/")
      ? `${BASE_URL}${resumeUrl}`
      : `${BASE_URL}/${resumeUrl}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {/* Name */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Name</p>
          <p className="font-medium">{user.name}</p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>

        {/* Resume */}
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-2">Resume</p>

          {fullUrl ? (
            <div className="flex gap-4">
              
              {/* ✅ VIEW */}
              <button
                onClick={() => window.open(fullUrl, "_blank")}
                className="text-blue-600 underline"
              >
                View Resume
              </button>

              {/* ✅ DOWNLOAD */}
              <a
                href={fullUrl}
                download
                className="text-green-600 underline"
              >
                Download Resume
              </a>

            </div>
          ) : (
            <p className="text-red-500">No resume uploaded</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;