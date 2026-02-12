import express from "express";
import auth from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, markMessageAsSeen, sendMessage } from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const messageRouter = express.Router();

messageRouter.get("/users", auth, getUsersForSidebar);
messageRouter.get("/:id", auth, getMessages);
messageRouter.put("/:id", auth, markMessageAsSeen);
messageRouter.post("/send/:id", auth, upload.single("image"), sendMessage);

export default messageRouter;