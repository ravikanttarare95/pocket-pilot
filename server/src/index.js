import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./configs/db.js";

import userRoutes from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import passport from "./configs/passport.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(passport.initialize());

app.get("/health", (_, res) => {
  res.json({ status: "OK", message: "Server is healthy." });
});

app.use("/api/users", userRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/budgets", budgetRoutes);

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n📞 Server is listening on port ${PORT} \n`);
  connectDB();
});
