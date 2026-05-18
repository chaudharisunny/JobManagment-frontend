import { useEffect, useState } from "react";
import API from "../service/api";

const AppliedJobList = () => {

  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAppliedJobs = async () => {

        try {

            const token = sessionStorage.getItem("token");

            const res = await API.get(
                "/user/appliedlist",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(res.data);

            setAppliedJobs(res.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    fetchAppliedJobs();

}, []);

  if (loading) {

    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-lg font-semibold">
          Loading...
        </p>
      </div>
    );

  }

  return (

    <div className="max-w-6xl mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-8">
        Applied Jobs
      </h1>

      {appliedJobs.length === 0 ? (

        <div className="bg-gray-100 p-6 rounded-lg text-center">
          No applied jobs found.
        </div>

      ) : (

        <div className="grid gap-6">

          {appliedJobs.map((item) => (

            <div
              key={item?._id}
              className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
            >

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {item?.job?.title || "No Title"}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    {item?.recruiter?.company || "No Company"}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {item?.job?.location || "No Location"}
                  </p>

                  <p className="text-sm text-gray-700 mt-2">
                    Salary:
                    {" "}
                    ₹ {item?.job?.salary || 0}
                  </p>

                  <p className="text-sm text-gray-700 mt-2">
                    Job Type:
                    {" "}
                    {item?.job?.jobType || "N/A"}
                  </p>

                </div>

                <div className="flex flex-col items-start md:items-end gap-2">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Applied Successfully
                  </span>

                  <span className="text-sm text-gray-500 capitalize">
                    Status:
                    {" "}
                    {item?.status || "Pending"}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default AppliedJobList;