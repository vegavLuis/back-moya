import productos from "./productosRoutes.js";

import express from "express";

const router = express.Router();

router.use("/productos", productos);

export default router;
