import { model, Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["income", "expense"],
      lowercase: true,
    },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
    date: { type: Date, required: true, default: Date.now },
    time: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "home-expenses",
        "salary",
        "food",
        "travel",
        "bills",
        "education",
        "shopping",
        "bonus",
        "allowance",
        "entertainment",
        "others",
      ],
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Description too long (max 100 chars)"],
    },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
