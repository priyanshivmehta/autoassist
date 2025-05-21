const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Mechanic: {
        type: Schema.Types.ObjectId,
        ref: 'Mechanic',
        // required: true
    },
    vehicleType: {
        type: String,
        enum: ['car', 'bike', 'truck', 'other'],
        required: true
    },
    serviceType: {
        type: String,
        enum: ['towing', 'repair', 'fuel', 'tire', 'battery', 'other'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fare: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'cancelled', 'completed'],
        default: 'pending'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    estimatedArrivalTime: {
        type: Date
    },
    completionTime: {
        type: Date
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    feedback: {
        type: String
    }
}, {
    timestamps: true
});

// Add index for location-based queries
// bookingSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Booking', bookingSchema);