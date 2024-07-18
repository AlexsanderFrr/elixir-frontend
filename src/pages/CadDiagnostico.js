import React, { useState } from "react";
import axios from "axios";
import logo from "../imgs/copo-logo-branco.png";
import { Link } from "react-router-dom";

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
        "https://localhost:8081/diagnostico/add",
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
    <div className="cadastro-container">
      <div className="cadastro-diagnostico-container">
        <h1>Cadastro de Diagnostico</h1>
        <br />
        <form onSubmit={handleSubmit} className="cadastro-diagnostico-form">
          <label>
            Nome da Condição
            <br />
            <input
              type="text"
              name="nome_da_condicao"
              value={diagnostico.nome_da_condicao}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Descrição
            <br />
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
      <div className="teste-container">
        <div className="logo-container-lateral">
          <Link to="/cadsuco">
            <img src={logo} alt="Copo Logo" />
            
            <h1>Elixir Natural</h1>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default CadDiagnostico;
