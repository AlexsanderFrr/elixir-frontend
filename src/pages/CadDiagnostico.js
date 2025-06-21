import React, { useState } from "react";
import axios from "axios";
import logo from "../imgs/copo-logo-branco.png";
import { Link } from "react-router-dom";
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

      console.log("Diagnostico cadastrado com sucesso!", response.data);
      // Limpar campos de entrada
      setDiagnostico({
        nome_da_condicao: "",
        descricao: "",
      });
      // Exibir alerta de sucesso
      alert("Diagnostico cadastrado com sucesso!");
    } catch (error) {
      console.error(
        "Erro ao cadastrar o Diagnostico:",
        error.message,
        error.response?.data
      );
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-diagnostico-container">
        <h1>Cadastro de Diagnostico</h1>
        

        <form onSubmit={handleSubmit} className="cadastro-diagnostico-form">
          <label>
            Nome da Condição
            

            <input
              type="text"
              name="nome_da_condicao"
              value={diagnostico.nome_da_condicao}
              onChange={handleInputChange}
            />
          </label>
          

          <label>
            Descrição
            

            <textarea
              name="descricao"
              value={diagnostico.descricao}
              onChange={handleInputChange}
            />
          </label>
          

          <button type="submit" className="button">
            Cadastrar Diagnóstico
          </button>
        </form>
      </div>
      <div className="teste-container">
        <div className="logo-container-lateral">
          <img src={logo} alt="Copo Logo" />
          <Link to="/cadsuco" className="logo-text">
            <h1>Elixir Natural</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CadDiagnostico;
 