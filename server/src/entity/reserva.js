const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    dataRetirada: { type: Date, required: true },
    dataDevolucao: { type: Date, required: true },
    retirado: { type: Boolean, default: false },
    devolvido: { type: Boolean, default: false },
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
    livro: { type: mongoose.Schema.Types.ObjectId, ref: 'Livro' }
});

const Reserva = mongoose.model('Reserva', ReservaSchema);

module.exports = Reserva;
