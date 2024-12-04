import React, { useState } from "react";
import axios from "axios";
import logo from "../imgs/copo-logo-branco.png";
import { Link } from "react-router-dom";
import { apiEndpoint } from "../config/constantes";

const CadDiagnostico = () => {
  const [diagnostico, setDiagnostico] = useState({
    nome_da_condicao: "",
    descricao: "",
  });
  const [loading, setLoading] = useState(false); // Para controle de carregamento
  const [error, setError] = useState(""); // Para mostrar mensagens de erro
  const [success, setSuccess] = useState(""); // Para mostrar mensagens de sucesso

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDiagnostico({ ...diagnostico, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Inicia o estado de carregamento
    setError(""); // Limpa mensagens de erro anteriores
    setSuccess(""); // Limpa mensagens de sucesso

    if (!diagnostico.nome_da_condicao || !diagnostico.descricao) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${apiEndpoint}/diagnostico/add`,
        diagnostico
      );

      setSuccess("Diagnóstico cadastrado com sucesso!");
      console.log("Diagnóstico cadastrado com sucesso!", response.data);
      setDiagnostico({
        nome_da_condicao: "",
        descricao: "",
      });
    } catch (error) {
      setError("Erro ao cadastrar o diagnóstico. Tente novamente.");
      console.error("Erro ao cadastrar o Diagnóstico:", error.message, error.response?.data);
    } finally {
      setLoading(false); // Finaliza o estado de carregamento
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-diagnostico-container">
        <h1>Cadastro de Diagnóstico</h1>
        <br />
        <form onSubmit={handleSubmit} className="cadastro-diagnostico-form">
          {error && <p className="error-message">{error}</p>} {/* Exibe erros */}
          {success && <p className="success-message">{success}</p>} {/* Exibe sucesso */}
          <label>
            Nome da Condição
            <br />
            <input
              type="text"
              name="nome_da_condicao"
              value={diagnostico.nome_da_condicao}
              onChange={handleInputChange}
              aria-label="Nome da Condição"
              required
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
              aria-label="Descrição"
              required
            />
          </label>
          <br />
          <button type="submit" className="button" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar Diagnóstico"}
          </button>
        </form>
      </div>
      <div className="teste-container">
        <div className="logo-container-lateral">
          <Link to="/cadsuco">
            <img src={logo} alt="Logo Elixir Natural" />
            <h1>Elixir Natural</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CadDiagnostico;
