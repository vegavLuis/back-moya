import jwt from "jsonwebtoken";
import Usuarios from "../models/usuariosModel.js";

const authMiddleware = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Baerer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Usuarios.findById(decoded.id).select("-password -__v");
      // .populate("roles")
      // .exec();
      next();
    } catch {
      const error = new Error("Token no valido");
      res.status(403).json({
        msg: error.message,
      });
    }
  } else {
    const error = new Error("Token no valido o inexistente");
    res.status(403).json({
      msg: error.message,
    });
  }
  //   next();
};

export default authMiddleware;
