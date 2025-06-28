import React, { useState, useEffect, useRef } from "react";
import { LiaFileUploadSolid } from "react-icons/lia";
import "../css/EditSuco.css"; // seu css separado
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiEndpoint } from "../config/constantes";

const EditSuco = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const inputFileRef = useRef(null);

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
        const diagnosticosResponse = await apiEndpoint.get("/diagnostico/all");
        setDiagnosticosList(diagnosticosResponse.data);

        const categoriasResponse = await apiEndpoint.get("/categoria/all");
        setCategoriasList(categoriasResponse.data);

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
    if (file) {
      setSuco({
        ...suco,
        img1: file,
        img1Url: URL.createObjectURL(file),
      });
    }
  };

  const handleUploadButtonClick = () => {
    inputFileRef.current.click();
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

          <label>
            Ingredientes <br />
            <textarea
              name="ingredientes"
              value={suco.ingredientes}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Modo de Preparo <br />
            <textarea
              name="modo_de_preparo"
              value={suco.modo_de_preparo}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Benefícios <br />
            <textarea
              name="beneficios"
              value={suco.beneficios}
              onChange={handleInputChange}
              required
            />
          </label>

          <label>
            Diagnóstico <br />
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

          <label>
            Categoria <br />
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

          <div className="upload-container">
            <LiaFileUploadSolid size={24} color="#bb5104" />
            <button
              type="button"
              className="upload-btn"
              onClick={handleUploadButtonClick}
            >
              Selecionar Imagem
            </button>
            <input
              type="file"
              name="img1"
              accept="image/*"
              onChange={handleFileChange}
              ref={inputFileRef}
              style={{ display: "none" }}
            />
          </div>

          {(suco.img1Url || suco.img1) && (
            <div className="image-preview">
              <img
                src={suco.img1Url || URL.createObjectURL(suco.img1)}
                alt="Preview da Imagem"
                style={{ maxWidth: "120px", borderRadius: "8px", marginTop: "10px" }}
              />
            </div>
          )}

          <div className="button-group">
            <button type="submit" className="button">
              Salvar Alterações
            </button>
            <Link to="/admin/sucos" className="button cancel">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSuco;
