const Reserva = require("../entity/reserva");

module.exports = {
  async listar(userId) {
    const resultado = await Reserva.find({ 'usuario': userId }).populate('usuario livro');
    return resultado
  },
  async criar(reserva) {
    const reservaCriada = await Reserva.create(reserva);
    return reservaCriada
  }
}