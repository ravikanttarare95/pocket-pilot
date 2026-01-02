import Budget from "./../models/Budget.js";

const getBudget = async (req, res) => {
  const { user } = req;
  const { monthYear } = req.params;
  try {
    const budget = await Budget.findOne({ userId: user.id, monthYear });
    if (budget) {
      return res.status(200).json({
        success: true,
        message: "Budget fetched successfully",
        data: budget,
      });
    } else {
      return res.json({ message: "Budget not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget" });
  }
};

const saveBudget = async (req, res) => {
  const { user } = req;
  const { monthYear, budgets } = req.body;

  try {
    let newBudget = await Budget.findOneAndUpdate(
      { userId: user.id, monthYear },
      { budgets },
      { new: true, upsert: true } ////
    );
    if (newBudget) {
      res.json({
        success: true,
        message: "Budget updated successfully",
        data: newBudget,
      });
    } else {
      res.status(404).json({ message: "Budget not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating budget" });
  }
};

export { getBudget, saveBudget };
