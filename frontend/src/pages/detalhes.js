import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Comments from '../components/Comments';
import "./detalhes.css";

export default function Detalhes() {
  const [livro, setLivro] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantidade, setQuantidade] = useState(1);
  const { codigo } = useParams();
  const navigate = useNavigate();

  const adicionarAoCarrinho = () => {

    console.log('Livro:', livro);
    console.log('Quantidade:', quantidade);

    const itemCarrinho = {
      id: livro._id,
      nome: livro.nome
    };


    localStorage.setItem("carrinho", JSON.stringify(itemCarrinho));
    navigate("/reserva");
  };

  useEffect(() => {

    fetch(`http://localhost:3001/livros/${codigo}`)
      .then(response => response.json())
      .then(data => {
        setLivro(data);
        setLoading(false);
      })
      .catch(err => console.error(err))
  }, []);


  return (
    <div className="container detalhes-container">
      {loading ? (
        <h1 className="display-6">Carregando...</h1>
      ) : (
        <>
          {Object.keys(livro).length === 0 ? (
            <h1 className="display-6">Nenhum Livro encontrado.</h1>
          ) : (
            <div className="row">
              <div className="col">
                <div className="card" style={{ maxWidth: "500px" }}>
                  <img src="/livro.png" alt={livro.nome} className="card-img-top" />
                </div>
              </div>
              <div className="col">
                <div className="card mx-auto p-3">
                  <h1 className="text-center">{livro.nome}</h1>
                 
                 
                  <div className="text-center">
                    
                    <button className="btn btn-primary" onClick={adicionarAoCarrinho}>
                      Reservar
                    </button>
                  </div>
                </div>
              </div>
            
            </div>
          )}
        </>
      )}
    </div>
  );

}