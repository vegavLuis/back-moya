import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { usuariosController } from "../controllers/index.js";

const router = express.Router();

// Rutas para usuarios
router.route("/").post(usuariosController.createUsuario).get( usuariosController.getAllUsuarios);

router
  .route("/:id")
  .get( usuariosController.getUsuarioById)
  .put( usuariosController.updateUsuarioById)
  .delete( usuariosController.deleteUsuarioById);

export default router;
