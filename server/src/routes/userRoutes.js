import express from "express";
import {
  userRegister,
  userLogin,
  refreshAccessToken,
} from "./../controllers/userController.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/refresh", refreshAccessToken);

export default router;
