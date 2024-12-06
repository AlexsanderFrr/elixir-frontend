import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";  // Importando Link para navegação
import { apiEndpoint } from "../config/constantes";
import "../css/ReadSuco.css"; 

const ReadSuco = () => {
  const { id } = useParams();
  const [suco, setSuco] = useState({});
  const [diagnostico, setDiagnostico] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`${apiEndpoint}/suco/with-diagnostico/${id}`)
        .then((res) => {
          const sucoData = res.data[0] || {};
          setSuco(sucoData);
          setDiagnostico(sucoData.diagnostico || {});
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const imageUrl = `${suco.img1}`;

  return (
    <div className="read-suco-container">
      {Object.keys(suco).length > 0 && (
        <>
          <h2 className="suco-title">{suco.nome}</h2>
          {suco.img1 && (
            <img
              src={imageUrl}
              alt={suco.nome}
              className="suco-image"
            />
          )}
          <div className="suco-info">
            <p><strong>Ingredientes:</strong> {suco.ingredientes}</p>
            <p><strong>Modo de Preparo:</strong> {suco.modo_de_preparo}</p>
            <p><strong>Benefícios:</strong> {suco.beneficios}</p>
          </div>
          {diagnostico.nome_da_condicao && (
            <div className="diagnostico-container">
              <h3>Diagnóstico Associado</h3>
              <p><strong>Nome da Condição:</strong> {diagnostico.nome_da_condicao}</p>
            </div>
          )}
          {/* Link para editar o suco */}
          <Link to={`/editar-suco/${id}`} className="edit-suco-link">Editar Suco</Link>
        </>
      )}
    </div>
  );
};

export default ReadSuco;
