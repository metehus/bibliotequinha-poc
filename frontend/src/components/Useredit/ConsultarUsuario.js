import React from 'react'
import api from "../../services/api";
import { useNavigate } from 'react-router-dom';

export default function ConsultarUsuario() {
  const [codigo, setCodigo] = React.useState('')
  const [usuario, setUsuario] = React.useState('')
  const [nome, setNome] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await api.get(`/usuarios/${codigo}`, {
      })

      if (!data) alert('Usuário não encontrado')

      setUsuario(data)
      setNome(data.nome)
      setEmail(data.email)
      setSenha(data.senha)
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro')
    }
  }

  async function mudarPage() {
    navigate("/editarusuario");
  }

  return <div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>
          Informe seu código de usuário:
          <input
            type="number"
            className="form-control"
            value={codigo}
            min={1}
            onChange={(e) => {
              setCodigo(e.target.value);
            }}
          />
        </label>
      </div>
      <button type="submit" className="btn btn-primary botao">
        Consultar
      </button>
      <br />
    </form>

    {
      usuario && <div className="card">
        <div className="card-body">

          <p>
            <b>Usuário:</b> {usuario.nome}
          </p>

          <br />

          <p>
            <b>Email:</b> {usuario.email}
          </p>

          <br />

          <p>
            <b>Senha:</b> *******
          </p>

          <br />

            <p>Deseja editar seu usuário? Aperte no botão abaixo.</p>
          <button className="btn btn-success" onClick={mudarPage}>
            Editar usuário
          </button>
        </div>
      </div>
    }
  </div>
}