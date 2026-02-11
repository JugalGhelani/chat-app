import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from "../controllers/message.controller.js";

const messageRouter = express.Router();

messageRouter.get("/users", auth, getUsersForSidebar);
messageRouter.get("/:id", auth, getMessages);
messageRouter.put("/:id", auth, markMessageAsSeen);
messageRouter.post("/send/:id", auth, sendMessage);

export default messageRouter;