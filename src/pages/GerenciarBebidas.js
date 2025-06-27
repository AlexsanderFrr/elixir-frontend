import React, { useEffect, useState } from "react";
import SucoCard from "../components/SucoCard";
import "../css/GerenciarBebidas.css";  // CSS novo e específico para esta tela
import { apiEndpoint } from "../config/constantes";
import { useAuth } from "../contexts/AuthContext";

const GerenciarBebidas = () => {
  const [allSucos, setSucos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, token } = useAuth();

  const fetchSucos = async () => {
    try {
      let url = '/suco/all';
      if (searchTerm.trim()) {
        url = `/suco/title/${searchTerm.trim()}`;
      }
      const res = await apiEndpoint.get(url);
      setSucos(res.data);
    } catch (err) {
      console.log("Erro no frontend:", err);
    }
  };

  useEffect(() => {
    fetchSucos();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchSucos();
  };

  // Atualiza um suco na lista após edição
  const updateSuco = (sucoAtualizado) => {
    setSucos((prev) =>
      prev.map((suco) => (suco.id === sucoAtualizado.id ? sucoAtualizado : suco))
    );
  };

  // Remove um suco da lista após exclusão
  const deleteSuco = async (id) => {
    try {
      await apiEndpoint.delete(`/suco/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSucos((prev) => prev.filter((suco) => suco.id !== id));
    } catch (error) {
      alert("Erro ao deletar suco");
    }
  };

  return (
    <div className="container-suco-list">
      <div className="container-meio">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <div className="search-container">
            <input
              type="text"
              placeholder="Procurar por título..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button type="submit" aria-label="Buscar">
              🔍
            </button>
          </div>
        </form>

        <h2 className="title">Lista de Sucos</h2>

        <div className="sucos-list-container">
          {allSucos.length > 0 ? (
            allSucos.map((suco) => (
              <SucoCard
                key={suco.id}
                suco={suco}
                isLoggedIn={!!user}
                isAdmin={user?.isAdmin}
                token={token}
                page="gerenciar"
                onUpdateSuco={updateSuco}
                onDeleteSuco={deleteSuco}
              />
            ))
          ) : (
            <p>Nenhum suco encontrado.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GerenciarBebidas;
