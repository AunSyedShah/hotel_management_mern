import { useAuthContext } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import Users from "../components/Users";

export default function Dashboard() {
  const { user } = useAuthContext();
  const [rolePermissions, setRolePermissions] = useState(null);

  useEffect(() => {
    if (user?.role) {
      axios
        .get(`/api/permissions/${user.role}`)
        .then((res) => setRolePermissions(res.data.permissions))
        .catch((err) => {
          console.error("Failed to load permissions:", err);
          setRolePermissions({});
        });
    }
  }, [user]);

  const canViewUsers = rolePermissions?.["view_users"];

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Hello World</h1>

      {user ? (
        <>
          <h2 className="text-5xl font-semibold">Welcome {user.name}</h2>

          {/* Dynamic permission check */}
          {canViewUsers && <Users />}
        </>
      ) : (
        <h2 className="text-xl text-error">User is not logged in</h2>
      )}
    </div>
  );
}
