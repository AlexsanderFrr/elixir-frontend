import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReadSuco = () => {
  const { id } = useParams();
  const [suco, setSuco] = useState({});
  const [diagnostico, setDiagnostico] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8081/suco/with-diagnostico/${id}`)
        .then((res) => {
          console.log(res.data); // Examine os dados recebidos no console
          const sucoData = res.data[0] || {};
          setSuco(sucoData);
          setDiagnostico(sucoData.diagnostico || {});
        })
        .catch((err) => console.log(err));
    }
  }, [id]);

  const imageUrl = `http://localhost:8081${suco.img1}`;

  return (
    <div>
      {Object.keys(suco).length > 0 && (
        <>
          <h2>{suco.nome}</h2>
          {suco.img1 && (
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
          )}
          <p>Ingredientes: {suco.ingredientes}</p>
          <p>Modo de Preparo: {suco.modo_de_preparo}</p>
          <p>Benefícios: {suco.beneficios}</p>

          {diagnostico.nome_da_condicao && (
            <div key={diagnostico.id}>
              <h3>Diagnóstico Associado</h3>
              <p>Nome da Condição: {diagnostico.nome_da_condicao}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReadSuco;
