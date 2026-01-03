import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/db.js";

import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import imagekitRouter from "./routes/imagekitRoutes.js";

import passport from "./configs/passport.js";

import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(passport.initialize());

app.get("/health", (_, res) => {
  res.json({ status: "OK", message: "Server is healthy." });
});

app.use("/api/users", userRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/budgets", budgetRoutes);

app.use("/auth", authRoutes);

app.use("/api/imagekit", imagekitRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n📞 Server is listening on port ${PORT} \n`);
  connectDB();
});
