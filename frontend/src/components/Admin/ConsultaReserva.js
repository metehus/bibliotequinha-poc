import React from 'react'
import api from "../../services/api";

export default function ConsultaReserva() {
  const [codigo, setCodigo] = React.useState('')
  const [reserva, setReserva] = React.useState(null)
  const [retirado, setRetirado] = React.useState(false)
  const [devolvido, setDevolvido] = React.useState(false)

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get(`/reservas/${codigo}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      if (!data) alert('Reserva não encontrada')

      setReserva(data)
      setRetirado(data.retirado)
      setDevolvido(data.devolvido)
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro')
    }
  }

  async function save() {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/reservas/${codigo}`, {
        retirado,
        devolvido
      }, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })

      alert('Reserva atualizada!')
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro')
    }
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Código da reserva:
          <input
            type="number"
            className="form-control"
            value={codigo}
            onChange={(e) => {
              setCodigo(e.target.value);
            }}
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary botao">
        Consultar
      </button>
    </form>

    {
      reserva && <div className="card">
        <div className="card-body">
          <p>
            <b>Livro:</b> {reserva.livro?.nome} <b>de</b> {reserva.livro?.autor}
          </p>

          <p>
            <b>Usuário:</b> {reserva.usuario?.nome}
          </p>
          <br />
          <p>
            <b>Data de retirada:</b> {new Date(reserva.dataRetirada).toLocaleString()}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={retirado} onChange={e => setRetirado(e.target.checked)} />
              <label className="form-check-label" for="flexCheckDefault">
                Retirado
              </label>
            </div>
          </p>
          <p>
            <b>Data de devolução:</b> {new Date(reserva.dataDevolucao).toLocaleString()}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={devolvido} onChange={e => setDevolvido(e.target.checked)} />
              <label className="form-check-label" for="flexCheckDefault">
                Devolvido
              </label>
            </div>
          </p>
          <button className="btn btn-success" onClick={save}>
            Salvar
          </button>
        </div>
      </div>
    }
  </div>
}