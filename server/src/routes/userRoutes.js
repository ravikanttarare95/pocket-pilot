import express from "express";
import {
  userRegister,
  userLogin,
  refreshAccessToken,
  userLogout,
  updateProfile,
} from "./../controllers/userController.js";

import jwtCheck from "./../middlewares/jwtCheck.js";

const router = express.Router();

router.put("/", jwtCheck, updateProfile);

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/refresh", refreshAccessToken);
router.post("/logout", userLogout);

export default router;
