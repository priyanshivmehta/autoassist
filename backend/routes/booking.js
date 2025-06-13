const express = require("express");
const router = express.Router({mergeParams: true});
const {isAuthenticated, isMechanicAuthorized, isUserAuthorized} = require('../middleware/authMiddleware');
const bookingController = require('../controller/booking');

// User routes
router.post('/create-booking',
    isAuthenticated,
    bookingController.createBooking
);

router.get('/user-bookings',
    isAuthenticated,
    bookingController.getUserBookings
);

router.post('/cancel-booking/:bookingId',
    isAuthenticated,
    bookingController.cancelBooking
);

router.post('/rate-booking/:bookingId',
    isAuthenticated,
    bookingController.rateBooking
);

// Mechanic routes
router.get('/mechanic-bookings',
    isAuthenticated,
    bookingController.getMechanicBookings
);

router.post('/accept-booking/:bookingId',
    isAuthenticated,
    bookingController.acceptBooking
);

router.post('/complete-booking/:bookingId',
    isAuthenticated,
    bookingController.completeBooking
);

// Common routes
router.get('/booking/:bookingId',
    isAuthenticated,
    bookingController.getBookingDetails
);

module.exports = router;