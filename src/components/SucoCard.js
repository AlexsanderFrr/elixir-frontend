import React from "react";
import { Link } from "react-router-dom";
//import { apiEndpoint } from "../config/constantes";
import "./css/SucoCard.css"; 

const SucoCard = ({ suco, showLink = true }) => {
  const imageUrl = `${suco.img1}`;

  return (
    <div className="suco-card">
      <img src={imageUrl} alt={suco.suco_nome} className="suco-image" />
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