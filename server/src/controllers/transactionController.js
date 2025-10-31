import Transaction from "./../models/Transaction.js";

const createTransaction = async (req, res) => {
  const { type, amount, date, time, category, description } = req.body;
  const { user } = req;
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
      return res.status(400).json({ success: false, errors: messages });
    }
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getTransactions = async (req, res) => {
  const { user } = req;
};

const editTransaction = async (req, res) => {
  const { user } = req;
};

const deleteTransaction = async (req, res) => {
  const { user } = req;
};

export {
  createTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
};
