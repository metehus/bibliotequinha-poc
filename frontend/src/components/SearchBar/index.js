import Card from "../Card";
import { useState } from "react";
import { useEffect } from "react";
import "./searchBar.css";

export default function SearchBar() {
  const [generos, setGeneros] = useState([]);
  const [busca, setbusca] = useState([]);
  function handleSearchValue(event) {
    setbusca(event.target.value);
  }

  useEffect(() => {
    fetch("http://localhost:3080/livros")
      .then((response) => response.json())
      .then((data) => setGeneros(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="search">
        <input
          type="text"
          placeholder="Pesquisar..."
          onChange={handleSearchValue}
          className="search-bar-input"
        />
      </div>

      <div className="container text-center">
        {generos.map((genero) => (
          <div
            key={genero.id}
            className={genero.nome
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")}
          >
            <h1 className="genero">{genero.nome}</h1>
            <Card searchValue={busca} genero={genero} />
          </div>
        ))}
      </div>
    </div>
  );
}
