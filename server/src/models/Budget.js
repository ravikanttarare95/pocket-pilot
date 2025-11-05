import { model, Schema } from "mongoose";

const BudgetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    budgets: {
      type: Map,
      of: Number,
      default: {},
    },
  },
  { timestamps: true }
);
const Budget = model("Budget", BudgetSchema);
export default Budget;
