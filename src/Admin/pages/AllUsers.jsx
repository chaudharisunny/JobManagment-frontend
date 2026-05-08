import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../service/api";

const AllUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get(
        "/admin/users"
      );

      setUsers(
        res.data?.users ||
          res.data?.data ||
          []
      );
    } catch (err) {
      console.error(err);
      console.log("FULL ERROR:", err.response);
      if (
        err.response?.status === 401
      ) {
        sessionStorage.clear();
        navigate("/login", {
          replace: true,
        });
        return;
      }

      setError(
        err.response?.data
          ?.message ||
          "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this user?"
      );

    if (!confirmDelete) return;

    try {
      await API.delete(
        `/admin/users/${id}`
      );

      setUsers((prev) =>
        prev.filter(
          (user) =>
            user._id !== id
        )
      );
    } catch (err) {
      console.error(err);

      if (
        err.response?.status === 401
      ) {
        sessionStorage.clear();
        navigate("/login", {
          replace: true,
        });
        return;
      }

      alert(
        err.response?.data
          ?.message ||
          "Delete failed"
      );
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        Loading users...
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-xl p-6">

      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">
          All Users
        </h1>

        <span className="text-sm text-gray-500">
          Total: {users.length}
        </span>
      </div>

      {error && (
        <div className="mb-4 text-red-500">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">
                #
              </th>
              <th className="p-3 text-left">
                Name
              </th>
              <th className="p-3 text-left">
                Email
              </th>
              <th className="p-3 text-left">
                Roles
              </th>
              <th className="p-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-4 text-center"
                >
                  No users found
                </td>
              </tr>
            ) : (
              users.map(
                (
                  user,
                  index
                ) => (
                  <tr
                    key={
                      user._id
                    }
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {index + 1}
                    </td>

                    <td className="p-3">
                      {user.name}
                    </td>

                    <td className="p-3">
                      {user.email}
                    </td>

                    <td className="p-3 capitalize">
                      {Array.isArray(
                        user.roles
                      )
                        ? user.roles.join(
                            ", "
                          )
                        : user.role ||
                          "user"}
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() =>
                          handleDelete(
                            user._id
                          )
                        }
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default AllUsers;