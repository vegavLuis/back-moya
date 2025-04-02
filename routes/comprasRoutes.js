import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { comprasController } from "../controllers/index.js";

const router = express.Router();

// Rutas para usuarios
router.route("/").post(comprasController.createCompra)

export default router;
