import Budget from "./../models/Budget.js";

const getBudget = async (req, res) => {
  const { user } = req;
  const { month } = req.params;
  try {
    const budget = await Budget.findOne({ userId: user.id, month });
    if (budget) {
      return res.status(200).json(budget);
    } else {
      return res.status(404).json({ message: "Budget not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget" });
  }
};

const saveBudget = async (req, res) => {
  const { user } = req;
  const { month, budgets } = req.body;

  try {
    let budget = await Budget.findOneAndUpdate(
      { userId: user.id, month },
      { budgets },
      { new: true, upsert: true }
    );
    if (budget) {
      res.json({
        success: true,
        message: "Budget updated successfully",
        data: budget,
      });
    } else {
      res.status(404).json({ message: "Budget not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating budget" });
  }
};

export { getBudget, saveBudget };
