import { Compras, Usuarios, Productos } from "../models/index.js";
import mongoose from "mongoose";
import { validetObjectId } from "../utils/index.js";

const createCompra = async (req, res) => {
  const { usuarioId, producto } = req.body;

  // Validar que todos los campos sean completos
  if (!usuarioId || !producto || producto.length === 0) {
    const error = new Error("Todos los campos son obligatorios");
    return res.status(400).json({ msg: error.message });
  }

  if (!validetObjectId(usuarioId, res)) {
    return;
  }

  try {
    const usuario = await Usuarios.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    let totalCompra = 0;

    for (let item of producto) {
      const productoDb = await Productos.findById(item.productoId);
      if (!productoDb) {
        return res.status(404).json({ msg: `Producto con ID ${item.productoId} no encontrado` });
      }

      if (productoDb.cantidad < item.cantidad) {
        return res.status(400).json({
          msg: `No hay suficiente stock del producto ${productoDb.nombre}. Solo hay ${productoDb.cantidad} disponibles.`,
        });
      }

      item.totalCompra = item.cantidad * item.precioUnitario;

      totalCompra += item.totalCompra;

      productoDb.cantidad -= item.cantidad;
      await productoDb.save(); 
    }

    const compra = new Compras({
      usuarioId, 
      producto,  
      totalCompra,
    });

    const resul = await compra.save();

    res.json({
      data: resul,
      msg: "Compra registrada correctamente",
      totalCompra, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error al guardar la compra" });
  }
};

export { createCompra };
