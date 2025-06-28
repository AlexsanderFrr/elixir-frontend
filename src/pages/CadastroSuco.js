import React, { useState, useEffect } from "react";
import { LiaFileUploadSolid } from "react-icons/lia";
import "../css/CadIngrediente.css"; // Reaproveitando o estilo já existente
import { apiEndpoint } from "../config/constantes";

const CadastroSuco = () => {
  const [suco, setSuco] = useState({
    nome: "",
    ingredientes: "",
    modo_de_preparo: "",
    beneficios: "",
    img1: null,
    diagnostico: "",
    categoria: [],
  });

  const [diagnosticosList, setDiagnosticosList] = useState([]);
  const [categoriasList, setCategoriasList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const diagnosticosResponse = await apiEndpoint.get("/diagnostico/all");
        setDiagnosticosList(diagnosticosResponse.data);

        const categoriasResponse = await apiEndpoint.get("/categoria/all");
        setCategoriasList(categoriasResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

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
    setSuco({ ...suco, img1: file });
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
    suco.categoria.forEach((categoriaId) =>
      formData.append("categoria[]", categoriaId)
    );

    try {
      await apiEndpoint.post("/suco/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Suco cadastrado com sucesso!");
      setSuco({
        nome: "",
        ingredientes: "",
        modo_de_preparo: "",
        beneficios: "",
        img1: null,
        diagnostico: "",
        categoria: [],
      });
    } catch (error) {
      console.error("Erro ao cadastrar o Suco:", error);
    }
  };

  return (
    <div className="perfil-page">
      <div className="cadastro-ingrediente-container">
        <h1>Cadastro de Bebidas</h1>

        <form onSubmit={handleSubmit} className="cadastro-ingrediente-form">
          <label>
            Nome
            <input
              type="text"
              name="nome"
              value={suco.nome}
              onChange={handleInputChange}
              placeholder="Ex: Suco Detox"
              required
            />
          </label>

          <label>
            Ingredientes
            <textarea
              name="ingredientes"
              value={suco.ingredientes}
              onChange={handleInputChange}
              placeholder="Ex: Gengibre, Limão..."
              rows={3}
              required
            />
          </label>

          <label>
            Modo de Preparo
            <textarea
              name="modo_de_preparo"
              value={suco.modo_de_preparo}
              onChange={handleInputChange}
              placeholder="Ex: Bata tudo no liquidificador..."
              rows={3}
              required
            />
          </label>

          <label>
            Benefícios
            <textarea
              name="beneficios"
              value={suco.beneficios}
              onChange={handleInputChange}
              placeholder="Ex: Fortalece a imunidade..."
              rows={3}
              required
            />
          </label>

          <label>
            Diagnóstico
            <select
              name="diagnostico"
              value={suco.diagnostico}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione</option>
              {diagnosticosList.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nome_da_condicao}
                </option>
              ))}
            </select>
          </label>

          <label>
            Categoria
            <select
              name="categoria"
              value={suco.categoria}
              onChange={handleInputChange}
              multiple
              required
            >
              {categoriasList.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </select>
          </label>

          <div className="upload-container">
            <LiaFileUploadSolid size={22} color="#bb5104" />
            <input
              type="file"
              name="img1"
              accept="image/*"
              onChange={handleFileChange}
              aria-label="Upload da imagem do suco"
            />
          </div>

          {suco.img1 && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(suco.img1)}
                alt="Preview da Imagem"
              />
            </div>
          )}

          <button type="submit" className="button">
            Cadastrar Suco
          </button>
        </form>
      </div>
    </div>
  );
};

export default CadastroSuco;
