import mongoose from 'mongoose';

const housekeepingSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // housekeeping staff
  taskType: {
    type: String,
    enum: ['cleaning', 'inspection', 'maintenance'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  notes: String,
  scheduledAt: Date,
  completedAt: Date
}, { timestamps: true });

export default mongoose.model('Housekeeping', housekeepingSchema);
