import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import JobCard from "../components/JobCard";
const Home = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/user/jobs");
        const jobData =
          res.data.jobs ||
          res.data.data?.jobs ||
          res.data.data ||
          (Array.isArray(res.data) ? res.data : []);
        setJobs(jobData.slice(0, 3));
      } catch (error) {
        console.log("Error fetching jobs:", error);
        setJobs([]);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Find Your <span className="text-blue-600">Dream Job</span> <br />&
            Build Your Future 🚀
          </h1>
          <p className="mt-6 text-lg text-gray-600">
            {" "}
            Discover thousands of job opportunities from top companies.{" "}
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link to="/jobs">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl shadow-lg hover:scale-105 transition">
                Explore Jobs
              </button>
            </Link>
            <Link to="/login">
              <button className="px-8 py-3 border border-gray-300 rounded-2xl hover:bg-gray-100 transition">
                {" "}
                Post a Job{" "}
              </button>
            </Link>
          </div>
        </div>
      </section>
      {/* FEATURED JOBS */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          {" "}
          🔥 Featured Jobs{" "}
        </h2>
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500">No jobs available</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {" "}
            {jobs.map((job, index) => (
              <JobCard key={job._id || index} job={job} />
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link to="/jobs">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-2xl shadow hover:scale-105 transition">
              {" "}
              View All Jobs{" "}
            </button>
          </Link>
        </div>
      </section>{" "}
      {/* CONNECTING TALENT SECTION */}
      <section className="py-20 bg-white px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          {" "}
          🤝 Connecting Talent With Opportunities{" "}
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Create Profile</h3>
            <p className="text-gray-600">
              {" "}
              Sign up and create your professional profile to showcase your
              skills and experience.{" "}
            </p>
          </div>{" "}
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Explore Jobs</h3>
            <p className="text-gray-600">
              {" "}
              Browse thousands of job listings from top companies looking for
              talented professionals.{" "}
            </p>
          </div>
          <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3">Get Hired</h3>
            <p className="text-gray-600">
              {" "}
              Apply directly and connect with recruiters to land your dream
              job.{" "}
            </p>
          </div>
        </div>
      </section>
      {/* FOOTER */}{" "}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p className="text-lg font-semibold">JobPortal</p>
        <p className="mt-3 text-gray-400">
          {" "}
          Connecting talent with opportunity.{" "}
        </p>
        <p className="mt-5 text-gray-500 text-sm">
          {" "}
          © 2026 JobPortal. All rights reserved.{" "}
        </p>
      </footer>
    </div>
  );
};
export default Home;
