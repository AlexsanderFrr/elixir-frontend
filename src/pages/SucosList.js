import React, { useEffect, useState } from "react";
import SucoCard from "../components/SucoCard";
import "../css/SucoList.css";
import { apiEndpoint } from "../config/constantes";
import { useAuth } from "../contexts/AuthContext";
import { FaFilter, FaTimes } from "react-icons/fa";

const SucoList = () => {
  const [allSucos, setSucos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoria, setCategoria] = useState("");
  const [diagnostico, setDiagnostico] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState("relevantes");

  const [categorias, setCategorias] = useState([]);
  const [diagnosticos, setDiagnosticos] = useState([]);

  const { user, token } = useAuth();

  useEffect(() => {
    fetchSucos();
    fetchFiltros();
  }, []);

  const fetchSucos = async () => {
    try {
      const url = searchTerm.trim()
        ? `/suco/title/${searchTerm.trim()}`
        : "/suco/all";
      const res = await apiEndpoint.get(url);
      setSucos(res.data);
    } catch (err) {
      console.log("Erro ao buscar sucos:", err);
    }
  };

  const fetchFiltros = async () => {
    try {
      const [catRes, diagRes] = await Promise.all([
        apiEndpoint.get("/categoria/all"),
        apiEndpoint.get("/diagnostico/all"),
      ]);
      setCategorias(catRes.data);
      setDiagnosticos(diagRes.data);
    } catch (err) {
      console.log("Erro ao carregar filtros:", err);
    }
  };

  const handleFilterSubmit = async (event) => {
    event.preventDefault();
    try {
      const params = new URLSearchParams();
      if (categoria) params.append("categoria", categoria);
      diagnostico.forEach((d) => params.append("diagnostico", d));

      const res = await apiEndpoint.get(`/suco/filter?${params.toString()}`);
      setSucos(res.data);
    } catch (err) {
      console.log("Erro ao aplicar filtros:", err);
    }
  };

  const clearFilters = () => {
    setCategoria("");
    setDiagnostico([]);
    setSearchTerm("");
    fetchSucos();
  };

  const sortedSucos = [...allSucos].sort((a, b) => {
    if (sortOption === "az") return (a.titulo || a.suco_nome || a.nome).localeCompare(b.titulo || b.suco_nome || b.nome);
    if (sortOption === "za") return (b.titulo || b.suco_nome || b.nome).localeCompare(a.titulo || a.suco_nome || a.nome);
    return 0; // Mais relevantes (ordem original)
  });

  return (
    <div className="listagemdesuco-page">
      {/* Botão mobile filtros */}
      <button
        className="listagemdesuco-mobile-filter-btn"
        onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
      >
        {mobileFiltersOpen ? <FaTimes /> : <FaFilter />}
        {mobileFiltersOpen ? "Fechar" : "Filtros"}
      </button>

      <div className="listagemdesuco-main-container">
        {/* Filtros */}
        <div
          className={`listagemdesuco-filters-sidebar ${
            mobileFiltersOpen ? "listagemdesuco-mobile-open" : ""
          }`}
        >
          <div className="listagemdesuco-filters-header">
            <h2>Filtros</h2>
            <button onClick={clearFilters} className="listagemdesuco-clear-filters">
              Limpar tudo
            </button>
          </div>

          <div className="listagemdesuco-filter-group">
            <h3>Categorias</h3>
            <div className="listagemdesuco-filter-options">
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="listagemdesuco-filter-select"
              >
                <option value="">Todas as Categorias</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nome}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="listagemdesuco-filter-group">
            <h3>Condições</h3>
            <div className="listagemdesuco-filter-options">
              <div className="listagemdesuco-checkbox-list">
                {diagnosticos.map((diag) => (
                  <label key={diag.id} className="listagemdesuco-checkbox-item">
                    <input
                      type="checkbox"
                      value={diag.nome_da_condicao}
                      checked={diagnostico.includes(diag.nome_da_condicao)}
                      onChange={(e) => {
                        const selected = [...diagnostico];
                        if (e.target.checked) {
                          selected.push(e.target.value);
                        } else {
                          const index = selected.indexOf(e.target.value);
                          selected.splice(index, 1);
                        }
                        setDiagnostico(selected);
                      }}
                    />
                    <span className="listagemdesuco-checkmark"></span>
                    <span className="listagemdesuco-condition-name">
                      {diag.nome_da_condicao}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <button onClick={handleFilterSubmit} className="listagemdesuco-apply-filters">
            Aplicar Filtros
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="listagemdesuco-products-container">
          {/* Barra de busca centralizada acima do título */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchSucos();
            }}
            className="search-form"
          >
            <div className="search-container">
              <input
                type="text"
                placeholder="Procurar bebidas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" aria-label="Buscar">
                🔍
              </button>
            </div>
          </form>

          {/* Cabeçalho */}
          <div className="listagemdesuco-products-header">
            <h1>Bebidas Naturais</h1>
            <div className="listagemdesuco-sort-options">
              <label>Ordenar:</label>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="listagemdesuco-sort-select"
              >
                <option value="relevantes">Mais relevantes</option>
                <option value="az">Nome (A-Z)</option>
                <option value="za">Nome (Z-A)</option>
              </select>
            </div>
          </div>

          {/* Grid de sucos */}
          <div className="listagemdesuco-products-grid">
            {sortedSucos.length > 0 ? (
              sortedSucos.map((suco) => (
                <SucoCard
                  key={suco.id || suco.suco_id}
                  suco={suco}
                  isLoggedIn={!!user}
                  isAdmin={user?.isAdmin}
                  token={token}
                />
              ))
            ) : (
              <div className="listagemdesuco-no-results">
                <p>Nenhuma bebida encontrada.</p>
                <button onClick={clearFilters}>Limpar filtros</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SucoList;
