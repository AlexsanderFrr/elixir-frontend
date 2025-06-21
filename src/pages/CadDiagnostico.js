import React, { useState } from "react";
import axios from "axios";
import { apiEndpoint } from "../config/constantes";
import "../css/Cadastro.css";

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
        `${apiEndpoint}/diagnostico/add`,
        diagnostico
      );
      alert("Diagnóstico cadastrado com sucesso!");
      setDiagnostico({
        nome_da_condicao: "",
        descricao: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar o Diagnóstico:", error);
    }
  };

  return (
    <div className="cadastro-diagnostico-page">
      <div className="cadastro-diagnostico-box">
        <h1>Cadastro de Diagnóstico</h1>
        <form onSubmit={handleSubmit} className="cadastro-diagnostico-form">
          <label>
            Nome da Condição
            <input
              type="text"
              name="nome_da_condicao"
              value={diagnostico.nome_da_condicao}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Descrição
            <textarea
              name="descricao"
              value={diagnostico.descricao}
              onChange={handleInputChange}
              required
              rows={4}
            />
          </label>

          <button type="submit" className="button">
            Cadastrar Diagnóstico
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadDiagnostico;
