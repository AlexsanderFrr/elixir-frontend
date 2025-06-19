import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./css/SucoCard.css";
import { apiEndpoint } from "../config/constantes";

const SucoCard = ({ suco, showLink = true }) => {
  const [favorito, setFavorito] = useState(false);
  const imageUrl = suco.img1 || suco.img1;

  // Verifica se este suco está entre os favoritos do usuário
  useEffect(() => {
    async function verificarFavorito() {
      try {
        const res = await apiEndpoint.get("/favoritos/all");
        const idsFavoritos = res.data.map((fav) => fav.suco.id || fav.suco.suco_id);
        setFavorito(idsFavoritos.includes(suco.suco_id || suco.id));
      } catch (error) {
        console.error("Erro ao verificar favoritos", error);
      }
    }

    verificarFavorito();
  }, [suco.suco_id, suco.id]);

  // Função para favoritar
  const favoritarSuco = async () => {
    try {
      await apiEndpoint.post("/favoritos/add", {
        id: suco.suco_id || suco.id,
      });
      setFavorito(true);
    } catch (error) {
      alert("Erro ao adicionar favorito");
      console.error(error);
    }
  };

  // Função para remover favorito
  const removerFavorito = async () => {
    try {
      await apiEndpoint.delete(`/favoritos/delete/${suco.suco_id || suco.id}`);
      setFavorito(false);
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

      <h3 className="suco-title">{suco.suco_nome}</h3>

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
