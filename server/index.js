import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URL);
  if (conn) {
    console.log("\n📶 MongoDB connected");
  }
};

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server is healthy." });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n📞 Server is listening on port ${PORT}`);
  connectDB();
});
