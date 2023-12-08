import React, { useState } from "react";

import axios from "axios";

const CadDiagnostico = () => {
  const [diagnostico, setDiagnostico] = useState({
    nome_da_condicao: "",
    descricao: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDiagnostico({ ...diagnostico, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/diagnostico/add",
        diagnostico
      );

      console.log("Diagnostico cadastrado com sucesso!", response.data);
    } catch (error) {
      console.error(
        "Erro ao cadastrar o Diagnostico:",
        error.message,
        error.response?.data
      );
    }
  };

  return (
    <div className="cadastro-diagnostico-container">
      <h1>Cadastro de Diagnostico</h1>
      <form onSubmit={handleSubmit} className="cadastro-diagnostico-form">
        <label>
          Nome da Condição:
          <input
            type="text"
            name="nome_da_condicao"
            value={diagnostico.nome_da_condicao}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Descrição:
          <textarea
            name="descricao"
            value={diagnostico.descricao}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit" className="button">
          Cadastrar Diagnóstico
        </button>
      </form>
    </div>
  );
};

export default CadDiagnostico;
