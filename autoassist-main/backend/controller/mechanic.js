const Mechanic = require("../model/mechanic");
const Review=require("../model/review");

module.exports.signup = async (req, res) => {
    try {
        console.log("Received mechanic signup request:", req.body);

        const { username, email, number, password, latitude, longitude } = req.body;

        if (!username || !email || !number || !password || latitude === undefined || longitude === undefined) {
            console.log("Missing required fields!");
            // For API usage, return JSON error
            return res.status(400).json({ error: "All fields are required, including location." });
        }

        console.log("Creating new mechanic object...");
        const newMechanic = new Mechanic({ username, email, number, location: { latitude, longitude } });

        console.log("Registering mechanic with passport-local-mongoose...");
        const registeredMechanic = await Mechanic.register(newMechanic, password);
        
        console.log("Mechanic registered successfully:", registeredMechanic);
        // For API usage, return JSON success
        // Admin check
        const isAdmin = username.toLowerCase().startsWith("admin") && email.toLowerCase().startsWith("admin");
        return res.status(201).json({ message: "Mechanic registered successfully!", redirect: isAdmin ? "/admin/dashboard" : "/mechanic/dashboard" });
    } catch (err) {
        console.error("Error during mechanic signup:", err);
        // For API usage, return JSON error
        return res.status(500).json({ error: err.message });
    }
};


module.exports.login=async(req, res) => {
    req.flash("success", "Welcome Mechanic");
    // Admin check
    const { username, email } = req.body;
    const isAdmin = username?.toLowerCase().startsWith("admin") && email?.toLowerCase().startsWith("admin");
    return res.status(200).json({ message: "Login successful!", redirect: isAdmin ? "/admin/dashboard" : "/mechanic/dashboard" });
};


module.exports.update=async (req, res) => {
    try {
        const updatedMechanic = await Mechanic.findByIdAndUpdate(req.params.id, req.body, { new: true });
        req.flash("success", "Mechanic updated successfully!");
        res.redirect("/");
    } catch (err) {
        req.flash("error", "Error updating mechanic.");
        res.redirect("/");
    }
};

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            req.flash("error", "Logout failed!");
            return res.redirect("/");
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/");
    });
};


module.exports.delete=async (req, res) => {
    try {
        await Mechanic.findByIdAndDelete(req.params.id);
        req.flash("success", "Mechanic deleted successfully!");
        res.redirect("/");
    } catch (err) {
        req.flash("error", "Error deleting mechanic.");
        res.redirect("/");
    }
};


module.exports.reviews = async (req, res) => {
    try {
        let mechanic = await Mechanic.findById(req.params.id);
        if (!mechanic) {
            req.flash("error", "Mechanic not found.");
            return res.redirect("/");
        }

        let newReview = new Review(req.body.review);
        await newReview.save();

        mechanic.reviews.push(newReview);
        await mechanic.save();

        req.flash("success", "New review added!");
        //res.send("new review added");
         res.redirect("/");
    } catch (err) {
        console.error("Error adding review:", err);
        req.flash("error", "Failed to add review.");
        res.redirect("/mechanic${id}");
    }
};


module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    const mechanic = await Mechanic.findById(id);
    if (!mechanic) {
        req.flash("error", "Mechanic not found.");
        return res.redirect("/");
    }

    const reviewExists = mechanic.reviews.includes(reviewId);
    if (!reviewExists) {
        req.flash("error", "Review not found.");
        return res.redirect("/");
    }

    await Mechanic.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted!");
    res.redirect(`/mechanic/${id}`);
};


module.exports.getAllMechanics = async (req, res) => {
    try {
        const mechanics = await Mechanic.find();
        res.status(200).json(mechanics);
    } catch (err) {
        res.status(500).json({ error: "Error fetching mechanics" });
    }
};

module.exports.getMechanicById = async (req, res) => {
    try {
        const mechanic = await Mechanic.findById(req.params.id);
        if (!mechanic) {
            return res.status(404).json({ error: "Mechanic not found" });
        }
        res.status(200).json(mechanic);
    } catch (err) {
        res.status(500).json({ error: "Error fetching mechanic" });
    }
};
