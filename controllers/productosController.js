import { Productos } from "../models/index.js";
import { validetObjectId, handleNotFoundError } from "../utils/index.js";

const createProducto = async (req, res) => {
  if (Object.values(req.body).includes("") || !req.files || !req.files.imagen) {
    const error = new Error(
      "Todos los campos son obligatorios, incluida la imagen."
    );
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const imagen = req.files.imagen;

    const validImageTypes = ["image/jpeg", "image/png"];
    if (!validImageTypes.includes(imagen.mimetype)) {
      const error = new Error(
        "El archivo debe ser una imagen JPEG, PNG o JPG."
      );
      return res.status(400).json({
        msg: error.message,
      });
    }

    const imagenBuffer = imagen.data;
    const producto = new Productos({
      nombre: req.body.nombre,
      detalles: req.body.detalles,
      precio: req.body.precio,
      cantidad: req.body.cantidad,
      imagen: imagenBuffer,
    });

    const resul = await producto.save();

    res.json({
      data: resul,
      msg: "El producto se guardó correctamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Hubo un error al guardar el producto",
      error: error.message,
    });
  }
};
const getProductoById = async (req, res) => {
  const { id } = req.params;

  // Validar que exista
  const producto = await Productos.findById(id);
  if (!producto) {
    return handleNotFoundError("El producto no existe", res);
  }
  const imagenBase64 = producto.imagen.toString('base64');
  const productoConImagen = {
    ...producto.toObject(),
    imagenBase64: `data:image/jpeg;base64,${imagenBase64}`,
  };
  res.json(productoConImagen);
};
const getAllProductos = async (req, res) => {
  try {
    const productos = await Productos.find();
    
    const productosConImagenes = productos.map(producto => {
      const imagenBase64 = producto.imagen.toString('base64');
      return {
        ...producto.toObject(),
        imagenBase64: `data:image/jpeg;base64,${imagenBase64}`,
      };
    });

    res.json(productosConImagenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Hubo un error al obtener los productos",
      error: error.message,
    });
  }
};
const updateProductoById = async (req, res) => {
  const { id } = req.params;
  // if (validetObjectId(id, res)) return;

  try {
    const producto = await Productos.findById(id);
    if (!producto) {
      return handleNotFoundError("El producto no existe", res);
    }

    const { nombre, detalles, precio, cantidad } = req.body;

    if (nombre) producto.nombre = nombre;
    if (detalles) producto.detalles = detalles;
    if (precio) producto.precio = precio;
    if (cantidad) producto.cantidad = cantidad;

    if (req.files && req.files.imagen) {
      const imagen = req.files.imagen;

      const validImageTypes = ["image/jpeg", "image/png"];
      if (!validImageTypes.includes(imagen.mimetype)) {
        const error = new Error(
          "El archivo debe ser una imagen JPEG, PNG o JPG."
        );
        return res.status(400).json({
          msg: error.message,
        });
      }

      producto.imagen = imagen.data;
    }
    await producto.save();

    res.json({
      msg: "El producto se actualizó correctamente",
      data: producto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error al actualizar el producto",
      error: error.message,
    });
  }
};
const deleteProductoById = async (req, res) => {
  const { id } = req.params;
  // Validar un object id
  if (validetObjectId(id, res)) return;

  // Validar que exista
  const producto = await Productos.findById(id);
  if (!producto) {
    return handleNotFoundError("El producto no existe", res);
  }

  try {
    await producto.deleteOne();
    res.json({
      msg: "El producto se elimino correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  createProducto,
  getProductoById,
  getAllProductos,
  updateProductoById,
  deleteProductoById,
};
