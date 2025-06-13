const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const Review = require("./review");

const mechanicSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    location: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    address: {
        type: String,
    },
    liveLocation: {
        latitude: { type: Number },
        longitude: { type: Number }
    },
    bookings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            status: {
                type: String,
                enum: ["pending", "accepted", "rejected", "completed"],
                default: "pending",
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
});

mechanicSchema.plugin(passportLocalMongoose);

mechanicSchema.post("findOneAndDelete", async (mechanic) => {
    if (mechanic) {
        await Review.deleteMany({ _id: { $in: mechanic.reviews } });
    }
});

const Mechanic = mongoose.model("Mechanic", mechanicSchema);
module.exports = Mechanic;
