import { Usuarios } from "../models/index.js";
import { generarJWT } from "../utils/index.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  // Revisar que el usuario exista
  const usuario = await Usuarios.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(400).json({
      msg: error.message,
    });
  }

  // Comprobar el password
  if (await usuario.checkPassword(password)) {
    const token = generarJWT(usuario._id);
    res.json({
      token,
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(400).json({
      msg: error.message,
    });
  }
};
const user = async (req, res) => {
  const { user } = req;
  res.json(user);
};

export { login, user };
