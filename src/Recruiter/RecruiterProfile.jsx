import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000";

const RecruiterProfile = () => {
  const { id } = useParams(); // ✅ GET ID FROM URL

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  // ✅ Fetch Profile (WITH ID)
  const fetchProfile = async () => {
    try {
      if (!id) {
        toast.error("Profile ID missing");
        return;
      }

      const res = await API.get(`/recruiter/profile/${id}`);

      const data = res.data?.user || res.data?.data || res.data;

      if (!data) {
        setProfile(null);
        return;
      }

      setProfile(data);

      setFormData({
        name: data?.name || "",
        email: data?.email || "",
        company: data?.company || "",
      });

    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

  // ✅ Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Update Profile
  const handleUpdate = async () => {
    try {
      if (!id) return;

      const res = await API.put(`/recruiter/profile/${id}`, formData);

      const updated = res.data?.user || res.data?.data || formData;

      setProfile(updated);
      setEditing(false);

      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to update profile");
    }
  };

  // ✅ Profile Image URL
  const getImageUrl = (image) => {
    if (!image) return null;

    let url = null;

    if (typeof image === "string") url = image;
    else if (image?.url) url = image.url;
    else if (Array.isArray(image)) url = image[0];

    if (!url) return null;

    if (url.startsWith("http")) return url;

    return `${BASE_URL}/${url.replace(/^\/+/, "")}`;
  };

  if (loading) return <p className="p-4">Loading profile...</p>;

  if (!profile) return <p className="p-4">No profile found</p>;

  const imageUrl = getImageUrl(profile.profileImage);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Recruiter Profile</h1>

      <div className="bg-white shadow-md rounded p-6">

        {/* Profile Image */}
        <div className="flex items-center gap-4 mb-6">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
              <span>No Image</span>
            </div>
          )}

          <button
            onClick={() => setEditing(!editing)}
            className="ml-auto bg-blue-500 text-white px-4 py-2 rounded"
          >
            {editing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* VIEW */}
        {!editing ? (
          <div className="space-y-4">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Company:</strong> {profile.company || "N/A"}</p>
          </div>
        ) : (
          /* EDIT */
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecruiterProfile;