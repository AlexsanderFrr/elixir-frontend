import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHeart } from 'react-icons/fa';
import { apiEndpoint } from "../config/constantes";
import SucoCard from "../components/SucoCard";
import "../css/SucoList.css";

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchFavoritos() {
      if (!token) {
        setFavoritos([]);
        setLoading(false);
        return;
      }
      try {
        const res = await apiEndpoint.get('/favoritos/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritos(res.data);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
        setFavoritos([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFavoritos();
  }, [token]);

  // Callback para remover o suco da lista local quando desfavoritado
  const handleRemoveFavorito = (sucoId) => {
    setFavoritos((prevFavoritos) => 
      prevFavoritos.filter((fav) => (fav.suco.id || fav.suco.suco_id) !== sucoId)
    );
  };

  return (
    <div className="container-suco-list">
      <div className="container-meio">
        <button
          onClick={() => navigate(-1)}
          className="btn-voltar"
          style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <FaArrowLeft style={{ color: '#bb5104' }} /> Voltar
        </button>

        <h2 className="title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaHeart style={{ color: '#bb5104' }} /> Meus Favoritos
        </h2>

        {loading ? (
          <p>Carregando favoritos...</p>
        ) : favoritos.length === 0 ? (
          <p>Você ainda não adicionou favoritos.</p>
        ) : (
          <div className="sucos-list-container">
            {favoritos.map((item) => (
              <SucoCard
                key={item.suco.id || item.suco.suco_id}
                suco={item.suco}
                isLoggedIn={!!token}
                token={token}
                onRemoveFavorito={handleRemoveFavorito}  // passa a callback para o SucoCard
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favoritos;
