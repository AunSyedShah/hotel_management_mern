import { useEffect, useState } from "react";
import axios from "axios";
import RoomItem from "./RoomItem";
import RoomForm from "./RoomForm";
import { Container, Card } from "../ui";

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
    <div className="min-h-screen bg-base-200">
      <Container maxWidth="7xl" className="py-8">
        <div className="space-y-8">
          <Card title="Room Management" className="text-center">
            <p className="text-base-content/70">Manage hotel rooms, availability, and pricing</p>
          </Card>

          {permissions.create_room && (
            <RoomForm 
              mode={editData ? "edit" : "create"} 
              initialValues={editData} 
              onSuccess={handleSuccess} 
            />
          )}

          {permissions.read_room && (
            <Card title={`All Rooms (${rooms.length})`}>
              {rooms.length > 0 ? (
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
              ) : (
                <div className="text-center py-8">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-6xl opacity-20">🏨</div>
                    <div>
                      <h3 className="text-lg font-semibold text-base-content/70">No rooms available</h3>
                      <p className="text-sm text-base-content/50">Start by creating your first room</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </Container>
    </div>
  );
}
