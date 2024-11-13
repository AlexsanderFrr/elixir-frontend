import React from "react";
import { Link } from "react-router-dom";
//import { apiEndpoint } from "../config/constantes";
import "./css/SucoCard.css"; 

const SucoCard = ({ suco, showLink = true }) => {
  const imageUrl = `${suco.img1}`;

  return (
    <div className="suco-card">
      <img src={imageUrl} alt={suco.nome} className="suco-image" />
      <h3 className="suco-title">{suco.nome}</h3>
      <div className="suco-details">
        {showLink && (
          <button className="suco-button">
            <Link to={`/suco/${suco.id}`} className="suco-link">
              Ver Mais
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default SucoCard;
