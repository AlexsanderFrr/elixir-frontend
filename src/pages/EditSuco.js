import React, { useState, useEffect } from "react";
import { LiaFileUploadSolid } from "react-icons/lia";
import "../css/Cadastro.css";
import logo from "../imgs/copo-logo-branco.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiEndpoint } from "../config/constantes";

const EditSuco = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [suco, setSuco] = useState({
    nome: "",
    ingredientes: "",
    modo_de_preparo: "",
    beneficios: "",
    img1: null,
    img1Url: "",
    diagnostico: "",
    categoria: [],
  });

  const [diagnosticosList, setDiagnosticosList] = useState([]);
  const [categoriasList, setCategoriasList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carrega listas de diagnóstico e categorias
        const diagnosticosResponse = await apiEndpoint.get("/diagnostico/all");
        setDiagnosticosList(diagnosticosResponse.data);

        const categoriasResponse = await apiEndpoint.get("/categoria/all");
        setCategoriasList(categoriasResponse.data);

        // Carrega dados do suco existente
        const sucoResponse = await apiEndpoint.get(`/suco/${id}`);
        const sucoData = sucoResponse.data;

        setSuco({
          nome: sucoData.suco_nome || "",
          ingredientes: sucoData.ingredientes || "",
          modo_de_preparo: sucoData.modo_de_preparo || "",
          beneficios: sucoData.beneficios || "",
          img1: null,
          img1Url: sucoData.img1 || "",
          diagnostico: sucoData.diagnostico_id || "",
          categoria: sucoData.categoria_id ? [sucoData.categoria_id] : [],
        });

        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        navigate("/admin/sucos");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "categoria") {
      const selectedOptions = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      setSuco({ ...suco, categoria: selectedOptions });
    } else {
      setSuco({ ...suco, [name]: value });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSuco({ 
      ...suco, 
      img1: file,
      img1Url: URL.createObjectURL(file)
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
    
    formData.append("diagnostico", suco.diagnostico);
    suco.categoria.forEach((categoriaId) => {
      formData.append("categoria[]", categoriaId);
    });

    try {
      await apiEndpoint.put(`/suco/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Suco atualizado com sucesso!");
      navigate("/admin/sucos");
    } catch (error) {
      console.error("Erro ao atualizar o Suco:", error.message, error.response?.data);
      alert("Erro ao atualizar o suco. Verifique o console para mais detalhes.");
    }
  };

  if (isLoading) {
    return <div className="cadastro-container">Carregando...</div>;
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-suco-container">
        <h1>Editar Suco</h1>
        <br />
        <form onSubmit={handleSubmit} className="cadastro-suco-form">
          <label>
            Nome <br />
            <input 
              type="text" 
              name="nome" 
              value={suco.nome} 
              onChange={handleInputChange} 
              required
            />
          </label>
          <br /><br />

          <label>
            Ingredientes<br />
            <textarea 
              name="ingredientes" 
              value={suco.ingredientes} 
              onChange={handleInputChange} 
              required
            />
          </label>
          <br /><br />

          <label>
            Modo de Preparo<br />
            <textarea 
              name="modo_de_preparo" 
              value={suco.modo_de_preparo} 
              onChange={handleInputChange} 
              required
            />
          </label>
          <br /><br />

          <label>
            Benefícios<br />
            <textarea 
              name="beneficios" 
              value={suco.beneficios} 
              onChange={handleInputChange} 
              required
            />
          </label>
          <br /><br />

          <label>
            Diagnóstico<br />
            <select 
              name="diagnostico" 
              value={suco.diagnostico} 
              onChange={handleInputChange}
            >
              <option value="">Selecione um diagnóstico</option>
              {diagnosticosList.map((diagnostico) => (
                <option key={diagnostico.id} value={diagnostico.id}>
                  {diagnostico.nome_da_condicao}
                </option>
              ))}
            </select>
          </label>
          <br /><br />

          <label>
            Categoria<br />
            <select 
              name="categoria" 
              value={suco.categoria} 
              onChange={handleInputChange} 
              multiple
              required
            >
              {categoriasList.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </label>
          <br /><br />

          <div className="upload-container">
            <LiaFileUploadSolid />
            <input type="file" name="img1" onChange={handleFileChange} />
            <span>Alterar imagem</span>
          </div>

          {(suco.img1Url || suco.img1) && (
            <div className="image-preview">
              <img
                src={suco.img1Url || suco.img1}
                alt="Preview da Imagem"
                style={{ maxWidth: "100px" }}
              />
            </div>
          )}
          <br /><br />

          <div className="button-group">
            <button type="submit" className="button">Salvar Alterações</button>
            <Link to="/admin/sucos" className="button cancel">Cancelar</Link>
          </div>
        </form>
      </div>

      <div className="teste-container">
        <div className="logo-container-lateral">
          <Link to="/admin/sucos" className="logo-text">
            <img src={logo} alt="Copo Logo" />
            Elixir Natural
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditSuco;