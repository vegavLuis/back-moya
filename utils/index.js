import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config.js";

function validetObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("El ID no es válido");
    res.status(400).json({
      msg: error.message,
    });
    return false;
  }
  return true;
}

function handleNotFoundError(message, res) {
  const error = new Error(message);
  return res.status(404).json({
    msg: error.message,
  });
}

const generarJWT = (id) => {
  const token = jwt.sign({ id }, config.JWT, {
    expiresIn: "30d",
  });
  return token;
};

export { validetObjectId, handleNotFoundError, generarJWT };
