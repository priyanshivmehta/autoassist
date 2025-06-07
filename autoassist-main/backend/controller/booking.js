const bookingModel = require('../model/booking');
const Mechanic = require('../model/mechanic');

async function calculateFare(serviceType) {
    const baseFares = {
        'towing': 1000,
        'repair': 500,
        'fuel': 300,
        'tire': 400,
        'battery': 600,
        'other': 500
    };

    return baseFares[serviceType] || baseFares.other;
}

async function getNearbyMechanics(location) {
    try {
        const mechanics = await Mechanic.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [location.lng, location.lat]
                    },
                    $maxDistance: 10000 // 10km in meters
                }
            },
            isAvailable: true
        }).limit(5);

        return mechanics;
    } catch (error) {
        console.error("Error finding nearby mechanics:", error);
        return [];
    }
}

async function calculateDistance(mechanicLocation, userLocation) {
    // Using the Haversine formula to calculate distance in kilometers
    const R = 6371; // Earth's radius in km
    const lat1 = mechanicLocation.coordinates[1];
    const lon1 = mechanicLocation.coordinates[0];
    const lat2 = userLocation.lat;
    const lon2 = userLocation.lng;
    
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

module.exports.createBooking = async (req, res) => {
    try {
        const { vehicleType, serviceType, description, location } = req.body;

        if (!vehicleType || !serviceType || !description || !location) {
            return res.status(400).json({
                error: "Missing required fields"
            });
        }

        const fare = await calculateFare(serviceType, location);

        const nearbyMechanics = await getNearbyMechanics(location);

        if (nearbyMechanics.length === 0) {
            return res.status(404).json({
                error: "No mechanics available in your area"
            });
        }

        // Create the booking
        const newBooking = await bookingModel.create({
            User: req.user._id,
            vehicleType,
            serviceType,
            description,
            location,
            fare,
            status: 'pending',
            timestamp: new Date(),
            paymentStatus: 'pending'
        });

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking: newBooking
        });

    } catch (err) {
        console.error("Error creating booking:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find({ User: req.user._id })
            .populate('Mechanic')
            .sort({ timestamp: -1 }); // Sort by newest first

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found"
            });
        }

        res.status(200).json({
            success: true,
            bookings: bookings
        });

    } catch (err) {
        console.error("Error getting user's bookings:", err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

module.exports.cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        const booking = await bookingModel.findOne({ 
            _id: bookingId,
            User: req.user._id
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found or unauthorized"
            });
        }

        if (booking.status !== 'pending' && booking.status !== 'accepted') {
            return res.status(400).json({
                success: false,
                message: "Cannot cancel booking at this stage"
            });
        }

        const updatedBooking = await bookingModel.findByIdAndUpdate(
            bookingId,
            { status: "cancelled" },
            { new: true }
        ).populate('Mechanic');

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            booking: updatedBooking
        });

    } catch (err) {
        console.error("Error cancelling booking:", err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

module.exports.rateBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const { rating, feedback } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        const booking = await bookingModel.findOne({ 
            _id: bookingId,
            User: req.user._id
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found or unauthorized"
            });
        }

        if (booking.status !== 'completed') {
            return res.status(400).json({
                success: false,
                message: "Cannot rate booking at this stage"
            });
        }

        if (booking.rating) {
            return res.status(400).json({
                success: false,
                message: "Booking already rated"
            });
        }

        const updatedBooking = await bookingModel.findByIdAndUpdate(
            bookingId,
            { 
                rating: rating,
                feedback: feedback || ''
            },
            { new: true }
        ).populate('Mechanic');

        // Update mechanic's average rating
        await Mechanic.findByIdAndUpdate(
            booking.Mechanic,
            { 
                $inc: { 
                    totalRatings: 1,
                    ratingsSum: rating
                }
            }
        );

        res.status(200).json({
            success: true,
            message: "Booking rated successfully",
            booking: updatedBooking
        });

    } catch (err) {
        console.error("Error rating booking:", err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

module.exports.getMechanicBookings = async (req, res) => {
    try {
        const bookings = await bookingModel.find({ 
            Mechanic: req.mechanic._id 
        })
        .populate('User')
        .populate('Mechanic') 
        .sort({ timestamp: -1 });  

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No bookings found for this mechanic"
            });
        }

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings: bookings
        });

    } catch (err) {
        console.error("Error getting mechanic's bookings:", err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

module.exports.acceptBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;
        const mechanic = await Mechanic.findById(req.mechanic._id);

        if (!mechanic.isAvailable) {
            return res.status(400).json({
                success: false,
                message: "You are currently unavailable to accept new bookings"
            });
        }

        const booking = await bookingModel.findOne({ 
            _id: bookingId,
            status: 'pending' // Only find pending bookings
        }).populate('User');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found or already accepted"
            });
        }

        // Calculate distance between mechanic and user
        const distance = await calculateDistance(mechanic.location, booking.location);
        
        // Check if mechanic is within reasonable distance (e.g., 10km)
        if (distance > 10) {
            return res.status(400).json({
                success: false,
                message: "Location too far from customer"
            });
        }

        // Add distance-based charge to fare
        const distanceCharge = Math.ceil(distance) * 10; // ₹10 per km
        const updatedFare = booking.fare + distanceCharge;

        const updatedBooking = await bookingModel.findOneAndUpdate(
            { 
                _id: bookingId,
                status: 'pending', 
                Mechanic: { $exists: false }
            },
            { 
                Mechanic: mechanic._id,
                status: "accepted",
                fare: updatedFare,
                estimatedArrivalTime: new Date(Date.now() + (distance * 2 * 60000)), // 2 min per km
                distanceFromCustomer: Math.round(distance * 100) / 100 // Round to 2 decimal places
            },
            { 
                new: true,
                runValidators: true
            }
        ).populate('Mechanic').populate('User');

        if (!updatedBooking) {
            return res.status(409).json({
                success: false,
                message: "Booking was already accepted by another mechanic"
            });
        }

        // Update mechanic availability
        await Mechanic.findByIdAndUpdate(
            mechanic._id,
            { 
                isAvailable: false,
                currentBooking: bookingId
            }
        );

        res.status(200).json({
            success: true,
            message: "Booking accepted successfully",
            booking: updatedBooking,
            distanceFromCustomer: Math.round(distance * 100) / 100,
            updatedFare
        });

    } catch(err) {
        console.error("Error accepting booking:", err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

module.exports.completeBooking = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        const booking = await bookingModel.findOne({ 
            _id: bookingId,
            Mechanic: req.mechanic._id
        }).populate('User');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found or unauthorized"
            });
        }

        if (booking.status !== 'accepted') {
            return res.status(400).json({
                success: false,
                message: "Booking must be in accepted state to complete"
            });
        }

        const updatedBooking = await bookingModel.findByIdAndUpdate(
            bookingId,
            { 
                status: "completed",
                completionTime: new Date(),
                paymentStatus: 'pending'
            },
            { new: true }
        ).populate('Mechanic');

        await Mechanic.findByIdAndUpdate(
            req.mechanic._id,
            { isAvailable: true }
        );

        res.status(200).json({
            success: true,
            message: "Booking completed successfully",
            booking: updatedBooking
        });

    } catch(err) {
        console.error("Error completing booking:", err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};

module.exports.getBookingDetails = async (req, res) => {
    try {
        const bookingId = req.params.bookingId;

        const booking = await bookingModel.findById(bookingId)
            .populate('User')
            .populate('Mechanic');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Booking details fetched successfully",
            booking: booking
        });

    } catch (err) {
        console.error("Error fetching booking details:", err);
        res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    }
};