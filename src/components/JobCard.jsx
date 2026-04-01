import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  if (!job) return null;

  return (
    <div className="w-full max-w-md bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      {/* Header */}
      <div className="flex justify-between items-start">

        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center font-semibold text-gray-600">
            {job.createdBy?.company?.charAt(0) || "C"}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {job.title}
            </h3>

            <p className="text-sm text-gray-500">
              {job.createdBy?.company || "Company"}
            </p>
          </div>
        </div>

        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {job.jobType}
        </span>

      </div>

      {/* Job Info */}
      <div className="flex gap-5 mt-4 text-sm text-gray-600">
        <span>📍 {job.location}</span>
        <span>💰 ₹{job.salary}</span>
      </div>

      {/* Description */}
      <p className="mt-3 text-sm text-gray-600 line-clamp-2">
        {job.description}
      </p>

      {/* Skills */}
      {job.skills && (
        <div className="flex flex-wrap gap-2 mt-3">
          {job.skills.slice(0, 3).map((skill, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 px-2 py-1 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 flex justify-between items-center">

        <span className="text-xs text-gray-400">
          {new Date(job.createdAt).toLocaleDateString()}
        </span>

        <Link to={`/jobdetails/${job._id}`}>
          <button className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            View
          </button>
        </Link>

      </div>
    </div>
  );
};

export default JobCard;