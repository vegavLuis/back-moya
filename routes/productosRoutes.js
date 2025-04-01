import express from "express";
import { productosController } from "../controllers/index.js";

const router = express.Router();

router
  .route("/")
  .post(productosController.createProducto)
  .get(productosController.getAllProductos);
router
  .route("/:id")
  .get(productosController.getProductoById)
  .put(productosController.updateProductoById)
  .delete(productosController.deleteProductoById);

export default router;
