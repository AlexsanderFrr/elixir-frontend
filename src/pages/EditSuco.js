import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiEndpoint } from "../config/constantes";
import "../css/EditSuco.css";

const EditSuco = () => {
  const { id } = useParams(); // Captura o ID da URL
  const navigate = useNavigate(); // Para redirecionar após salvar
  const [suco, setSuco] = useState({
    nome: "",
    ingredientes: "",
    modo_de_preparo: "",
    beneficios: "",
    img1: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Buscar os dados do suco ao carregar o componente
  useEffect(() => {
    const fetchSuco = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/suco/${id}`);
        setSuco(response.data); // Preenche o estado com os dados do suco
      } catch (error) {
        console.error("Erro ao carregar o suco:", error);
      }
    };

    if (id) fetchSuco();
  }, [id]);

  // Atualizar o estado com as mudanças do formulário
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSuco({ ...suco, [name]: value });
  };

  // Enviar os dados atualizados ao backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.put(`${apiEndpoint}/suco/${id}`, suco);
      alert("Suco atualizado com sucesso!");
      navigate(`/suco/${id}`); // Redireciona para a página de detalhes do suco
    } catch (error) {
      console.error("Erro ao atualizar o suco:", error);
      alert("Ocorreu um erro ao atualizar o suco.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="edit-suco-container">
      <h2>Editar Suco</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={suco.nome}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredientes">Ingredientes:</label>
          <textarea
            id="ingredientes"
            name="ingredientes"
            value={suco.ingredientes}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="modo_de_preparo">Modo de Preparo:</label>
          <textarea
            id="modo_de_preparo"
            name="modo_de_preparo"
            value={suco.modo_de_preparo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="beneficios">Benefícios:</label>
          <textarea
            id="beneficios"
            name="beneficios"
            value={suco.beneficios}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="img1">URL da Imagem:</label>
          <input
            type="text"
            id="img1"
            name="img1"
            value={suco.img1}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
};

export default EditSuco;
