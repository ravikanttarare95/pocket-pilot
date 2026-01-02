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
      required: function () {
        // Password required only for local (non-Google) users
        return this.provider === "local";
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, //ignore null/missing/undefined values for unique index
    },
    avtarUrl: {
      type: String,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
      default: "prefer_not_to_say",
    },

    address: {
      type: String,
      trim: true,
    },
    isVerified: { type: Boolean, default: false },
    provider: { type: String, enum: ["local", "google"], default: "local" },
  },
  { timestamps: true }
);
const User = model("User", userSchema);

export default User;
