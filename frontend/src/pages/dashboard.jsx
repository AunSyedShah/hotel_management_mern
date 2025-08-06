import { useAuthContext } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import Users from "../components/Users";
import { Container, Card } from "../components/ui";

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
    <div className="min-h-screen bg-base-200">
      <Container maxWidth="7xl" className="py-8">
        <div className="space-y-8">
          <Card title="Dashboard" className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Welcome to Hotel Management System</h1>
            
            {user ? (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Hello, {user.name}!</h2>
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">Your Role</div>
                    <div className="stat-value text-primary">{user.role}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="alert alert-error">
                <span>User is not logged in</span>
              </div>
            )}
          </Card>

          {/* Dynamic permission check */}
          {canViewUsers && (
            <Card title="User Management">
              <Users />
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
}
