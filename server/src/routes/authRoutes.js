import express from "express";
const router = express.Router();

import dotenv from "dotenv";
dotenv.config();

import passport from "passport";

import jwt from "jsonwebtoken";

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

export default router;
