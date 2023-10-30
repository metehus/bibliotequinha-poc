import React from 'react'
import api from "../../services/api";

export default function EditarUsuario() {
  const [codigo, setCodigo] = React.useState('')
  const [usuario, setUsuario] = React.useState('')
  const [nome, setNome] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [senha, setSenha] = React.useState('')

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const { data } = await api.get(`/usuarios/${codigo}`, {
      })

      if (!data) alert('Usuário não encontrado!')

      setUsuario(data)
      setNome(data.nome)
      setEmail(data.email)
      setSenha(data.senha)
    } catch (error) {
      console.error(error)
    }
  }

  async function save() {
    try {

      if (nome === usuario.nome) {
        alert('O nome de usuário atual é igual ao novo nome');
      } else if (email === usuario.email) {
        alert('O email atual é igual ao novo email.');
      } else if (senha === usuario.senha) {
        alert('A senha atual é igual a nova senha.');
      } else {
        alert('Usuário atualizado!');
      }

      await api.put(`/usuarios/${codigo}`, {
        nome,
        email,
        senha
      })

      // Limpar os campos do formulário
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro');
    }
  }

  async function deleteUser() {
    try {
      await api.delete(`/usuarios/${codigo}`);
      alert('Usuário excluído!');
      setUsuario('');
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro ao excluir o usuário');
    }
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
      <button type="submit" className="btn btn-primary botao" >
        Confirmar
      </button>
      <br />
    </form>

    {
      usuario && <div className="card">
        <div className="card-body">

          <p>
            <b>Usuário:</b> {usuario.nome}
            <div className="form">
              <input className='form' type='text' value={nome} placeholder='Informe um novo nome de usuário' onChange={e => setNome(e.target.value)}/>
            </div>
          </p>

          <br />

          <p>
            <b>Email:</b> {usuario.email}
            <div className="form" id='formulario'>
              <input className='form' type='text' value={email} placeholder='Informe um novo email' onChange={e => setEmail(e.target.value)}/>
            </div>
          </p>

          <br />

          <p>
            <b>Senha:</b> *******
            <div className="form">
              <input className='form' type='password' value={senha} placeholder='Informe uma nova senha' onChange={e => setSenha(e.target.value)}/>
            </div>
          </p>

          <br />

          <button className="btn btn-success" onClick={save}>
            Salvar
          </button>

          <br />
          <br />

          <button className="btn btn-danger" onClick={deleteUser}>
              Excluir usuário
          </button>
        </div>
      </div>
    }
  </div>
}