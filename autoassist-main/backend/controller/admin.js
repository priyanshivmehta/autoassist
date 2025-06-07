const Admin = require("../model/admin");
const Mechanic = require("../model/mechanic");

module.exports.signup = async (req, res) => {
    try {
        console.log("Received signup request:", req.body);

        const { username, email, number, password } = req.body;

        if (!username || !email || !number || !password) {
            console.log("Missing required fields!");
            return res.status(400).json({ error: "All fields are required." });
        }

        // Check if username and email start with "admin" (case insensitive)
        const isAdmin = username.toLowerCase().startsWith("admin") && email.toLowerCase().startsWith("admin");
        console.log("Is Admin:", isAdmin, "Username:", username, "Email:", email);

        try {
            if (isAdmin) {
                // Check if admin already exists
                const existingAdmin = await Admin.findOne({ 
                    $or: [
                        { username: username },
                        { email: email }
                    ]
                });

                if (existingAdmin) {
                    return res.status(400).json({ 
                        error: "Admin with this username or email already exists" 
                    });
                }

                console.log("Creating new admin object...");
                const newAdmin = new Admin({ username, email, number });
                console.log("Registering admin with passport-local-mongoose...");
                const registeredAdmin = await Admin.register(newAdmin, password);
                console.log("Admin registered successfully:", registeredAdmin);
                return res.status(201).json({ 
                    message: "Admin registered successfully!", 
                    redirect: "/admin/dashboard" 
                });
            } else {
                // Check if mechanic already exists
                const existingMechanic = await Mechanic.findOne({ 
                    $or: [
                        { username: username },
                        { email: email }
                    ]
                });

                if (existingMechanic) {
                    return res.status(400).json({ 
                        error: "Mechanic with this username or email already exists" 
                    });
                }

                console.log("Creating new mechanic object...");
                const newMechanic = new Mechanic({ 
                    username, 
                    email, 
                    number,
                    location: { latitude: 0, longitude: 0 } // Default location
                });
                console.log("Registering mechanic with passport-local-mongoose...");
                const registeredMechanic = await Mechanic.register(newMechanic, password);
                console.log("Mechanic registered successfully:", registeredMechanic);
                return res.status(201).json({ 
                    message: "Mechanic registered successfully!", 
                    redirect: "/mechanic/dashboard" 
                });
            }
        } catch (registrationError) {
            console.error("Registration error:", registrationError);
            return res.status(500).json({ 
                error: registrationError.message || "Registration failed. Please try again." 
            });
        }
    } catch (err) {
        console.error("Error during signup:", err);
        return res.status(500).json({ error: err.message });
    }
};


module.exports.login = async(req, res) => {
    try {
        const { username, password } = req.body;
        
        // Check if user exists in admin collection
        const admin = await Admin.findOne({ username: username });
        if (admin) {
            // Verify password
            const isMatch = await admin.authenticate(password);
            if (isMatch) {
                req.flash("success", "Welcome Admin");
                return res.status(200).json({ 
                    message: "Admin login successful!", 
                    redirect: "/admin/dashboard",
                    userType: "admin"
                });
            }
        }

        // Check if user exists in mechanic collection
        const mechanic = await Mechanic.findOne({ username: username });
        if (mechanic) {
            // Verify password
            const isMatch = await mechanic.authenticate(password);
            if (isMatch) {
                req.flash("success", "Welcome Mechanic");
                return res.status(200).json({ 
                    message: "Mechanic login successful!", 
                    redirect: "/mechanic/dashboard",
                    userType: "mechanic"
                });
            }
        }

        // If user not found or password doesn't match
        return res.status(401).json({ 
            error: "Invalid credentials" 
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ 
            error: "Login failed. Please try again." 
        });
    }
};


module.exports.update=async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        req.flash("success", "Admin updated successfully!");
        res.redirect("/");
    } catch (err) {
        req.flash("error", "Error updating Admin.");
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
        await Admin.findByIdAndDelete(req.params.id);
        req.flash("success", "Admin deleted successfully!");
        res.redirect("/");
    } catch (err) {
        req.flash("error", "Error deleting Admin.");
        res.redirect("/");
    }
};
