import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

import passport from "passport";

import jwt from "jsonwebtoken";
import jwtCheck from "./../middlewares/jwtCheck.js";
import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "./../utils/token.js";

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const accessToken = generateAccessToken(req.user);
      const refreshToken = generateRefreshToken(req.user);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "None", //
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/",
      });

      res.redirect(
        `${process.env.CLIENT_URL}/auth-success?accessToken=${accessToken}`
      );
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
    return res
      .status(200)
      .json({ success: true, user, message: "Login Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
export default router;
