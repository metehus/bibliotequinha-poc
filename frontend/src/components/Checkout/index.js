import React from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import api from "../../services/api";

export default function Checkout() {
  const navigate = useNavigate();
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || null;

  const [devolucao, setDevolucao] = React.useState(null)
  const [retirada, setRetirada] = React.useState(null)

  async function handleSubmit(event) {
    event.preventDefault();

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const reserva = {
          dataRetirada: retirada,
          dataDevolucao: devolucao,
          livroId: carrinho.id
        }
        const data = await api
          .post("/reservas", reserva, {
            headers: {
              authorization: `Bearer ${storedToken}`
            }
          })
          .then(r => r.data)
        console.log(data);
        alert("Reserva nº " + data.codigo + " realizada!");
        localStorage.removeItem("carrinho");
        navigate('/')
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Usuário não autenticado! Por favor, faça o login!");
      navigate("/login");
    }
  }

  function handleRemoverItem(index) {
    localStorage.removeItem("carrinho");
    navigate("/reserva"); // Redirecionar para a página de checkout para atualizar a exibição
  }

  return (
    <div className="container text-center">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {carrinho ? (
            <div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{carrinho.nome} </h5>



                </div>

                <div>
                  Data retirada:
                  <input
                    value={retirada}
                    onChange={e => setRetirada(e.target.value)}
                    type="date" name="retirada" required />

                  <br />

                  Data devolucao:
                  <input
                    value={devolucao}
                    onChange={e => setDevolucao(e.target.value)}
                    type="date" name="devolucao" required />

                  <br /><br />
                  <button type="button" className="btn btn-danger" onClick={handleRemoverItem}>
                    Remover
                  </button>
                </div>
              </div>
              <br />
              <button type="submit" className="btn btn-primary">
                Finalizar Reserva
              </button>
            </div>
          ) : (
            <div className="col">
              <p>Nenhum item no carrinho.</p>
            </div>
          )}
        </div>

      </form>
    </div>
  );
}
