import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config.js";

// Función para validar si el ID es un ObjectId válido
function validetObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("El ID no es válido");
    res.status(400).json({
      msg: error.message,
    });
    return false; // Aseguramos que se detiene el flujo
  }
  return true; // Si el ID es válido, retornamos true
}

// Función para manejar errores de no encontrado
function handleNotFoundError(message, res) {
  const error = new Error(message);
  return res.status(404).json({
    msg: error.message,
  });
}

// Función para generar un JWT
const generarJWT = (id) => {
  const token = jwt.sign({ id }, config.JWT, {
    expiresIn: "30d",
  });
  return token;
};

export { validetObjectId, handleNotFoundError, generarJWT };
