const Mechanic = require("../model/mechanic");

// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ error: "Unauthorized" });
};

// Middleware to check if the mechanic is authorized to update booking status
const isMechanicAuthorized = async (req, res, next) => {
    try {
        const mechanic = await Mechanic.findById(req.params.id);
        if (!mechanic || mechanic._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Middleware to check if the user is authorized to fetch live location
const isUserAuthorized = async (req, res, next) => {
    try {
        const mechanic = await Mechanic.findById(req.params.id);
        const booking = mechanic.bookings.id(req.params.bookingId);
        if (!booking || booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    isAuthenticated,
    isMechanicAuthorized,
    isUserAuthorized
};
