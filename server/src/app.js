import express from "express";
import cors from "cors";
import http from "http";
import userRouter from "./routes/user.route.js";
import messageRouter from "./routes/message.route.js";
import { Server } from "socket.io";


const app = express();
const server = http.createServer(app);

// Initialize socket.io server
export const io = new Server(server, {
    cors: {origin: "*"}
})

// store online users
export const userSocketMap = {};  // {userId: socketId}

// socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User Connected", userId);
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // Emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User Disonnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        
    })
})


// Middlewares
app.use(cors());
app.use(express.json({ limit: "4mb" }));

// Routes setup
app.use("/api/status", (req, res) =>
  res.send("Welcome to ChatApp Server is live"),
);
app.use("/api/auth", userRouter) // User routes
app.use("/api/messages", messageRouter) // Message routes

export { app, server };
