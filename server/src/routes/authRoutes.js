import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

import passport from "passport";

import jwt from "jsonwebtoken";
import jwtCheck from "./../middlewares/jwtCheck.js";
import User from "../models/User.js";

router.get(
  "/",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user._id, email: req.user.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    } catch (error) {
      res.redirect(`${process.env.CLIENT_URL}/login`);
    }
  }
);

router.get("/me", jwtCheck, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id }).select(
      "_id fullName email avtarUrl"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
export default router;
