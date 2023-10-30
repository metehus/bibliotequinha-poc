import { Routes, Route } from "react-router-dom";

import Reserva from "./pages/Reserva";
import Home from "./pages/home";
import Detalhes from "./pages/detalhes";

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="reserva" element={<Reserva />} />
      <Route path="detalhes/:codigo" element={<Detalhes />} />
      <Route path="*" element={<h1> 404 - Página Não Encontrada!</h1>} />
    </Routes>
  );
}
