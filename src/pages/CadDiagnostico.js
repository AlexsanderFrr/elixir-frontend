import React, { useState } from "react";
import axios from "axios";
import logo from "../imgs/copo-logo-branco.png";
import { apiEndpoint } from "../config/constantes";
import "../css/CadDiagnostico.css"; // CSS separado

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
      const response = await apiEndpoint.post(
        `/diagnostico/add`,
        diagnostico
      );

      console.log("Diagnóstico cadastrado com sucesso!", response.data);
      alert("Diagnóstico cadastrado com sucesso!");  // alerta simples
      setDiagnostico({ nome_da_condicao: "", descricao: "" });  // limpa formulário
    } catch (error) {
      console.error(
        "Erro ao cadastrar o Diagnóstico:",
        error.message,
        error.response?.data
      );
      alert("Erro ao cadastrar o Diagnóstico. Tente novamente.");
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-card">
        <header className="card-header">
          <img src={logo} alt="Logo Elixir Natural" className="card-logo" />
          <h1>Cadastro de Diagnóstico</h1>
        </header>

        <form onSubmit={handleSubmit} className="cadastro-form">
          <label>
            Nome da Condição
            <input
              type="text"
              name="nome_da_condicao"
              value={diagnostico.nome_da_condicao}
              onChange={handleInputChange}
              placeholder="Ex: Hipertensão"
              required
              autoComplete="off"
            />
          </label>

          <label>
            Descrição
            <textarea
              name="descricao"
              value={diagnostico.descricao}
              onChange={handleInputChange}
              placeholder="Descrição detalhada da condição"
              rows={5}
              required
            />
          </label>

          <button type="submit" className="button">
            Cadastrar Diagnóstico
          </button>
        </form>

        {/* Link removido conforme solicitado */}
      </div>
    </div>
  );
};

export default CadDiagnostico;
