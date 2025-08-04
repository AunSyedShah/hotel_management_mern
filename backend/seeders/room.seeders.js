import mongoose from 'mongoose';
import Room from '../models/Room';

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/hotel';

const seedRooms = async () => {
  try {
    console.log(`📡 Connecting to DB: ${DB_URL}`);
    await mongoose.connect(DB_URL);

    // Clear old data
    await Room.deleteMany();
    console.log('🧹 Cleared existing rooms.');

    const rooms = [
      {
        roomNumber: '101',
        type: 'single',
        status: 'available',
        price: 5000,
        floor: 1,
        description: 'Single bed, city view'
      },
      {
        roomNumber: '102',
        type: 'double',
        status: 'occupied',
        price: 8000,
        floor: 1,
        description: 'Double bed, balcony view'
      },
      {
        roomNumber: '201',
        type: 'suite',
        status: 'maintenance',
        price: 15000,
        floor: 2,
        description: 'Suite with lounge and kitchen'
      },
      {
        roomNumber: '202',
        type: 'double',
        status: 'cleaning',
        price: 9000,
        floor: 2,
        description: 'Double bed, recently vacated'
      },
      {
        roomNumber: '301',
        type: 'single',
        status: 'available',
        price: 5200,
        floor: 3,
        description: 'Economy room with courtyard view'
      }
    ];

    await Room.insertMany(rooms);
    console.log('✅ Rooms seeded successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 DB disconnected.');
  }
};

seedRooms();
