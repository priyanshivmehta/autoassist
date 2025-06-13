const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");
const adminController = require("../controller/admin");
const { isAuthenticated} = require("../middleware/authMiddleware");

// Admin/Mechanic Registration
router.post("/signup", adminController.signup);

// Admin/Mechanic Login
router.post("/login", adminController.login);

// Get Admin Profile
router.get("/profile", isAuthenticated, adminController.getProfile);

// Update Admin Details
router.put("/:id", adminController.update);

// Logout Admin
router.get("/logout", adminController.logout);

// Delete Admin
router.delete("/:id", adminController.delete);

module.exports = router;

