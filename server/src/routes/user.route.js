import express from "express";
import { checkAuth, login, signup, updateProfile } from "../controllers/user.controller.js";
import auth from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.put("/profile", auth, upload.single("profilePic"), updateProfile);
userRouter.put("/check", auth, checkAuth);

export default userRouter;