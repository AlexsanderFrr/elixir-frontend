import React, { useState, useEffect } from "react";
import axios from "axios";
import { LiaFileUploadSolid } from "react-icons/lia";
import "../css/Cadastro.css";
import logo from "../imgs/copo-logo-branco.png";
import { Link } from "react-router-dom";
import { apiEndpoint } from "../config/constantes";

const CadastroSuco = () => {
  const [suco, setSuco] = useState({
    nome: "",
    ingredientes: "",
    modo_de_preparo: "",
    beneficios: "",
    img1: null,
    diagnosticos: [], // Alterar para um array para múltiplos diagnósticos
  });

  const [diagnosticosList, setDiagnosticosList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const maxDiagnosticos = 5;

  useEffect(() => {
    // Buscar a lista de diagnósticos quando o componente montar
    const fetchData = async () => {
      const diagnosticosResponse = await axios.get(
        `${apiEndpoint}/diagnostico/all`
      );
      setDiagnosticosList(diagnosticosResponse.data);
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSuco({ ...suco, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSuco({ ...suco, img1: file });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDiagnosticoSelect = (diagnosticoId) => {
    if (!suco.diagnosticos.includes(diagnosticoId) && suco.diagnosticos.length < maxDiagnosticos) {
      setSuco({ ...suco, diagnosticos: [...suco.diagnosticos, diagnosticoId] });
    }
  };

  const handleDiagnosticoRemove = (diagnosticoId) => {
    setSuco({
      ...suco,
      diagnosticos: suco.diagnosticos.filter((id) => id !== diagnosticoId),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nome", suco.nome);
    formData.append("ingredientes", suco.ingredientes);
    formData.append("modo_de_preparo", suco.modo_de_preparo);
    formData.append("beneficios", suco.beneficios);
    if (suco.img1) {
      formData.append("img1", suco.img1, suco.img1.name);
    }
    suco.diagnosticos.forEach((diagnostico) => {
      formData.append("diagnosticos[]", diagnostico);
    });

    try {
      await axios.post(`${apiEndpoint}/suco/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Mostrar mensagem de sucesso
      alert("Suco cadastrado com sucesso!");

      // Limpar os campos do formulário
      setSuco({
        nome: "",
        ingredientes: "",
        modo_de_preparo: "",
        beneficios: "",
        img1: null,
        diagnosticos: [],
      });
      setSearchTerm("");
    } catch (error) {
      console.error(
        "Erro ao cadastrar o Suco:",
        error.message,
        error.response?.data
      );
    }
  };

  const filteredDiagnosticos = diagnosticosList.filter((diagnostico) =>
    diagnostico.nome_da_condicao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cadastro-container">
      <div className="cadastro-suco-container">
        <h1>Cadastro de Suco</h1>
        <br />
        <form onSubmit={handleSubmit} className="cadastro-suco-form">
          <label>
            Nome <br />
            <input
              type="text"
              name="nome"
              value={suco.nome}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Ingredientes
            <br />
            <textarea
              name="ingredientes"
              value={suco.ingredientes}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Modo de Preparo
            <br />
            <textarea
              name="modo_de_preparo"
              value={suco.modo_de_preparo}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <br />
          <label>
            Benefícios
            <br />
            <textarea
              name="beneficios"
              value={suco.beneficios}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <br />

          <label>
            Diagnóstico (Selecione até 5)
            <br />
            <input
              type="text"
              placeholder="Pesquisar diagnóstico"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="diagnosticos-list">
              {filteredDiagnosticos.map((diagnostico) => (
                <div
                  key={diagnostico.id}
                  onClick={() => handleDiagnosticoSelect(diagnostico.id)}
                  className={`diagnostico-item ${
                    suco.diagnosticos.includes(diagnostico.id) ? "selected" : ""
                  }`}
                >
                  {diagnostico.nome_da_condicao}
                </div>
              ))}
            </div>
          </label>
          {suco.diagnosticos.length > maxDiagnosticos && (
            <p style={{ color: "red" }}>
              Você pode selecionar no máximo 5 diagnósticos.
            </p>
          )}
          <div className="diagnosticos-selecionados">
            {suco.diagnosticos.map((diagnosticoId) => {
              const diagnostico = diagnosticosList.find(
                (diag) => diag.id === diagnosticoId
              );
              return (
                <div key={diagnosticoId} className="diagnostico-selecionado">
                  {diagnostico?.nome_da_condicao}
                  <span
                    className="remove-diagnostico"
                    onClick={() => handleDiagnosticoRemove(diagnosticoId)}
                  >
                    &times;
                  </span>
                </div>
              );
            })}
          </div>
          <br />
          <br />
          <div className="upload-container">
            <LiaFileUploadSolid />
            <input type="file" name="img1" onChange={handleFileChange} />
          </div>
          {suco.img1 && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(suco.img1)}
                alt="Preview da Imagem"
                style={{ maxWidth: "100px" }}
              />
            </div>
          )}
          <br />
          <br />
          <button
            type="submit"
            className="button"
            disabled={suco.diagnosticos.length > maxDiagnosticos}
          >
            Cadastrar Suco
          </button>
        </form>
      </div>
      <div className="teste-container">
        <div className="logo-container-lateral">
          <Link to="/caddiagnostico">
            <img src={logo} alt="Copo Logo" />
            <h1>Elixir Natural</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CadastroSuco;
