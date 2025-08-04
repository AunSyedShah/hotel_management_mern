import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['admin', 'manager', 'receptionist', 'housekeeping', 'guest'],
        default: 'guest'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    preferences: {
        type: Map,
        of: String
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
