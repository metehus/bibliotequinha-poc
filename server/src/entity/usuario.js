const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  funcionario: {
    type: Boolean,
    default: false
  }
});

UsuarioSchema.pre("save", async function (next) {
  const hash = await bcryptjs.hash(this.senha, 10);
  this.senha = hash;
  next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;
