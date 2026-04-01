import { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/JobCard";
import JobDetailsCard from "../components/JobDetailsCard";

const Jobs = () => {

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    try {

      setLoading(true);

      const res = await API.get(
        `/user/jobs?search=${search}&jobType=${jobType}&location=${location}&category=${category}&salary=${salary}&page=${page}`
      );

      const data = res.data;

      let extractedJobs =
        data.jobs ||
        data.data?.jobs ||
        data.data ||
        (Array.isArray(data) ? data : []);

      if (!Array.isArray(extractedJobs)) extractedJobs = [];

      setJobs(extractedJobs);

      setTotalPages(
        data.totalPages ||
        data.data?.totalPages ||
        1
      );

      if (extractedJobs.length > 0 && !selectedJob) {
        setSelectedJob(extractedJobs[0]);
      }

    } catch (error) {
      console.error(error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [search, jobType, location, category, salary, page]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* FILTER PANEL */}

        <div className="bg-white p-5 rounded-lg shadow h-fit sticky top-20">

          <h2 className="text-lg font-semibold mb-4">
            Filters
          </h2>

          <input
            type="text"
            placeholder="Search job"
            className="w-full border p-2 rounded mb-3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full border p-2 rounded mb-3"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded mb-3"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">Job Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Remote">Remote</option>
          </select>

          <select
            className="w-full border p-2 rounded mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option value="Technology">Technology</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
          </select>

          <select
            className="w-full border p-2 rounded"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          >
            <option value="">Salary</option>
            <option value="20000">20k+</option>
            <option value="30000">30k+</option>
            <option value="50000">50k+</option>
          </select>

        </div>


        {/* JOB LIST */}

        <div className="lg:col-span-2 h-[80vh] overflow-y-auto pr-2 space-y-3">

          {loading ? (
            <p>Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <p>No jobs found</p>
          ) : (

            jobs.map((job) => (

              <div
                key={job._id}
                onClick={() => setSelectedJob(job)}
                className={`cursor-pointer rounded-lg p-3 bg-white transition hover:shadow
                ${selectedJob?._id === job._id ? "border border-black" : ""}`}
              >
                <JobCard job={job} />
              </div>

            ))

          )}

          {/* PAGINATION */}

          <div className="flex justify-center items-center gap-4 pt-4">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Prev
            </button>

            <span className="text-sm">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-black text-white rounded"
            >
              Next
            </button>

          </div>

        </div>


        {/* JOB DETAILS */}

        {/* JOB DETAILS */}

<div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">

  {selectedJob ? (
    <JobDetailsCard job={selectedJob} />
  ) : (
    <p className="text-gray-500 text-center mt-20">
      Select a job to view details
    </p>
  )}

</div>

      </div>

    </div>
  );
};

export default Jobs;