const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const User = require("./model/user");
const Mechanic = require("./model/mechanic");
const Admin = require("./model/admin");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const dotenv = require("dotenv");
const user=require("./routes/user");
const mechanic=require("./routes/mechanic");
const admin=require("./routes/admin");
const booking = require("./routes/booking");
const Razorpay =require("razorpay");
const paymentRoute=require("./routes/paymentRoute");
const Chat = require("./model/chat");

const cors=require("cors");


app.use(cors({
  origin:'http://localhost:5173',
  credentials: true,
}));

const {Server}=require("socket.io");
const {createServer}=require("http");
const server=createServer(app);

const io=new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET","POST"],
        credentials:true,
    }
});



dotenv.config();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connected to DB:", mongoose.connection.name);
        mongoose.connection.db.listCollections().toArray().then(collections => {
            console.log("Collections:", collections.map(c => c.name));
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: false,
    cookie: {
        // expires: Date.now() + 20 * 24 * 60 * 60 * 1000,
        maxAge: 20 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "lax", // Changed from 'lax' to 'none' to allow cross-origin cookies
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Custom authentication strategy for both Users, Mechanics and Admins
passport.use(
    "user-local",
    new LocalStrategy(User.authenticate())
);
passport.use(
    "mechanic-local",
    new LocalStrategy(Mechanic.authenticate())
);

passport.use(
    "admin-local",
    new LocalStrategy(Admin.authenticate())
);

// Serialize & Deserialize Users and Mechanics separately
passport.serializeUser((entity, done) => {
    // console.log("Serializing user:", entity);
    done(null, { id: entity.id, type: entity.constructor.modelName });
});

passport.deserializeUser(async (obj, done) => {
    // console.log("Deserializing user:", obj);
    try {
        if (obj.type === "User") {
            const user = await User.findById(obj.id);
            console.log("Deserialized user:", user);
            done(null, user);
        } else if (obj.type === "Mechanic") {
            const mechanic = await Mechanic.findById(obj.id);
            console.log("Deserialized mechanic:", mechanic);
            done(null, mechanic);
        } else if (obj.type === "Admin") {
            const admin = await Admin.findById(obj.id);
            console.log("Deserialized admin:", admin);
            done(null, admin);
        } else {
            done(new Error("Unknown user type"));
        }
    } catch (err) {
        done(err);
    }
});

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});


app.use("/user",user);
app.use("/mechanic",mechanic);
app.use("/admin",admin);
app.use("/booking", booking);



// Store chat messages (In-memory, better to use DB)
const chatRooms = {};

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("joinChat", async ({ userId, mechanicId }) => {
        const room = `chat_${userId}_${mechanicId}`;
        socket.join(room);

        console.log(`User ${userId} joined chat with Mechanic ${mechanicId}`);

        // Retrieve chat history
        const messages = await Chat.find({
            $or: [
                { senderId: userId, receiverId: mechanicId },
                { senderId: mechanicId, receiverId: userId }
            ]
        }).sort({ timestamp: 1 });

        socket.emit("chatHistory", messages);
    });

    socket.on("sendMessage", async ({ senderId, receiverId, text }) => {
        const room = `chat_${senderId}_${receiverId}`;

        // Save message to MongoDB
        const message = new Chat({ senderId, receiverId, text });
        await message.save();

        // Send message to room
        io.to(room).emit("receiveMessage", { sender: senderId, text });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// REST API: Send a message (Simulating Postman Request)
app.post("/send-message", async (req, res) => {
    const { senderId, receiverId, text } = req.body;

    if (!senderId || !receiverId || !text) {
        return res.status(400).json({ error: "Missing senderId, receiverId, or text" });
    }

    try {
        // Save message to MongoDB
        const message = new Chat({ senderId, receiverId, text });
        await message.save();

        // Emit the message via Socket.IO
        const room = `chat_${senderId}_${receiverId}`;
        io.to(room).emit("receiveMessage", { sender: senderId, text });

        res.status(200).json({ success: true, message: "Message sent and saved" });
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
});


// REST API: Get chat history
app.get("/chat-history/:userId/:mechanicId", async (req, res) => {
    const { userId, mechanicId } = req.params;

    const messages = await Chat.find({
        $or: [
            { senderId: userId, receiverId: mechanicId },
            { senderId: mechanicId, receiverId: userId }
        ]
    }).sort({ timestamp: 1 });

    res.json(messages);
});



const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

app.use("/api",paymentRoute);

app.get("/api/getkey",(req,res)=>{
  res.status(200).json({key:process.env.RAZORPAY_API_KEY});
});


server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
