import { model, Schema } from "mongoose";

const transactionSchema = new Schema(
  {
    type: { type: String, required: true, enum: ["income", "expense"] },
    amount: {
      type: Number,
      required: true,
      min: [0, "Amount must be positive"],
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "home-expenses",
        "food-and-drinks",
        "salary",
        "food",
        "travel",
        "bills",
        "shopping",
        "bonus",
        "allowance",
        "entertainment",
        "others",
      ],
    },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

export default Transaction;
