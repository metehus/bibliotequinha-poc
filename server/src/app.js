const express = require("express");
const cors = require("cors");
require("./database/mongo");

const reservaController = require("./controllers/reserva");

const app = express();

app.use(express.json());
app.use(cors());

app.use(reservaController);

app.listen(3080, () => {
  console.log("API ligada em http://localhost:3080");
});
