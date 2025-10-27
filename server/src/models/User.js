import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, //ignore null/missing/undefined values for unique index
    },
    avtarUrl: {
      type: String,
    },
    isVerified: { type: Boolean, default: false },
    provider: { type: String, default: "local" },
  },
  { timestamps: true }
);
const User = model("User", userSchema);

export default User;
