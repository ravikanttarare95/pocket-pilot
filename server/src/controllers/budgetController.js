import Budget from "./../models/Budget";

const getBudget = async (req, res) => {
  const { user } = req;
  //   console.log(user);
  const { month } = req.params;
  try {
    const budget = await Budget.findOne({ userId: user._id, month });
    if (budget) {
      return res.status(200).json(budget);
    } else {
      return res.status(404).json({ message: "Budget not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget" });
  }
};

export { getBudget };
