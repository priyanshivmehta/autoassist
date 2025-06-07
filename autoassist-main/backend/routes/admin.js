const express = require("express");
const router = express.Router({mergeParams: true});
const passport = require("passport");
const adminController = require("../controller/admin");
const { isAuthenticated, isAdminAuthorized, isUserAuthorized } = require("../middleware/authMiddleware");

// Admin/Mechanic Registration
router.post("/signup", adminController.signup);

// Admin/Mechanic Login
router.post("/login", adminController.login);

// Update Admin Details
router.put("/:id", adminController.update);

// Logout Admin
router.get("/logout", adminController.logout);

// Delete Admin
router.delete("/:id", adminController.delete);

module.exports = router;
