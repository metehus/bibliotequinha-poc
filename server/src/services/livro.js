const Livro = require("../entity/livro");

module.exports = {
  async listar() {
    const resultado = await Livro.find();
    return resultado;
  },
};
