import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from "../../services/api";

export default function CadastroGenero() {
  const [nome, setNome] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();


    api
    .post("/generos", { nome })
      .then((response) => {
        console.log(response.data);
        alert("Genero " + response.data.codigo + " foi criado com sucesso!");
        setNome("");
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
    <button type="submit" className="btn btn-primary botao">
      Criar
    </button>
  </form>
}