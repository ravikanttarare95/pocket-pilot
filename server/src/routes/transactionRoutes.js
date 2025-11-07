import express from "express";
import {
  createTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
  getTransactionById,
} from "./../controllers/transactionController.js";
import jwtCheck from "./../middlewares/jwtCheck.js";

const router = express.Router();

router.use(jwtCheck);

router.post("/", createTransaction);
router.get("/", getTransactions);
router.delete("/:id", deleteTransaction);
router.get("/:id", getTransactionById);
router.put("/:id", editTransaction);

export default router;
