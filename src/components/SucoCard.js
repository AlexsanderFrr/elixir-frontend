import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaEdit, FaTrash } from "react-icons/fa";
import { apiEndpoint } from "../config/constantes";
import "./css/SucoCard.css";

const SucoCard = ({ suco, isLoggedIn, isAdmin, token, page, onDeleteSuco }) => {
  const [favorito, setFavorito] = useState(false);
  const navigate = useNavigate();
  const imageUrl = suco.img1 || suco.img1;

  useEffect(() => {
    async function verificarFavorito() {
      if (!isLoggedIn || isAdmin) {
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
  }, [suco.suco_id, suco.id, isLoggedIn, isAdmin, token]);

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

  const editarSuco = () => {
    navigate(`/admin/sucos/editar/${suco.suco_id || suco.id}`);
  };

  const excluirSuco = () => {
    if (window.confirm("Tem certeza que deseja excluir este suco?")) {
      if (onDeleteSuco) onDeleteSuco(suco.suco_id || suco.id);
    }
  };

  return (
    <div className="suco-card">
      <div className="suco-fav-container">
        <img
          src={imageUrl}
          alt={suco.suco_nome || suco.nome}
          className="suco-image"
        />
        {!isAdmin && isLoggedIn && (
          <button
            className="favorito-btn"
            onClick={toggleFavorito}
            aria-label={
              favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
          >
            {favorito ? <FaHeart color="red" /> : <FaRegHeart />}
          </button>
        )}
      </div>

<h3 className="suco-title">{suco.suco_nome || suco.nome}</h3>

{suco.diagnostico_nome_da_condicao && (
  <div className="suco-diagnostico-container">
    <h4>Diagnóstico</h4>
    <p>{suco.diagnostico_nome_da_condicao}</p>
  </div>
)}

      <div className="suco-details">
        { page != 'gerenciar' &&(
          <button className="suco-button">
            <Link
              to={`/suco/${suco.suco_id || suco.id}`}
              className="suco-link"
            >
              Ver Mais
            </Link>
          </button>
        )}
      </div>

      {isAdmin && page == 'gerenciar' &&(
        <div className="admin-buttons">
          <button onClick={editarSuco} aria-label="Editar Suco">
            <FaEdit /> Editar
          </button>
          <button onClick={excluirSuco} aria-label="Excluir Suco">
            <FaTrash /> Excluir
          </button>
        </div>
      )}
    </div>
  );
};

export default SucoCard;
