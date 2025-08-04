import { useEffect, useState } from "react";
import axios from "axios";

export default function PermissionDashboard() {
  const [permissions, setPermissions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newRole, setNewRole] = useState("");

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
      const res = await axios.get("/api/permissions");
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
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Permission Management</h2>

      {/* Create New Permission */}
      <form onSubmit={handleCreate} className="flex gap-4 items-center">
        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
          className="select select-bordered"
        >
          <option value="">Select role</option>
          {allRoles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary btn-sm">Create Permission</button>
      </form>

      {/* Permissions List */}
      <div className="space-y-6">
        {permissions.map((perm, index) => (
          <div key={perm.role} className="border rounded-lg p-4 shadow-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold capitalize">{perm.role}</h3>
              {editing === perm.role ? (
                <button onClick={() => savePermissions(index)} className="btn btn-success btn-sm">Save</button>
              ) : (
                <button onClick={() => setEditing(perm.role)} className="btn btn-primary btn-sm">Edit</button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {allActions.map(action => (
                <label key={action} className="flex items-center gap-2 capitalize">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={!!perm.permissions[action]}
                    disabled={editing !== perm.role}
                    onChange={() => togglePermission(index, action)}
                  />
                  {action.replace(/_/g, " ")}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
