import { useEffect, useState } from "react";
import axios from "axios";
import RoomItem from "./RoomItem";
import RoomForm from "./RoomForm";

export default function RoomList({ permissions }) {
  const [rooms, setRooms] = useState([]);
  const [editData, setEditData] = useState(null);

  const loadRooms = async () => {
    try {
      const res = await axios.get("/api/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Room fetch error:", err);
    }
  };

  useEffect(() => {
    if (permissions.read_room) loadRooms();
  }, [permissions]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/rooms/${id}`);
      loadRooms();
    } catch (err) {
      console.error("Room delete error:", err);
    }
  };

  const handleSuccess = () => {
    setEditData(null);
    loadRooms();
  };

  return (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-center mb-4">Manage Rooms</h2>

    {permissions.create_room && (
      <RoomForm mode={editData ? "edit" : "create"} initialValues={editData} onSuccess={handleSuccess} />
    )}

    {permissions.read_room && (
      <div className="space-y-4">
        {rooms.map(room => (
          <RoomItem
            key={room._id}
            room={room}
            onEdit={setEditData}
            onDelete={handleDelete}
            permissions={permissions}
          />
        ))}
      </div>
    )}
  </div>
);

}
