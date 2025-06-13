const express=require("express");
const router=express.Router({mergeParams:true});
const methodOverride = require("method-override");
const Mechanic = require("../model/mechanic");
const passport = require("passport");
const mechanicController=require("../controller/mechanic");
const {reviewSchema}=require("../schema.js");
const { isAuthenticated, isMechanicAuthorized, isUserAuthorized } = require("../middleware/authMiddleware");


const validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new MongoExpiredSessionError(400,errMsg);

    }else{
        next();
    }
};



// Mechanic Registration
router.post("/signup", mechanicController.signup);

// Mechanic Login
router.post(
    "/login",
    passport.authenticate("mechanic-local", {
        failureRedirect: "/mechanic/login",
        failureFlash: true,
    }),
    mechanicController.login
);

router.get("/profile", isAuthenticated, mechanicController.getProfile);

// Update Mechanic Details
router.put("/:id", mechanicController.update);

// Logout Mechanic
router.get("/logout", mechanicController.logout);


router.delete("/:id", mechanicController.delete);


router.post("/:id/reviews",validateReview,mechanicController.reviews);

router.delete("/:id/reviews/:reviewId",mechanicController.deleteReview);


// Get all mechanics
router.get("/", mechanicController.getAllMechanics);

// Get mechanic by ID
router.get("/:id", mechanicController.getMechanicById);

// Route to update mechanic's live location
router.put("/:id/location", async (req, res) => {
    const { latitude, longitude } = req.body;
    try {
        const mechanic = await Mechanic.findByIdAndUpdate(
            req.params.id,
            { liveLocation: { latitude, longitude } },
            { new: true }
        );
        res.status(200).json({ message: "Location updated", mechanic });
    } catch (err) {
        res.status(500).json({ error: "Failed to update location" });
    }
});

// Route to fetch mechanic's live location
router.get("/:id/location", async (req, res) => {
    try {
        const mechanic = await Mechanic.findById(req.params.id);
        if (!mechanic) return res.status(404).json({ error: "Mechanic not found" });
        res.status(200).json(mechanic.liveLocation);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch location" });
    }
});

// Route to create a booking request
router.post("/:id/bookings", isAuthenticated, async (req, res) => {
    const { userId } = req.body;
    try {
        const mechanic = await Mechanic.findById(req.params.id);
        if (!mechanic) return res.status(404).json({ error: "Mechanic not found" });

        mechanic.bookings.push({ user: userId });
        await mechanic.save();

        res.status(201).json({ message: "Booking request created", bookings: mechanic.bookings });
    } catch (err) {
        res.status(500).json({ error: "Failed to create booking request" });
    }
});

// Route to update booking status
router.put("/:id/bookings/:bookingId", isAuthenticated, isMechanicAuthorized, async (req, res) => {
    const { status } = req.body;
    try {
        const mechanic = await Mechanic.findById(req.params.id);
        if (!mechanic) return res.status(404).json({ error: "Mechanic not found" });

        const booking = mechanic.bookings.id(req.params.bookingId);
        if (!booking) return res.status(404).json({ error: "Booking not found" });

        booking.status = status;
        await mechanic.save();

        res.status(200).json({ message: "Booking status updated", booking });
    } catch (err) {
        res.status(500).json({ error: "Failed to update booking status" });
    }
});

// Route to fetch mechanic's live location if booking is accepted
router.get("/:id/bookings/:bookingId/location", isAuthenticated, isUserAuthorized, async (req, res) => {
    try {
        const mechanic = await Mechanic.findById(req.params.id);
        if (!mechanic) return res.status(404).json({ error: "Mechanic not found" });

        const booking = mechanic.bookings.id(req.params.bookingId);
        if (!booking) return res.status(404).json({ error: "Booking not found" });
        if (booking.status !== "accepted") return res.status(403).json({ error: "Live location not available" });

        res.status(200).json(mechanic.liveLocation);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch live location" });
    }
});

module.exports=router;