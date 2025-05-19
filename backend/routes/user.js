const express=require("express");
const router=express.Router({mergeParams:true});
const methodOverride = require("method-override");
const User = require("../model/user");
const passport = require("passport");
const userController=require("../controller/user");
const Review = require("../model/review");


// User Registration
router.post("/signup", userController.signup);

// User Login
router.post(
    "/login",
    passport.authenticate("user-local", {
        failureRedirect: "/user/login",
        failureFlash: true,
    }),
    userController.login
);



// Update User Details
router.put("/:id", userController.update);

// Logout User
router.get("/logout", userController.logout);

//delete user
router.delete("/:id", userController.delete);


// Get all users
router.get("/", userController.getAllUsers);

// Get user by ID
router.get("/:id", userController.getUserById);

// Create a review for a mechanic
router.post("/:mechanicId/reviews", userController.createReview);


module.exports=router;