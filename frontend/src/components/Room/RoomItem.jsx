import { Card, Badge, Button } from "../ui";

export default function RoomItem({ room, onEdit, onDelete, permissions }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'success';
      case 'occupied': return 'warning';
      case 'cleaning': return 'info';
      case 'maintenance': return 'error';
      default: return 'neutral';
    }
  };

  return (
    <Card compact className="hover:shadow-xl transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-primary">Room #{room.roomNumber}</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Type:</span>
              <Badge variant="neutral" size="sm" className="capitalize">
                {room.type}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Status:</span>
              <Badge variant={getStatusColor(room.status)} size="sm" className="capitalize">
                {room.status}
              </Badge>
            </div>
            <div>
              <span className="font-medium">Floor:</span> {room.floor}
            </div>
            <div>
              <span className="font-medium">Price:</span> 
              <span className="text-primary font-semibold ml-1">${room.price}</span>
            </div>
          </div>
          {room.description && (
            <p className="text-sm text-base-content/70 mt-2 italic">
              "{room.description}"
            </p>
          )}
        </div>

        <div className="flex gap-2">
          {permissions.update_room && (
            <Button 
              onClick={() => onEdit(room)} 
              variant="info" 
              size="sm"
            >
              Edit
            </Button>
          )}
          {permissions.delete_room && (
            <Button 
              onClick={() => onDelete(room._id)} 
              variant="error" 
              size="sm"
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
