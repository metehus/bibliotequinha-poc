import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../services/api";

export default function CadastroLivro() {
  const [nome, setNome] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");
  const [generos, setGeneros] = useState([])

  useEffect(() => {
    api.get("/generos")
      .then((response) => {
        setGeneros(response.data)
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const livro = {
      nome,
      autor,
      ano,
      generoId: genero
    };

    api
    .post("/livros", livro)
      .then((response) => {
        console.log(response.data);
        alert("Livro " + response.data.codigo + " foi criado com sucesso!");
        setNome("");
        setAno("");
        setAutor("");
      })
      .catch((err) => {
        console.error(err);
        alert("Ocorreu um erro!");
      })
  };


  return <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>
        Nome:
        <input
        required
          type="text"
          className="form-control"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
          }}
        />
      </label>
    </div>
    <br />
    <div className="form-group">
      <label>
        Autor:
        <input
          type="string"
          required
          className="form-control"
          value={autor}
          onChange={(e) => {
            setAutor(e.target.value);
          }}
        />
      </label>
    </div>
    <br />
    <div className="form-group">
      <label>
        Ano:
        <input
          type="string"
          required
          className="form-control"
          value={ano}
          onChange={(e) => {
            setAno(e.target.value);
          }}
        />
      </label>
    </div>
    <div className="form-group">
      <label>
        Genero:
        <select
          className="form-control"
          required
          value={genero}
          onChange={(e) => {
            setGenero(e.target.value);
          }}
        >
          {
            generos.length ? generos.map(g => (
              <option value={g.codigo}>
                {g.nome}
            </option>
            )) : 'Nenhum genero'
          }
          </select>
      </label>
    </div>
    <br />
    <button type="submit" className="btn btn-primary botao">
      Criar
    </button>
  </form>
}