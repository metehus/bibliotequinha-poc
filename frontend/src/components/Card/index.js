import { useState } from "react";
import { useEffect } from "react";
import "./card.css";

export default function Card({ searchValue, genero }) {
  const [livros, setLivros] = useState([]);
  const [filteredLivros, setFilteredLivros] = useState([]);
 

  useEffect(() => {
    fetch("http://localhost:3001/livros")
      .then((response) => response.json())
      .then((data) => setLivros(data))
      .catch((err) => console.error(err));
  }, []);

  
  useEffect(() => {
    const filtered = livros.filter((livro) => {
      const lowerCaseSearchValue = typeof searchValue === 'string' ? searchValue.toLowerCase() : '';
      console.log(livro, genero)
      return (
        livro.genero === genero._id &&
        (typeof searchValue !== 'string' || livro.nome.toLowerCase().includes(lowerCaseSearchValue))
      );
    });
    setFilteredLivros(filtered);
  }, [livros, genero, searchValue]);
  

  useEffect(() => {
    if (filteredLivros.length == 0) {
      setFilteredLivros(livros);
    }
  }, [livros]);

  if (!livros) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container text-center">
      <div className="linha">
        {filteredLivros.map((livro, i) => (
          <div className="coluna" key={i}>
            <div className="card">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5999/5999928.png"
                alt={livro.nome}
                className="card-img-1"
              />
              <div className="card-body">
                <h5 className="card-title">
                  {livro.nome}
                </h5>
                <p className="genero">
                  {genero.nome}
                </p>
                <p className="card-text">{livro.descricao}</p>
                  <a href={`/detalhes/${livro.codigo}`}>
                  <div className="btn btn-primary">Detalhes</div>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
