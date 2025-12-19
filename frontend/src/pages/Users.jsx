import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Users() {
  const { user } = useAuth();

  if (user.role !== "admin") {
    return <h1 className="text-2xl font-bold">Access Denied</h1>;
  }

  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("officer");

  const loadUsers = async () => {
    const res = await api.get("/users/all");
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const addUser = async () => {
    await api.post("/users/add", { name, email, password, role });
    setOpen(false);
    loadUsers();
  };

  const updateRole = async (id, newRole) => {
    await api.put(`/users/update/${id}`, { role: newRole });
    loadUsers();
  };

  const deleteUser = async (id) => {
    await api.delete(`/users/delete/${id}`);
    loadUsers();
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-3xl font-bold">Users</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>

              <td className="p-2 flex gap-4">
                <button
                  onClick={() =>
                    updateRole(u._id, u.role === "admin" ? "officer" : "admin")
                  }
                  className="text-blue-600"
                >
                  {u.role === "admin" ? "Make Officer" : "Make Admin"}
                </button>

                <button
                  onClick={() => deleteUser(u._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ADD USER MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96 shadow">
            <h2 className="text-xl font-bold mb-4">Add User</h2>

            <input
              className="w-full border p-2 mb-3"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full border p-2 mb-3"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="w-full border p-2 mb-3"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <select
              className="w-full border p-2 mb-3"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="officer">Officer</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>

              <button
                onClick={addUser}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
