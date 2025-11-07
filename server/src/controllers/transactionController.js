import Transaction from "./../models/Transaction.js";

const createTransaction = async (req, res) => {
  const { type, amount, date, time, category, description } = req.body;
  const { user } = req;

  if (!type || !amount || !date || !time || !category || !description) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const newTransaction = await Transaction.create({
      userId: user.id,
      type,
      amount,
      date,
      time,
      category,
      description,
    });

    if (newTransaction) {
      return res.status(201).json({
        success: true,
        message: "Transaction created successfully",
        data: newTransaction,
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      //////////////
      const messages = Object.values(error.errors).map((err) => err.message);
      res.status(400).json({ success: false, message: messages });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { user } = req;
    const existingTransactions = await Transaction.find({
      userId: user.id,
    }).sort({
      createdAt: -1, // latest first
    });

    if (existingTransactions) {
      res.json({ success: true, data: existingTransactions });
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching transactions",
    });
  }
};

const editTransaction = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
};

const deleteTransaction = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  try {
    const transaction = await Transaction.findOne({ _id: id, userId: user.id });
    if (!transaction) {
      return res
        .status(404)
        .json({ success: false, message: "Transaction not found" });
    }

    await Transaction.deleteOne({ _id: id, userId: user.id });
    return res
      .status(200)
      .json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting transaction",
    });
  }
};

const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById({ _id: id });
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Transaction fetched succesffully",
      data: transaction,
    });
  } catch (error) {
    console.log("❌ Error fetching transaction:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error fetching transaction" });
  }
};

export {
  createTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
  getTransactionById,
};
