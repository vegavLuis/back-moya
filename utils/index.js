import mongoose from "mongoose";

function validetObjectId(id, res) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("El ID no es valido");
    return res.status(400).json({
      msg: error.message,
    });
  }
}

export { validetObjectId };
