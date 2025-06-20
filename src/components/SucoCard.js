import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./css/SucoCard.css";
import { apiEndpoint } from "../config/constantes";

const SucoCard = ({ suco, showLink = true, isLoggedIn, token, onRemoveFavorito }) => {
  const [favorito, setFavorito] = useState(false);
  const imageUrl = suco.img1 || suco.img1;

  useEffect(() => {
    async function verificarFavorito() {
      if (!isLoggedIn) {
        setFavorito(false);
        return;
      }
      try {
        const res = await apiEndpoint.get("/favoritos/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const idsFavoritos = res.data.map(
          (fav) => fav.suco.id || fav.suco.suco_id
        );
        setFavorito(idsFavoritos.includes(suco.suco_id || suco.id));
      } catch (error) {
        console.error("Erro ao verificar favoritos", error);
      }
    }

    verificarFavorito();
  }, [suco.suco_id, suco.id, isLoggedIn, token]);

  const favoritarSuco = async () => {
    if (!isLoggedIn) {
      alert("Você precisa estar logado para favoritar.");
      return;
    }

    try {
      await apiEndpoint.post(
        "/favoritos/add",
        { id: suco.suco_id || suco.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorito(true);
    } catch (error) {
      alert("Erro ao adicionar favorito");
      console.error(error);
    }
  };

  const removerFavorito = async () => {
    if (!isLoggedIn) {
      alert("Você precisa estar logado para remover dos favoritos.");
      return;
    }

    try {
      await apiEndpoint.delete(`/favoritos/delete/${suco.suco_id || suco.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorito(false);

      // Chama a função para atualizar a lista na tela de favoritos
      if (onRemoveFavorito) {
        onRemoveFavorito(suco.suco_id || suco.id);
      }
    } catch (error) {
      alert("Erro ao remover favorito");
      console.error(error);
    }
  };

  const toggleFavorito = () => {
    if (favorito) {
      removerFavorito();
    } else {
      favoritarSuco();
    }
  };

  return (
    <div className="suco-card">
      <div className="suco-fav-container">
        <img src={imageUrl} alt={suco.suco_nome} className="suco-image" />
        <button
          className="favorito-btn"
          onClick={toggleFavorito}
          aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {favorito ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
      </div>

      <h3 className="suco-title">{suco.suco_nome || suco.nome}</h3>
      <h4>{suco.diagnostico_nome_da_condicao}</h4>

      <div className="suco-details">
        {showLink && (
          <button className="suco-button">
            <Link to={`/suco/${suco.suco_id}`} className="suco-link">
              Ver Mais
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default SucoCard;
