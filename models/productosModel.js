import mongoose from "mongoose";

const productosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  detalles: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: Number,
    required: true,
    trim: true,
  },
  cantidad: {
    type: Number,
    required: true,
    trim: true,
  },
  imagen: {
    type: Buffer,
    required: true,
  },
});

const Productos = mongoose.model("Productos", productosSchema);
export default Productos;
