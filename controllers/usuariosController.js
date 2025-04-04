import { Usuarios } from "../models/index.js";
import { validetObjectId, handleNotFoundError } from "../utils/index.js";

const createUsuario = async (req, res) => {
  // Validar todos los campos
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");
    return res.status(400).json({
      msg: error.message,
    });
  }

  const { email, password } = req.body;
  // Evitar registros duplicados
  const usuarioExiste = await Usuarios.findOne({ email });
  if (usuarioExiste) {
    const error = new Error("El usuario ya esta registrado");
    return res.status(400).json({
      msg: error.message,
    });
  }

  // Validar la extension del password
  const MIN_PASSWORD_LENGTH = 8;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      `El password debe cotener ${MIN_PASSWORD_LENGTH} caracteres`
    );
    return res.status(400).json({
      msg: error.message,
    });
  }

  try {
    const usuario = new Usuarios(req.body);
    const resul = await usuario.save();
    res.json({
      data: resul,
      msg: "El usuario se guardo correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  // Validar un object id
  // if (validetObjectId(id, res)) return;

  // Validar que exista
  const usuario = await Usuarios.findById(id);
  if (!usuario) {
    return handleNotFoundError("El usuario no existe", res);
  }
  res.json(usuario);
};

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.find()
    res.json(usuarios);
  } catch (error) {
    console.log(error);
  }
};

const updateUsuarioById = async (req, res) => {
  const { id } = req.params;
  // Validar un object id
  // if (validetObjectId(id, res)) return;
  // Validar que exista
  const usuario = await Usuarios.findById(id);
  if (!usuario) {
    return handleNotFoundError("El usuario no existe", res);
  }
  // Escribimos en el objeto los valores nuevos
  const { nombre, apPaterno, apMaterno, email, password } =
    req.body;
  usuario.nombre = nombre;
  usuario.apPaterno = apPaterno;
  usuario.apMaterno = apMaterno;
  usuario.email = email;
  usuario.password = password;

  try {
    await usuario.save();
    res.json({
      msg: "El usuario se actualizo correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUsuarioById = async (req, res) => {
  const { id } = req.params;
  // Validar un object id
  // if (validetObjectId(id, res)) return;

  // Validar que exista
  const usuario = await Usuarios.findById(id);
  if (!usuario) {
    return handleNotFoundError("El usuario no existe", res);
  }

  try {
    await usuario.deleteOne();
    res.json({
      msg: "El usuario se elimino correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  createUsuario,
  getUsuarioById,
  getAllUsuarios,
  updateUsuarioById,
  deleteUsuarioById,
};
