import { Compras, Usuarios, Productos } from "../models/index.js";
import mongoose from "mongoose";
import { validetObjectId } from "../utils/index.js"; // Asegúrate de tener esta función de validación

const createCompra = async (req, res) => {
  const { usuarioId, producto } = req.body;

  // Validar que todos los campos sean completos
  if (!usuarioId || !producto || producto.length === 0) {
    const error = new Error("Todos los campos son obligatorios");
    return res.status(400).json({ msg: error.message });
  }

  // 1. Verificar que el ID de usuario sea válido
  if (!validetObjectId(usuarioId, res)) {
    return; // Si el ID no es válido, se detiene el flujo aquí
  }

  try {
    // 2. Buscar al usuario en la base de datos para asegurarnos de que existe
    const usuario = await Usuarios.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // 3. Calcular el total de la compra
    let totalCompra = 0;

    // Iterar sobre los productos y calcular el total de la compra
    for (let item of producto) {
      const productoDb = await Productos.findById(item.productoId); // Buscar el producto en la base de datos
      if (!productoDb) {
        return res.status(404).json({ msg: `Producto con ID ${item.productoId} no encontrado` });
      }

      // Validar que el producto tenga suficiente stock
      if (productoDb.cantidad < item.cantidad) {
        return res.status(400).json({
          msg: `No hay suficiente stock del producto ${productoDb.nombre}. Solo hay ${productoDb.cantidad} disponibles.`,
        });
      }

      // Calcular el total por producto (cantidad * precioUnitario)
      item.totalCompra = item.cantidad * item.precioUnitario; // Asignar el total de compra al producto

      // Sumar al total de la compra
      totalCompra += item.totalCompra;

      // Reducir la cantidad del producto en stock
      productoDb.cantidad -= item.cantidad;
      await productoDb.save(); // Guardar el producto actualizado en la base de datos
    }

    // 4. Crear la nueva compra
    const compra = new Compras({
      usuarioId,  // Asegúrate de que el usuarioId se pase correctamente
      producto,   // Los productos que el usuario está comprando
      totalCompra, // Total calculado
    });

    // 5. Guardar la compra en la base de datos
    const resul = await compra.save();

    // 6. Responder con los datos de la compra guardada y el total
    res.json({
      data: resul,
      msg: "Compra registrada correctamente",
      totalCompra,  // Mostrar el total calculado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error al guardar la compra" });
  }
};

export { createCompra };
