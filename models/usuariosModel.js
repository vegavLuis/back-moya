import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apPaterno: {
    type: String,
    required: true,
    trim: true,
  },
  apMaterno: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  rol: {
    type: String,
    trim: true,
    required: true,
    default: 'usr'
  },
});

usuariosSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usuariosSchema.methods.checkPassword = async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
};

const Usuarios = mongoose.model("Usuarios", usuariosSchema);
export default Usuarios;
