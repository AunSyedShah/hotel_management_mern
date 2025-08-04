import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  mainGuest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  checkOutDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['reserved', 'checked-in', 'checked-out', 'cancelled'],
    default: 'reserved'
  },
  billAmount: {
    type: Number
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.model('Booking', bookingSchema);
