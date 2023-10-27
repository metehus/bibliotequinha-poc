const { Router } = require("express");
const ReservaService = require("../services/reserva");
const AuthService = require("../services/auth");

const reservaController = Router()

reservaController.get('/reservas', AuthService.autorizar, async (req, res) => {
  res.json(await ReservaService.listar(req.userId))
})

reservaController.post('/reservas', AuthService.autorizar, async (req, res) => {
  res.json(await ReservaService.criar(req.body))
})

module.exports = reservaController