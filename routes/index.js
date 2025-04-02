import productos from "./productosRoutes.js";
import auth from './authRoutes.js'
import usuarios from './usuariosRoutes.js'

import express from "express";

const router = express.Router();

router.use("/productos", productos);
router.use("/auth", auth);
router.use("/usuarios", usuarios);

export default router;
