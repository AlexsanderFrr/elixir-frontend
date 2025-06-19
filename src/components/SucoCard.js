import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import "./css/SucoCard.css";
import { apiEndpoint } from "../config/constantes";

const SucoCard = ({ suco, showLink = true }) => {
  const [favorito, setFavorito] = useState(false);
  const imageUrl = suco.img1 || suco.img1; // Ajuste conforme seu campo de imagem
  const token = localStorage.getItem("token");

  // Verifica se este suco está entre os favoritos do usuário
  useEffect(() => {
    async function verificarFavorito() {
      if (!token) return;
      try {
  const res = await axios.get(`${apiEndpoint}/favoritos/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const idsFavoritos = res.data.map((fav) => fav.suco.id || fav.suco.suco_id);
        setFavorito(idsFavoritos.includes(suco.suco_id || suco.id));
      } catch (error) {
        console.error("Erro ao verificar favoritos", error);
      }
    }
    verificarFavorito();
  }, [suco.suco_id, suco.id, token]);

  // Função para favoritar
  const favoritarSuco = async () => {
    try {
      await axios.post(
        `${apiEndpoint}/favoritos/add`,
        { id: suco.suco_id || suco.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavorito(true);
    } catch (error) {
      alert("Erro ao adicionar favorito");
      console.error(error);
    }
  };

  // Função para remover favorito
  const removerFavorito = async () => {
    try {
      await axios.delete(
        `${apiEndpoint}/favoritos/delete/${suco.suco_id || suco.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
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
