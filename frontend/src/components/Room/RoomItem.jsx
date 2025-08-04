export default function RoomItem({ room, onEdit, onDelete, permissions }) {
  return (
    <div className="card bg-white shadow-md p-4 border border-base-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold text-primary">Room #{room.roomNumber}</h3>
          <p className="text-sm">Type: <span className="capitalize">{room.type}</span></p>
          <p className="text-sm">Status: <span className="capitalize">{room.status}</span></p>
          <p className="text-sm">Floor: {room.floor}</p>
          <p className="text-sm">Price: ${room.price}</p>
          {room.description && (
            <p className="text-sm text-gray-600 mt-1">Note: {room.description}</p>
          )}
        </div>

        <div className="space-x-2">
          {permissions.update_room && (
            <button onClick={() => onEdit(room)} className="btn btn-sm btn-info">Edit</button>
          )}
          {permissions.delete_room && (
            <button onClick={() => onDelete(room._id)} className="btn btn-sm btn-error">Delete</button>
          )}
        </div>
      </div>
    </div>
  );
}
