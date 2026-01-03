import express from "express";
import getImageKitAuth from "./../controllers/imagekitController.js";
const router = express.Router();

router.get("/auth", getImageKitAuth);

export default router;
