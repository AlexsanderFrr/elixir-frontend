import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; 
import { apiEndpoint } from "../config/constantes";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../css/ReadSuco.css";

const ReadSuco = () => {
  const { token, isLoggedIn, isAdmin } = useAuth();
  const { id } = useParams();
  const [suco, setSuco] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorito, setFavorito] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  // Buscar dados do suco
  useEffect(() => {
    const fetchSuco = async () => {
      try {
        setLoading(true);
        const response = await apiEndpoint.get(`/suco/${id}`);
        
        if (!response.data) {
          throw new Error("Receita não encontrada");
        }
        
        setSuco(response.data);
      } catch (err) {
        console.error("Erro ao buscar suco:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSuco();
  }, [id]);

  // Verificar se é favorito (igual ao SucoCard)
  useEffect(() => {
    
    const verificarFavorito = async () => {
      if (!isLoggedIn || isAdmin) {
        setFavorito(false);
        return;
      }
      try {
        const res = await apiEndpoint.get("/favoritos/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const idsFavoritos = res.data.map((fav) => fav.suco.id || fav.suco.suco_id);
        setFavorito(idsFavoritos.includes(parseInt(id)));
      } catch (error) {
        console.error("Erro ao verificar favoritos", error);
      }
    };

    verificarFavorito();
  }, [id, isLoggedIn, isAdmin, token]);

  // Funções de favoritar (igual ao SucoCard)
  const favoritarSuco = async () => {
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
      return;
    }

    try {
      await apiEndpoint.post(
        "/favoritos/add",
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorito(true);
    } catch (error) {
      
      console.error("Erro ao favoritar:", error);
      alert("Erro ao favoritar. Tente novamente.");
    }
  };

  const removerFavorito = async () => {
    if (!isLoggedIn) {
      setShowLoginAlert(true);
      setTimeout(() => setShowLoginAlert(false), 3000);
      return;
    }

    try {
      await apiEndpoint.delete(`/favoritos/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorito(false);
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      alert("Erro ao remover favorito. Tente novamente.");
    }
  };

  const toggleFavorito = () => {
    if (favorito) {
      removerFavorito();
    } else {
      favoritarSuco();
    }
  };

  if (loading) {
    return <div className="read-suco-loading">Carregando...</div>;
  }

  if (error) {
    return <div className="read-suco-error">Erro: {error}</div>;
  }

  if (!suco) {
    return <div className="read-suco-not-found">Receita não encontrada</div>;
  }

  return (
    <div className="read-suco-container">
      <div className="read-suco-header">
        <h1 className="read-suco-title">{suco.suco_nome}</h1>
      </div>

      <div className="read-suco-image-container">
        {suco.img1 ? (
          <img
            src={suco.img1}
            alt={suco.suco_nome}
            className="read-suco-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '';
              e.target.className = 'read-suco-image-fallback';
              e.target.textContent = 'Imagem não disponível';
            }}
          />
        ) : (
          <div className="read-suco-image-fallback">Sem imagem</div>
        )}
        
        {!isAdmin && (
          <button
            className={`read-suco-favorito-btn ${favorito ? 'active' : ''}`}
            onClick={toggleFavorito}
            aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          >
            {favorito ? <FaHeart size={28} /> : <FaRegHeart size={28} />}
          </button>
        )}
      </div>

      {showLoginAlert && (
        <div className="read-suco-alert">
          Você precisa estar logado para favoritar.
        </div>
      )}

      <div className="read-suco-section">
        <h2>Ingredientes</h2>
        <div className="read-suco-content">
          {suco.ingredientes.split('\r\n\r\n').map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>

      <div className="read-suco-section">
        <h2>Modo de Preparo</h2>
        <div className="read-suco-content">
          {suco.modo_de_preparo.split('\r\n\r\n').map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>

      <div className="read-suco-section">
        <h2>Benefícios</h2>
        <div className="read-suco-content">
          {suco.beneficios.split('\r\n\r\n').map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>

      {suco.categoria_nome && (
        <div className="read-suco-section">
          <h2>Categoria</h2>
          <p className="read-suco-content">
            <strong>{suco.categoria_nome}</strong>: {suco.categoria_descricao}
          </p>
        </div>
      )}

      {suco.diagnostico_nome_da_condicao && (
        <div className="read-suco-section">
          <h2>Indicação Médica</h2>
          <p className="read-suco-content">
            <strong>{suco.diagnostico_nome_da_condicao}</strong>: {suco.diagnostico_descricao}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReadSuco;