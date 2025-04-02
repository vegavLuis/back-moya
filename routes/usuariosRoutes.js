import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { usuariosController } from "../controllers/index.js";

const router = express.Router();

// Rutas para usuarios
router.route("/").post(usuariosController.createUsuario).get(authMiddleware, usuariosController.getAllUsuarios);

router
  .route("/:id")
  .get(authMiddleware, usuariosController.getUsuarioById)
  .put(authMiddleware, usuariosController.updateUsuarioById)
  .delete(authMiddleware, usuariosController.deleteUsuarioById);

export default router;
