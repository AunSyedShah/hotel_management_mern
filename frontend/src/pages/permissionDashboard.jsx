import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthProvider";
import { Container, Card, Select, Button, Badge, Checkbox } from "../components/ui";

export default function PermissionDashboard() {
  const [permissions, setPermissions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newRole, setNewRole] = useState("");
  const {token} = useAuthContext();

  const allRoles = ["admin", "manager", "receptionist", "housekeeping", "guest"];
  const allActions = [
    "create_user", "read_user", "update_user", "delete_user",
    "create_room", "read_room", "update_room", "delete_room"
  ];

  useEffect(() => {
    loadPermissions();
  }, []);

  const loadPermissions = async () => {
    try {
      const res = await axios.get("/api/permissions", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPermissions(res.data);
    } catch (err) {
      console.error("Failed to fetch permissions:", err);
    }
  };

  const togglePermission = (roleIndex, key) => {
    const updated = [...permissions];
    updated[roleIndex].permissions[key] = !updated[roleIndex].permissions[key];
    setPermissions(updated);
  };

  const savePermissions = async (roleIndex) => {
    const { role, permissions: updatedPerms } = permissions[roleIndex];
    try {
      await axios.post("/api/permissions", { role, permissions: updatedPerms });
      setEditing(null);
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!newRole) return;

    const alreadyExists = permissions.some(p => p.role === newRole);
    if (alreadyExists) {
      alert("Permission for this role already exists.");
      return;
    }

    const defaultPermissions = {};
    allActions.forEach(action => {
      defaultPermissions[action] = false;
    });

    try {
      const res = await axios.post("/api/permissions", {
        role: newRole,
        permissions: defaultPermissions
      });
      setPermissions(prev => [...prev, res.data]);
      setNewRole("");
    } catch (err) {
      console.error("Failed to create permission:", err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <Container maxWidth="7xl" className="py-8">
        <div className="space-y-8">
          <Card title="Permission Management" className="text-center">
            <p className="text-base-content/70">Configure role-based permissions for the hotel management system</p>
          </Card>

          {/* Create New Permission */}
          <Card title="Create New Role Permission">
            <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <Select
                  label="Select Role"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  options={allRoles}
                  placeholder="Choose a role"
                  required
                />
              </div>
              <Button type="submit" variant="primary" size="md">
                Create Permission
              </Button>
            </form>
          </Card>

          {/* Permissions List */}
          <div className="space-y-6">
            {permissions.map((perm, index) => (
              <Card key={perm.role} title={`${perm.role.charAt(0).toUpperCase() + perm.role.slice(1)} Permissions`}>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Badge variant="primary" size="lg" className="capitalize">
                      {perm.role}
                    </Badge>
                    {editing === perm.role ? (
                      <Button 
                        onClick={() => savePermissions(index)} 
                        variant="success" 
                        size="sm"
                      >
                        Save Changes
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => setEditing(perm.role)} 
                        variant="info" 
                        size="sm"
                      >
                        Edit Permissions
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {allActions.map(action => (
                      <Checkbox
                        key={action}
                        name={action}
                        label={action.replace(/_/g, ' ')}
                        checked={!!perm.permissions[action]}
                        onChange={() => togglePermission(index, action)}
                        disabled={editing !== perm.role}
                        variant="primary"
                        className="text-sm"
                      />
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            {permissions.length === 0 && (
              <Card>
                <div className="text-center py-8">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-6xl opacity-20">🔐</div>
                    <div>
                      <h3 className="text-lg font-semibold text-base-content/70">No permissions configured</h3>
                      <p className="text-sm text-base-content/50">Start by creating permissions for a role</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
