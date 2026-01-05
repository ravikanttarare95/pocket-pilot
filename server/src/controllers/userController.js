import User from "./../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateAccessToken, generateRefreshToken } from "./../utils/token.js";
import { refreshCookieOptions } from "./../configs/cookieOptions.js";

dotenv.config();

const userRegister = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (!fullName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All the fields required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password did not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: `User with email ${email} already exists`,
      });
    }
    const fullNameRegex = /^[A-Z][a-zA-Z'-]{1,49}(?: [A-Z][a-zA-Z'-]{1,49})*$/;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!fullNameRegex.test(fullName)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter your full name using only letters, spaces, apostrophes, or hyphens, with each name starting with a capital letter and between 2 and 50 characters long",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address (user@xyz.com)",
      });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a password between 8-20 characters that includes at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &)",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error during registration",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and Password required",
      });
    }
    const existingUser = await User.findOne({ email }).select("+password"); ////////
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found or invalid email",
      });
    }
    console.log(existingUser.password);
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    res.cookie("refreshToken", refreshToken, refreshCookieOptions);

    return res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error during login",
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req?.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token not provided",
      });
    }
    let decodedRefreshToken;
    try {
      decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
    } catch (error) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    const user = await User.findById(decodedRefreshToken.id).select(
      "_id email fullName"
    ); ///////

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);

    return res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(401).json({ message: "Session expired" });
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const userLogout = (req, res) => {
  try {
    res.clearCookie("refreshToken", refreshCookieOptions);
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during logout" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userID = req.user.id;
    const { fullName, gender, phoneNumber, dateOfBirth, address } = req.body;

    if (!fullName) {
      return res.status(400).json({
        success: false,
        message: "Full Name is Mandaory",
      });
    }

    const fullNameRegex = /^[A-Z][a-zA-Z'-]{1,49}(?: [A-Z][a-zA-Z'-]{1,49})*$/;

    if (!fullNameRegex.test(fullName)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter your full name using only letters, spaces, apostrophes, or hyphens, with each name starting with a capital letter and between 2 and 50 characters long",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { fullName, gender, phoneNumber, dateOfBirth, address },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required",
      });
    }

    const existingUser = await User.findById(userId).select("+password");

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (existingUser.provider === "google") {
      return res.status(400).json({
        success: false,
        message: "Password change is not available for Google accounts",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, existingUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a password between 8-20 characters that includes at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, !, %, *, ?, &)",
      });
    }

    const isSame = await bcrypt.compare(newPassword, existingUser.password);

    if (isSame) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from old password",
      });
    }

    existingUser.password = await bcrypt.hash(newPassword, 10);

    await existingUser.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updatePhoto = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { avtarUrl } = req.body;

    if (avtarUrl === undefined) {
      return res.status(400).json({
        success: false,
        message: "avtarUrl is required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avtarUrl: avtarUrl || "" },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: avtarUrl
        ? "Profile photo updated successfully"
        : "Profile photo removed successfully",
    });
  } catch (error) {
    console.error("Update avatar error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile photo",
    });
  }
};

export {
  userRegister,
  userLogin,
  refreshAccessToken,
  userLogout,
  updateProfile,
  updatePassword,
  updatePhoto,
};
