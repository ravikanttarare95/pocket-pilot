import express from "express";
import { getBudget, saveBudget } from "./../controllers/budgetController.js";
import jwtCheck from "./../middlewares/jwtCheck.js";

const router = express.Router();

router.get("/:month", jwtCheck, getBudget);
router.post("/", jwtCheck, saveBudget);

export default router;
