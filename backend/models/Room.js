import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
    {
        roomNumber: { type: String, required: true, unique: true },
        type: {
            type: String,
            enum: ['single', 'double', 'suite'],
            required: true
        },
        status: {
            type: String,
            enum: ['available', 'occupied', 'cleaning', 'maintenance'],
            default: 'available'
        },
        price: { type: Number, required: true },
        floor: Number,
        description: String
    },
    { timestamps: true });

export default mongoose.model('Room', roomSchema);
