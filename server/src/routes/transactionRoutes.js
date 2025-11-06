import express from "express";
import {
  createTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
} from "./../controllers/transactionController.js";
import jwtCheck from "./../middlewares/jwtCheck.js";

const router = express.Router();

router.use(jwtCheck);

router.post("/", createTransaction);
router.get("/", getTransactions);
router.put("/", editTransaction);
router.delete("/:id", deleteTransaction);
router.post("/", createTransaction);

export default router;
