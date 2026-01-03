import express from "express";
import {
  userRegister,
  userLogin,
  refreshAccessToken,
  userLogout,
  updateProfile,
  updatePassword,
  updatePhoto,
} from "./../controllers/userController.js";

import jwtCheck from "./../middlewares/jwtCheck.js";

const router = express.Router();

router.put("/", jwtCheck, updateProfile);

router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/refresh", refreshAccessToken);
router.post("/logout", userLogout);
router.put("/change-password", jwtCheck, updatePassword);
router.put("/change-profile-image", jwtCheck, updatePhoto);

export default router;
