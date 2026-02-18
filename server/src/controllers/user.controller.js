import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Signup a new user
export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing details!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    const token = generateToken(newUser._id);
    res.json({
      success: true,
      userData: newUser,
      token,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials!" });
    }

    const token = generateToken(userData._id);
    res.json({ success: true, userData, token, message: "Login successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Check if user is authenticated
export const checkAuth = async (req, res) => {
  res.json({ success: true, user: req.user });
};

// Update user profile details
export const updateProfile = async (req, res) => {
  try {
    const { bio, fullName } = req.body;
    const userId = req.user._id;
    let updateData = { bio, fullName };

    if (req.file) {
      const cloudinaryResponse = await uploadOnCloudinary(req.file.path);

      if (!cloudinaryResponse) {
        return res.status(500).json({ message: "Image upload failed" });
      }
      updateData.profilePic = cloudinaryResponse.secure_url;
    }

    // console.log("BODY:", req.body);
    // console.log("*************************");
    // console.log("FILE:", req.file);

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
