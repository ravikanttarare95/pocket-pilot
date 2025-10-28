import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/userRoutes.js";
import connectDB from "./configs/db.js";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/health", (_, res) => {
  res.json({ status: "OK", message: "Server is healthy." });
});

app.use("/api/users", userRoute);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`\n📞 Server is listening on port ${PORT} \n`);
  connectDB();
});
