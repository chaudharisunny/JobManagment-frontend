const JobDetailsCard = ({ job }) => {
  if (!job) return null;

  return (
    <div className="h-[80vh] overflow-y-auto pr-2">

      <h2 className="text-2xl font-bold mb-2">
        {job.title}
      </h2>

      <p className="text-gray-500 mb-4">
        {job.createdBy?.company}
      </p>

      <div className="flex gap-4 text-sm mb-4">
        <span>📍 {job.location}</span>
        <span>💰 ₹{job.salary}</span>
        <span>💼 {job.jobType}</span>
      </div>

      <h3 className="font-semibold mb-2">
        Description
      </h3>

      <p className="text-gray-600">
        {job.description}
      </p>

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
      {/* Requirements */}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          Requirements
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-600">
          {job.requirements?.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>

{/* Responsiblities */}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3">
          Responsibilites
        </h2>

        <ul className="list-disc pl-6 space-y-2 text-gray-600">
            {job.responsibilities.map((req, index) => (
              <li key={index}>{req}</li> ))}
          </ul>
      </div>
      

       
      {/* Apply Button */}

      <button className="mt-8 w-full bg-black text-white py-2 rounded">
        Apply Now
      </button>

    </div>
  );
};

export default JobDetailsCard;