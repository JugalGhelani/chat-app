import express from "express";
import cors from "cors";
import http from "http";
import userRouter from "./routes/user.route.js";

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json({ limit: "4mb" }));

// Routes setup
app.use("/api/status", (req, res) =>
  res.send("Welcome to ChatApp Server is live"),
);
app.use("/api/auth", userRouter) // User routes

export { app, server };
