const express = require("express");
const router = express.Router({mergeParams: true});
const {isAuthenticated, isMechanicAuthorized, isUserAuthorized} = require('../middleware/authMiddleware');
const bookingController = require('../controller/booking');

// User routes
router.post('/create-booking',
    isUserAuthorized,
    bookingController.createBooking
);

router.get('/user-bookings',
    isUserAuthorized,
    bookingController.getUserBookings
);

router.post('/cancel-booking/:bookingId',
    isUserAuthorized,
    bookingController.cancelBooking
);

router.post('/rate-booking/:bookingId',
    isUserAuthorized,
    bookingController.rateBooking
);

// Mechanic routes
router.get('/mechanic-bookings',
    isMechanicAuthorized,
    bookingController.getMechanicBookings
);

router.post('/accept-booking/:bookingId',
    isMechanicAuthorized,
    bookingController.acceptBooking
);

router.post('/complete-booking/:bookingId',
    isMechanicAuthorized,
    bookingController.completeBooking
);

// Common routes
router.get('/booking/:bookingId',
    isAuthenticated,
    bookingController.getBookingDetails
);

module.exports = router;