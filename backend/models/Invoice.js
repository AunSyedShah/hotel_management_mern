import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            description: String,
            amount: Number
        }
    ],
    totalAmount: Number,
    status: {
        type: String,
        enum: ['unpaid', 'paid', 'cancelled'],
        default: 'unpaid'
    },
    issuedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Invoice', invoiceSchema);
