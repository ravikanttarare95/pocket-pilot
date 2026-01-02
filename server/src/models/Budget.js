import { model, Schema } from "mongoose";

const BudgetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    monthYear: {
      type: String,
      required: true,
    },
    budgets: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);
const Budget = model("Budget", BudgetSchema);
export default Budget;
