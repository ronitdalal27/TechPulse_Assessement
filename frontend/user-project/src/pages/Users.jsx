import { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "../services/UserApi";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getAllUsers();
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching users:", err);
      const status = err.response?.status;
      if (status === 403) setError("Access Denied: Admins only!");
      else if (status === 401) {
        setError("Unauthorized! Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.location.href = "/login";
      } else setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">All Registered Users</h2>
      {users.length === 0 ? <p className="text-center text-gray-600">No users found.</p> :
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Roles</th>
              <th className="border p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="border p-2">{u.id}</td>
                <td className="border p-2">{u.name}</td>
                <td className="border p-2">{u.email}</td>
                <td className="border p-2">{Array.isArray(u.roles) ? u.roles.join(", ") : "N/A"}</td>
                <td className="border p-2 text-center">
                  <button onClick={() => handleDelete(u.id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
}

export default Users;
