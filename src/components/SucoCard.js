import React from "react";
import { Link } from "react-router-dom";
import { apiEndpoint } from "../../config/constantes";

const SucoCard = ({ suco, showLink = true }) => {
  const imageUrl = `${apiEndpoint}${suco.img1}`;

  return (
    <div
      className="suco-card"
      style={{
        maxWidth: "350px",
        borderRadius: "10px",
        overflow: "hidden",
        margin: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
        cursor: "pointer",
      }}
    >
      <img
        src={imageUrl}
        alt={suco.nome}
        style={{
          width: "100%",
          height: "auto",
          margin: "auto",
          marginTop: "8px",
          borderRadius: "10px 10px 0 0",
        }}
      />
      <h3
        style={{
          fontFamily: "Merriweather, sans-serif",
          textAlign: "center",
          fontSize: "22px",
          marginTop: "8px",
          padding: "0 16px",
        }}
      >
        {suco.nome}
      </h3>
      <div
        className="suco-details"
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 16px",
          marginBottom: "16px",
        }}
      >
        
      </div>
      <div
        className="suco-details"
        style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}
      >
        {showLink && (
          <button
          style={{
            backgroundColor: "#BB5104",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            border: "none",
            textDecoration: "none",
            textAlign: "center",
            transition: "background-color: #ffff",
            }}
          >
            <Link
              to={`/suco/${suco.id}`}
              style={{
                color: "#fff",
                textDecoration: "none",
              }}
            >
                Ver Mais  
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default SucoCard;
