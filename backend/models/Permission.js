// models/permissionModel.js
import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['admin', 'manager', 'receptionist', 'housekeeping', 'guest'],
    required: true
  },
  permissions: {
    type: Map, // key: action name, value: boolean
    of: Boolean,
    default: {}
  }
}, { timestamps: true });

export const Permission = mongoose.model('Permission', permissionSchema);
