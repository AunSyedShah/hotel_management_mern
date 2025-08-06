import axios from "axios";
import { useEffect, useState } from "react";
import { Badge } from "./ui";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios.get("/api/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    getUsers();
  }, []); // only run once on mount

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th className="text-left">#</th>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Role</th>
            <th className="text-left">Status</th>
            <th className="text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user._id} className="hover">
                <td className="font-medium">{index + 1}</td>
                <td className="font-semibold">{user.name}</td>
                <td className="text-sm opacity-70">{user.email}</td>
                <td>
                  <Badge variant="info">{user.role}</Badge>
                </td>
                <td>
                  <Badge 
                    variant={user.status === "active" ? "success" : "error"}
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="text-sm opacity-70">
                  {new Date(user.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-base-content/60 py-8">
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-lg">No users found</span>
                  <span className="text-sm">Users will appear here once available</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
