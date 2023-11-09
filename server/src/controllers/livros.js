const { Router } = require("express");
const livroService = require("../services/livro");

const livrosController = Router();

livrosController.get("/livros", async (req, res) => {
  res.json(await livroService.listar());
});

module.exports = livrosController;
