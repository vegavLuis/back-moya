import express from "express";
import { authController } from "../controllers/index.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authController.login);

// Area privada - Requiere JWT
router.get("/user", authMiddleware, authController.user);

export default router;
