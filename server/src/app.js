import express from "express";
import cors from "cors";
import http from "http";

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json({ limit: "4mb" }));

// Routes
app.get("/api/status", (req, res) =>
  res.send("Welcome to ChatApp Server is live"),
);

export { app, server };
